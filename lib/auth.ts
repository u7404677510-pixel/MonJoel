import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { z } from 'zod';

import { prisma } from '@/lib/db';
import type { UserRole, SessionUser } from '@/types';

// ===========================================
// Auth.js Configuration
// ===========================================

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Note: We don't use PrismaAdapter with Credentials provider + JWT strategy
  // because it causes conflicts. The adapter is meant for OAuth providers.
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log('[Auth] Invalid credentials format');
          return null;
        }

        const { email, password } = parsed.data;
        console.log('[Auth] Attempting login for:', email);

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            passwordHash: true,
            role: true,
            isActive: true,
          },
        });

        if (!user) {
          console.log('[Auth] User not found');
          return null;
        }
        
        if (!user.passwordHash) {
          console.log('[Auth] No password hash for user');
          return null;
        }
        
        if (!user.isActive) {
          console.log('[Auth] User is inactive');
          return null;
        }

        const isValidPassword = await compare(password, user.passwordHash);
        console.log('[Auth] Password valid:', isValidPassword);
        if (!isValidPassword) return null;

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: UserRole }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});

// ===========================================
// Auth Helpers
// ===========================================

/**
 * Get the current session on the server
 */
export async function getServerSession(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user) return null;

  return {
    id: session.user.id as string,
    email: session.user.email as string,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
    role: (session.user.role as UserRole) ?? 'CLIENT',
    isActive: true,
    emailVerified: null,
  };
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: SessionUser | null, requiredRole: UserRole | UserRole[]): boolean {
  if (!user) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
}

/**
 * Check if user is admin
 */
export function isAdmin(user: SessionUser | null): boolean {
  return hasRole(user, 'ADMIN');
}

/**
 * Check if user is artisan
 */
export function isArtisan(user: SessionUser | null): boolean {
  return hasRole(user, ['ARTISAN', 'ADMIN']);
}

/**
 * Check if user is technician
 */
export function isTechnician(user: SessionUser | null): boolean {
  return hasRole(user, ['TECH', 'ARTISAN', 'ADMIN']);
}

// ===========================================
// Type Augmentation for NextAuth
// ===========================================

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }

  interface User {
    role?: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

