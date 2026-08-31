import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

const githubClientId =
  process.env.AUTH_GITHUB_ID ||
  process.env.GITHUB_ID ||
  process.env.GITHUB_CLIENT_ID ||
  undefined;

const githubClientSecret =
  process.env.AUTH_GITHUB_SECRET ||
  process.env.GITHUB_SECRET ||
  process.env.GITHUB_CLIENT_SECRET ||
  undefined;

const googleClientId =
  process.env.AUTH_GOOGLE_ID ||
  process.env.GOOGLE_ID ||
  process.env.GOOGLE_CLIENT_ID ||
  undefined;

const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ||
  process.env.GOOGLE_SECRET ||
  process.env.GOOGLE_CLIENT_SECRET ||
  undefined;

// In production, AUTH_SECRET must be set via environment variable.
// In development, provide a fallback to prevent MissingSecret server crashes when env vars are missing.
const authSecret =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV !== 'production'
    ? 'local-dev-fallback-secret-key-32-chars-minimum!'
    : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: process.env.DATABASE_URL ? PrismaAdapter(prisma) : undefined,
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  pages: {
    signIn: '/guestbook',
    error: '/guestbook',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id || token.sub) as string;
        (session.user as { provider?: string }).provider = token.provider as string | undefined;
      }
      return session;
    },
  },
  secret: authSecret,
  trustHost: true,
});
