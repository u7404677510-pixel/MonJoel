import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { artisanApplicationSchema, validateRequestBody } from '@/lib/validations';
import type { ApiResponse } from '@/types';

export async function POST(request: Request) {
  try {
    // Validate request body
    const validation = await validateRequestBody(request, artisanApplicationSchema);
    
    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { companyName, siret, contactName, email, phone, zones, message } = validation.data;

    // Check if SIRET already exists
    const existing = await prisma.artisanApplication.findFirst({
      where: { siret },
    });

    if (existing) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Une candidature existe déjà avec ce numéro SIRET.' },
        { status: 400 }
      );
    }

    // Create application
    const application = await prisma.artisanApplication.create({
      data: {
        companyName,
        siret,
        contactName,
        email,
        phone,
        zones,
        message: message ?? null,
        status: 'PENDING',
      },
    });

    // Create event
    await prisma.event.create({
      data: {
        type: 'artisan_application_submitted',
        payload: {
          applicationId: application.id,
          companyName,
        },
      },
    });

    // TODO: Send notification email to team
    // TODO: Send confirmation email to applicant

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Votre candidature a bien été reçue. Nous vous contacterons sous 48h.',
      data: { id: application.id },
    });
  } catch (error) {
    console.error('Artisan application error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

