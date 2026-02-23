import { CreateSessionUseCase } from '@/core/application/session/create-session.use-case';
import { ISession } from '@/core/domain/sessions/session.entity';
import { SessionRepository } from '@/core/domain/sessions/session.repository';

describe('CreateSessionUseCase', () => {
  const input: ISession = {
    id: '1',
    title: 'Title 01',
    note: 'Content 01',
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionDate: new Date(),
  };

  const repository: SessionRepository = {
    findMany: jest.fn(),
    searchMany: jest.fn(),
    create: jest.fn(),
  };

  it('should call repository.create with correct data', async () => {
    const create = jest.fn().mockResolvedValue(undefined);
    const repositoryWithSpy: SessionRepository = {
      ...repository,
      create,
    };

    const useCase = new CreateSessionUseCase(repositoryWithSpy);

    await useCase.execute(input);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith(input);
  });

  it('should throw if repository.create throws', async () => {
    const create = jest
      .fn()
      .mockRejectedValueOnce(new Error('Repository error'));
    const repositoryWithSpy: SessionRepository = {
      ...repository,
      create,
    };

    const useCase = new CreateSessionUseCase(repositoryWithSpy);

    await expect(useCase.execute(input)).rejects.toThrow('Repository error');
  });
});
