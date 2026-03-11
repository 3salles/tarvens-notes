import Auth from '@/app/(auth)/auth/page';
import { render, screen } from '@testing-library/react';
const makeSut = () => {
  return render(<Auth />);
};

describe('AuthPage', () => {
  describe('Login', () => {
    it('should show login heading when login mode is activated', () => {
      makeSut();

      expect(
        screen.getByRole('heading', {
          name: /bem-vindo de volta, Aventureiro!/i,
        })
      ).toBeVisible();
    });

    it('should show login sub heading when login mode is activated', () => {
      makeSut();

      expect(
        screen.getByText('Entre para continuar sua campanha')
      ).toBeVisible();
    });

    it('should be activated login tab when it is login mode', () => {
      makeSut();

      expect(screen.getByRole('tab', { name: 'Entrar' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  // describe('LoginForm', () => {
  //   it('should show email and password form field', () => {
  //     makeSut();

  //     const email = screen.getByRole('textbox', { name: /email/i });
  //     const password = screen.getByRole('textbox', { name: /senha/i });

  //     expect(email).toBeVisible();
  //     expect(password).toBeVisible();
  //   });

  //   it('should show forgot password link', () => {
  //     makeSut();

  //     const link = screen.getByRole('link', { name: /esqueceu a senha?/i });

  //     expect(link).toBeVisible();
  //   });
  // });
});
