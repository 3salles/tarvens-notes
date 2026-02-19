import { searchSessionAction } from '@/app/actions/session.actions';

jest.mock('@/lib/prisma', () => ({ prisma: {} }));
const mockedSearchExecute = jest.fn();

jest.mock('@/core/application/session/search-session.use-case', () => ({
  SearchSessionUseCase: jest
    .fn()
    .mockImplementation(() => ({ execute: mockedSearchExecute })),
}));

describe('Server Actions: Sessions', () => {
  beforeEach(() => {
    mockedSearchExecute.mockReset();
  });

  describe('searchSessionAction', () => {
    it('should return success with search result term not empty', async () => {
      const input = [{ id: '1', title: 'Sessão 01', note: 'Content' }];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();
      formData.append('q', '01');

      const result = await searchSessionAction({ success: true }, formData);
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });

    it('should return success and return all sessions when term is empty', async () => {
      const input = [
        { id: '1', title: 'First', note: 'Content 01' },
        { id: '2', title: 'Second', note: 'Content 02' },
      ];
      mockedSearchExecute.mockResolvedValue(input);
      const formData = new FormData();
      formData.append('q', '');

      const result = await searchSessionAction({ success: true }, formData);
      expect(result.success).toBeDefined();
      expect(result.sessions).toEqual(input);
    });

    it('should return generic error when search fails', async () => {
      const error = new Error('UNKNOWN');
      mockedSearchExecute.mockRejectedValue(error);

      const formData = new FormData();
      formData.append('q', 'error');

      const result = await searchSessionAction({ success: true }, formData);

      expect(result.success).toBe(false);
      expect(result.sessions).toBe(undefined);
      expect(result.message).toBe('Falha ao buscar sessões');
    });

    it('should treat the absence of a query as an empty term', async () => {
      const input = [
        { id: '1', title: 'First title', note: 'Content 01' },
        { id: '2', title: 'Second title', note: 'Content 02' },
      ];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();

      const result = await searchSessionAction({ success: true }, formData);

      expect(mockedSearchExecute).toHaveBeenCalledWith('');
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });

    it('should trim the spaces in the term before executing', async () => {
      const input = [{ id: '1', title: 'Sessão 01', note: 'Content' }];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();
      formData.append('q', '    Sessão 01   ');

      const result = await searchSessionAction({ success: true }, formData);

      expect(mockedSearchExecute).toHaveBeenCalledWith('Sessão 01');
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });
  });
});
