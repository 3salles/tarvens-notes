import { ISession } from '@/core/domain/sessions/session.entity';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaSessionRepository } from '@/infra/repository/prisma-session.repository';
import { CreateSessionDTO } from './../../../core/application/session/create-session.dto';

interface SessionDelegateMock {
  create: jest.MockedFunction<
    (args: { data: CreateSessionDTO }) => Promise<void>
  >;
  findMany: jest.MockedFunction<
    (args: {
      orderBy?: { createdAt: 'asc' | 'desc' };
      where?: {
        OR: Array<{
          title?: { contains: string; mode: 'insensitive' };
          note?: { contains: string; mode: 'insensitive' };
        }>;
      };
    }) => Promise<ISession[]>
  >;
}

interface PrismaMock {
  session: SessionDelegateMock;
}

function createMockPrisma() {
  const mock: PrismaMock = {
    session: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  return mock as unknown as PrismaClient & PrismaMock;
}

describe('PrismaSessionRepository', () => {
  let prisma: ReturnType<typeof createMockPrisma>;
  let repository: PrismaSessionRepository;

  beforeEach(() => {
    prisma = createMockPrisma();
    repository = new PrismaSessionRepository(prisma);
  });

  describe('findMany', () => {
    it('should order by createdAt desc and map results', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
        {
          id: '2',
          title: 'Title 02',
          note: 'Content 02',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.findMany();

      expect(prisma.session.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });
  });

  describe('searchMany', () => {
    it('should search by empty term and do not send where', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.searchMany('    ');
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });

    it('should search by term and use OR in where', async () => {
      const now = new Date();
      const input = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
          createdAt: now,
          updatedAt: now,
          sessionDate: now,
        },
      ];
      prisma.session.findMany.mockResolvedValue(input);

      const results = await repository.searchMany(' title 01   ');
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: 'title 01', mode: 'insensitive' } },
            { note: { contains: 'title 01', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toMatchObject(input);
    });
  });

  describe('create', () => {
    it('should call the method with args correctly', async () => {
      const input = {
        title: 'Title',
        note: 'Note',
        sessionDate: new Date(),
      };

      await repository.create(input);

      expect(prisma.session.create).toHaveBeenCalledWith({ data: input });
    });
  });
});
