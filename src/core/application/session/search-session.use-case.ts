import { SessionRepository } from '@/core/domain/sessions/session.repository';

export class SearchSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(term?: string) {
    const q = term?.trim() ?? '';

    if (!q) {
      return this.sessionRepository.findMany();
    }

    return this.sessionRepository.searchMany(q);
  }
}
