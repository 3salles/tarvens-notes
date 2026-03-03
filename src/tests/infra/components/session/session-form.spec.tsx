import { SessionForm, SessionFormProps } from '@/components/session';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const refreshMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const createActionMock = jest.fn();
const updateActionMock = jest.fn();
jest.mock('@/app/actions/session.actions', () => ({
  createSessionAction: (...args: unknown[]) => createActionMock(...args),
  updateSessionAction: (...args: unknown[]) => updateActionMock(...args),
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const renderSut = ({ session }: SessionFormProps = {} as SessionFormProps) => {
  return render(<SessionForm session={session} />);
};

describe('SessionForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    createActionMock.mockReset();
    updateActionMock.mockReset();
    refreshMock.mockReset();
    (toast.success as jest.Mock).mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('should create a session successfully', async () => {
    const successMessage = 'Sessão criada com sucesso!';
    createActionMock.mockResolvedValueOnce({
      success: true,
      message: successMessage,
    });
    renderSut();

    const titleInput = screen.getByPlaceholderText('Título da sessão');
    await user.type(titleInput, 'Title');
    const noteInput = screen.getByPlaceholderText(
      'Digite o conteúdo da sessão...'
    );
    await user.type(noteInput, 'Content');

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(createActionMock).toHaveBeenCalledWith({
      title: 'Title',
      note: 'Content',
    });
    expect(toast.success).toHaveBeenCalledWith(successMessage);
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it('should show toast error when session creation has error', async () => {
    const errorMessage = 'Falha ao criar sessão';
    createActionMock.mockResolvedValueOnce({
      success: false,
      message: errorMessage,
    });
    renderSut();

    const titleInput = screen.getByPlaceholderText('Título da sessão');
    await user.type(titleInput, 'Title');
    const noteInput = screen.getByPlaceholderText(
      'Digite o conteúdo da sessão...'
    );
    await user.type(noteInput, 'Content');

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(refreshMock).not.toHaveBeenCalledTimes(1);
  });

  it('should show error message when try save empty form', async () => {
    renderSut();

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(screen.getByText('Título é obrigatório')).toBeVisible();
    expect(screen.getByText('Conteúdo é obrigatório')).toBeVisible();
    expect(createActionMock).not.toHaveBeenCalled();
  });

  it('should successfully update a session', async () => {
    updateActionMock.mockResolvedValue({
      success: true,
      message: 'Sessão atualizada com sucesso!',
    });
    const now = new Date();
    const session = {
      id: '1',
      title: 'old',
      note: 'old',
      createdAt: now,
      updatedAt: now,
      sessionDate: now,
    };

    renderSut({ session });

    const titleInput = screen.getByPlaceholderText('Título da sessão');
    await user.clear(titleInput);
    await user.type(titleInput, 'New');

    const noteInput = screen.getByPlaceholderText(
      'Digite o conteúdo da sessão...'
    );
    await user.clear(noteInput);
    await user.type(noteInput, 'New note');

    const submitButton = screen.getByRole('button', { name: 'Salvar' });
    await user.click(submitButton);

    expect(updateActionMock).toHaveBeenCalledWith({
      id: session.id,
      title: 'New',
      note: 'New note',
    });
    expect(toast.success).toHaveBeenCalledWith(
      'Sessão atualizada com sucesso!'
    );
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
