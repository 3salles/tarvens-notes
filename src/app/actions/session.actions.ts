'use server';

import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { prisma } from '@/lib/prisma';

type SearchFromState = {
  success: boolean;
  sessions?: ISessionSummary[];
  message?: string;
};

export async function searchSessionAction(
  _prev: SearchFromState,
  formData: FormData
): Promise<SearchFromState> {
  const term = String(formData.get('q') ?? '').trim();

  try {
    const sessions = await prisma.session.findMany({
      where: term
        ? {
            OR: [
              {
                title: { contains: term, mode: 'insensitive' },
              },
              { note: { contains: term, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const summaries = sessions.map(({ id, title, note }) => ({
      id,
      title,
      note,
    }));

    return {
      success: true,
      sessions: summaries,
    };
  } catch {
    return {
      success: false,
      message: 'Falha ao buscar sessões',
    };
  }
}
{
}
