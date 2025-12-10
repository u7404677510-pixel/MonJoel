import { NextRequest, NextResponse } from 'next/server';
import { getAllSettings, updateSettings, initializeSettings } from '@/lib/settings';
import { auth } from '@/lib/auth';

// GET /api/admin/settings - Get all settings
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    const settings = await getAllSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    const body = await request.json();
    const { settings } = body;
    
    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Format invalide' },
        { status: 400 }
      );
    }
    
    await updateSettings(settings);
    
    return NextResponse.json({
      success: true,
      message: 'Paramètres mis à jour avec succès',
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des paramètres' },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings/init - Initialize default settings
export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    await initializeSettings();
    
    return NextResponse.json({
      success: true,
      message: 'Paramètres initialisés avec succès',
    });
  } catch (error) {
    console.error('Error initializing settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation des paramètres' },
      { status: 500 }
    );
  }
}

