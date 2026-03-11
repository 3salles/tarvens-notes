import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '@/app/[locale]/(auth)/auth/page';

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      auth: {
        title: 'Bem-vindo de volta,',
        subtitle: 'Aventureiro!',
        description: 'Entre para continuar sua campanha',
        'tabs.login': 'Entrar',
        'tabs.signup': 'Criar conta',
        or: 'ou',
        'googleButton.login': 'Continuar com Google',
        'googleButton.signup': 'Cadastrar com Google',
      },
      authForm: {
        email: 'Email',
        password: 'Senha',
        forgotPassword: 'Esqueceu a senha?',
        enter: 'Entrar na campanha',
        registerSubmit: 'Criar conta',
        nameLabel: 'Seu nome',
        namePlaceholder: 'Como te chamamos?',
      },
      tabHero: {
        quote:
          'Every great campaign begins with a single note written in the dark.',
        author: "— The Game Master's Creed",
      },
    };
    return (key: string) => translations[namespace]?.[key] ?? key;
  },
}));

jest.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      whileTap: _whileTap,
      layout: _layout,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock('@/components/animations', () => ({
  TomeScene: () => null,
}));

jest.mock('@/components/logo', () => ({
  Logo: () => <span>Logo</span>,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const makeSut = () => render(<Auth />);

describe('AuthPage', () => {
  describe('Login tab (default)', () => {
    it('should show login heading', () => {
      makeSut();

      expect(
        screen.getByRole('heading', { name: /bem-vindo de volta,/i })
      ).toBeVisible();
    });

    it('should show login subtitle', () => {
      makeSut();

      expect(screen.getByText('Aventureiro!')).toBeVisible();
    });

    it('should show login description', () => {
      makeSut();

      expect(
        screen.getByText('Entre para continuar sua campanha')
      ).toBeVisible();
    });

    it('should have login tab selected by default', () => {
      makeSut();

      expect(screen.getByRole('tab', { name: 'Entrar' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('should have signup tab not selected by default', () => {
      makeSut();

      expect(screen.getByRole('tab', { name: 'Criar conta' })).toHaveAttribute(
        'aria-selected',
        'false'
      );
    });

    it('should show email field', () => {
      makeSut();

      expect(screen.getByLabelText(/email/i)).toBeVisible();
    });

    it('should show password field', () => {
      makeSut();

      expect(screen.getByLabelText(/senha/i)).toBeVisible();
    });

    it('should show forgot password link', () => {
      makeSut();

      expect(
        screen.getByRole('link', { name: /esqueceu a senha\?/i })
      ).toBeVisible();
    });

    it('should show submit button with login label', () => {
      makeSut();

      expect(
        screen.getByRole('button', { name: /entrar na campanha/i })
      ).toBeVisible();
    });

    it('should show Google button with login text', () => {
      makeSut();

      expect(
        screen.getByRole('button', { name: /continuar com google/i })
      ).toBeVisible();
    });
  });

  describe('Signup tab', () => {
    const user = userEvent.setup();

    const renderAndSwitchToSignup = async () => {
      makeSut();
      await user.click(screen.getByRole('tab', { name: 'Criar conta' }));
    };

    it('should select signup tab when clicked', async () => {
      await renderAndSwitchToSignup();

      expect(screen.getByRole('tab', { name: 'Criar conta' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('should deselect login tab when signup is clicked', async () => {
      await renderAndSwitchToSignup();

      expect(screen.getByRole('tab', { name: 'Entrar' })).toHaveAttribute(
        'aria-selected',
        'false'
      );
    });

    it('should show name field', async () => {
      await renderAndSwitchToSignup();

      expect(screen.getByLabelText(/seu nome/i)).toBeVisible();
    });

    it('should show email field', async () => {
      await renderAndSwitchToSignup();

      expect(screen.getByLabelText(/email/i)).toBeVisible();
    });

    it('should show password field', async () => {
      await renderAndSwitchToSignup();

      expect(screen.getByLabelText(/senha/i)).toBeVisible();
    });

    it('should show submit button with signup label', async () => {
      await renderAndSwitchToSignup();

      expect(
        screen.getByRole('button', { name: /criar conta/i })
      ).toBeVisible();
    });

    it('should show Google button with signup text', async () => {
      await renderAndSwitchToSignup();

      expect(
        screen.getByRole('button', { name: /cadastrar com google/i })
      ).toBeVisible();
    });
  });
});
