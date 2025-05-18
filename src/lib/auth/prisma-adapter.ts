import { Adapter } from 'next-auth/adapters';
import { prisma } from '../prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { parse } from 'path';

interface Account {
  userId: string;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token?: string | null;
  expires_at?: number | null;
  refresh_token?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  token_type?: string | null;
}

interface user {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar_url: string;
}

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse,
): Adapter {
  return {
    async createUser(user: user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req });

      if (!userIdOnCookies) {
        throw new Error('User ID not found on cookies');
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/', // Limpa o cookie em todas as páginas
      });
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        return null;
      }
      const { user } = account;

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      };
    },

    async linkAccount(account: Account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          provider: account.provider,
          type: account.type,
          provider_account_id: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
          token_type: account.token_type,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires,
        },
      });
      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!prismaSession) {
        return null;
      }

      const { user, ...session } = prismaSession;

      return {
        session: {
          sessionToken,
          userId: user.id,
          expires: session.expires,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      };
    },
    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      });
      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });
    },
  };
}
