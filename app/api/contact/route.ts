import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { contactFormSchema, validateRequestBody } from '@/lib/validations';
import type { ApiResponse } from '@/types';

export async function POST(request: Request) {
  try {
    // Validate request body
    const validation = await validateRequestBody(request, contactFormSchema);
    
    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, consentRgpd } = validation.data;

    // Get UTM params from headers or cookies if available
    const sourceUtm = null; // TODO: Extract from request headers

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        subject,
        message,
        consentRgpd,
        sourceUtm,
      },
    });

    // Create event for audit
    await prisma.event.create({
      data: {
        type: 'contact_form_submitted',
        payload: {
          submissionId: submission.id,
          subject,
        },
      },
    });

    // TODO: Send notification email to support team
    // TODO: Send confirmation email to user

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
      data: { id: submission.id },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

