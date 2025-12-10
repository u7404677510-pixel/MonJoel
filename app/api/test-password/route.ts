import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@monjoel.com' },
      select: {
        passwordHash: true,
      },
    });

    if (!user?.passwordHash) {
      return NextResponse.json({ error: 'User or password not found' }, { status: 404 });
    }

    const testPassword = 'admin123';
    const isValid = await compare(testPassword, user.passwordHash);

    return NextResponse.json({
      passwordHash: user.passwordHash.substring(0, 20) + '...',
      testPassword,
      isValid,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error testing password' }, { status: 500 });
  }
}

