import { render, screen } from '@testing-library/react';

describe('Exemplo', () => {
  it('deve passar', () => {
    render(<div>Teste</div>);

    expect(screen.getByText('Teste')).toBeInTheDocument();
  });
});
