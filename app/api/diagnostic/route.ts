import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { diagnosticFormSchema, validateRequestBody } from '@/lib/validations';
import { calculateEstimate, calculateEta } from '@/lib/pricing';
import type { ApiResponse, TicketAnalysis } from '@/types';

export async function POST(request: Request) {
  try {
    // Validate request body
    const validation = await validateRequestBody(request, diagnosticFormSchema);
    
    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const {
      zip,
      city,
      problemType,
      description,
      contactName,
      contactPhone,
      contactEmail,
      urgency,
    } = validation.data;

    // Determine channel based on urgency
    const channel = urgency === 'very_urgent' ? 'DIRECT' : 'WEB';

    // Create request in database
    const dbRequest = await prisma.request.create({
      data: {
        status: 'ANALYZING',
        channel,
        description: `[${problemType}] ${description}`,
        zip,
        city,
        contactName,
        contactPhone,
        contactEmail: contactEmail ?? null,
        // sourceUtm: TODO - Extract from request headers/cookies
      },
    });

    // ===========================================
    // AI DIAGNOSTIC STUB
    // TODO: Replace with actual AI service call
    // ===========================================
    
    // Simulate AI analysis based on problem type
    const serviceCodeMap: Record<string, string> = {
      'porte-claquee': 'ouverture-simple',
      'cle-cassee': 'ouverture-simple',
      'cle-perdue': 'cylindre-standard',
      'effraction': 'securisation',
      'serrure-bloquee': 'ouverture-simple',
      'changement-cylindre': 'cylindre-standard',
      'serrure-multipoints': 'multipoints-3pts',
      'blindage': 'blindage',
    };

    const serviceCode = serviceCodeMap[problemType] ?? 'ouverture-simple';
    const isUrgent = urgency !== 'normal';

    const pricing = calculateEstimate(serviceCode, { isUrgent });
    const eta = calculateEta(serviceCode, { isUrgent });

    // Create ticket with analysis
    const ticket = await prisma.ticket.create({
      data: {
        requestId: dbRequest.id,
        lockType: problemType,
        confidence: 0.85, // Mock confidence
        pricingJson: JSON.parse(JSON.stringify(pricing)),
        etaJson: JSON.parse(JSON.stringify(eta)),
        riskFlags: isUrgent ? ['urgent'] : [],
        aiNotes: `Diagnostic automatique pour: ${problemType}. Analyse basée sur la description fournie.`,
      },
    });

    // Update request status
    await prisma.request.update({
      where: { id: dbRequest.id },
      data: { status: 'QUOTED' },
    });

    // Create event
    await prisma.event.create({
      data: {
        type: 'request_analyzed',
        payload: {
          requestId: dbRequest.id,
          ticketId: ticket.id,
          problemType,
        },
      },
    });

    // ===========================================
    // End AI Stub
    // ===========================================

    const analysis: TicketAnalysis = {
      lockType: ticket.lockType,
      brand: ticket.brand,
      confidence: ticket.confidence ?? 0,
      pricing: pricing,
      eta: eta,
      riskFlags: (ticket.riskFlags as string[]) ?? [],
      notes: ticket.aiNotes,
    };

    return NextResponse.json<ApiResponse<{ requestId: string; analysis: TicketAnalysis }>>({
      success: true,
      message: 'Diagnostic effectué avec succès.',
      data: {
        requestId: dbRequest.id,
        analysis,
      },
    });
  } catch (error) {
    console.error('Diagnostic error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Une erreur est survenue lors du diagnostic. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

