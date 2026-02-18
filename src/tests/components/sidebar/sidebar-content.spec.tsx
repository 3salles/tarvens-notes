import { SidebarContent } from '@/components/sidebar/sidebar-content';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const renderSut = () => render(<SidebarContent />);

describe('SidebarContent', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("should render the sidebar and the 'Nova Sessão' button", () => {
    // Given
    renderSut();

    // Then
    expect(screen.getByRole('complementary')).toBeVisible();
    expect(screen.getByRole('button', { name: /nova sessão/i })).toBeVisible();
  });

  describe('Collapse and expand', () => {
    it('should start expanded and show the minimize button', () => {
      // Given
      renderSut();

      // Then
      expect(screen.getByRole('complementary')).toBeVisible();

      expect(
        screen.getByRole('button', { name: /minimizar sidebar/i })
      ).toBeVisible();

      expect(
        screen.queryByRole('button', { name: /expandir sidebar/i })
      ).not.toBeInTheDocument();
    });

    it('should collapse the sidebar and show the expand button', async () => {
      // Given
      const user = userEvent.setup();
      renderSut();

      // When
      await user.click(
        screen.getByRole('button', { name: /minimizar sidebar/i })
      );

      // Then
      expect(
        screen.getByRole('button', { name: /expandir sidebar/i })
      ).toBeVisible();

      expect(
        screen.queryByRole('button', { name: /minimizar sidebar/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('New session navigation', () => {
    it("should navigate to /new when the user clicks on 'Nova Sessão'", async () => {
      // Given
      const user = userEvent.setup();
      renderSut();

      // When
      await user.click(screen.getByRole('button', { name: /nova sessão/i }));

      // Then
      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });
});
