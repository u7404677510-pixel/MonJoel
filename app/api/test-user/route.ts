import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@monjoel.com' },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      hasPassword: !!user.passwordHash,
      passwordLength: user.passwordHash?.length || 0,
      role: user.role,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

