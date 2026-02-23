import { CopyButton, CopyButtonProps } from '@/components/button-actions';
import { act, render, screen, waitFor } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));
const writeTextMock = jest.fn();

const renderSut = (
  { content = '' }: CopyButtonProps = {} as CopyButtonProps
) => {
  return render(<CopyButton content={content} />);
};

describe('CopyButton', () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    writeTextMock.mockReset();
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    });
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  it('should disable button when content is empty', async () => {
    const content = '    ';
    renderSut({ content });

    const button = screen.getByRole('button', { name: /copiar/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(writeTextMock).not.toHaveBeenCalled();
  });

  it(`should copy and alter label to "Copiado" and return to "Copiar"`, async () => {
    writeTextMock.mockResolvedValueOnce(undefined);
    const content = 'text';
    renderSut({ content });

    const button = screen.getByRole('button', { name: /copiar/i });
    await user.click(button);

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /copiado/i })
      ).toBeInTheDocument()
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /copiar/i })
      ).toBeInTheDocument();
    });
  });

  it('should clear timer before copy again', async () => {
    writeTextMock.mockResolvedValueOnce(undefined);
    const clearSpy = jest.spyOn(window, 'clearTimeout');
    const content = 'text';
    renderSut({ content });

    const button = screen.getByRole('button', { name: /copiar/i });
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /copiado/i })
      ).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: /copiado/i }));

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('should show error toast when copy fails', async () => {
    const errorMessage = 'falha ao copiar';
    const error = new Error(errorMessage);
    jest
      .spyOn(global.navigator.clipboard, 'writeText')
      .mockRejectedValueOnce(error);
    const content = 'text';
    renderSut({ content });

    const button = screen.getByRole('button', { name: /copiar/i });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        `Erro ao copiar mensagem: ${errorMessage}`
      );
    });
    expect(screen.getByRole('button', { name: /copiar/i })).toBeVisible();
  });
});
