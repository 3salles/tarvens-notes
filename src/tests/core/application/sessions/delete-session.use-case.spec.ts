import { DeleteSessionUseCase } from '@/core/application/session/delete-session.use-case';
import { SessionRepository } from '@/core/domain/sessions/session.repository';

const makeRepository = (
  overrides: Partial<SessionRepository> = {}
): SessionRepository => {
  const base = {
    delete: jest.fn(async () => {}),
    findBy: jest.fn(async () => {}),
  };

  return { ...base, ...overrides } as SessionRepository;
};

describe('DeleteSessionRepository', () => {
  it('should remove session when it exists', async () => {
    const now = new Date();
    const session = {
      id: '1',
      title: 'Title',
      note: 'Note',
      sessionDate: now,
      createdAt: now,
      updatedAt: now,
    };

    const repository = makeRepository({
      delete: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn().mockResolvedValue(session),
    });

    const useCase = new DeleteSessionUseCase(repository);
    const result = await useCase.execute(session.id);

    expect(result).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(session.id);
  });

  it('should throws SESSION_NOT_FOUND when session does not exists', async () => {
    const repository = makeRepository({
      findById: jest.fn().mockResolvedValue(null),
    });

    const useCase = new DeleteSessionUseCase(repository);
    await expect(useCase.execute('1')).rejects.toThrow('SESSION_NOT_FOUND');
  });
});
