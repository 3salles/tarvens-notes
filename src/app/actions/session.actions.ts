'use server';

import { prisma } from '@/lib/prisma';

import { SearchSessionUseCase } from '@/core/application/session/search-session.use-case';
import { ISessionSummary } from '@/core/domain/sessions/session.entity';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';

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

  const sessionRepository = new PrismaSessionRepository(prisma);
  const sessionUseCase = new SearchSessionUseCase(sessionRepository);

  try {
    const sessions = await sessionUseCase.execute(term);

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
