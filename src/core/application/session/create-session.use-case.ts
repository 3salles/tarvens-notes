import { SessionRepository } from '@/core/domain/sessions/session.repository';
import { CreateSessionDTO } from './create-session.dto';

export class CreateSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(data: CreateSessionDTO): Promise<void> {
    await this.sessionRepository.create(data);
  }
}
