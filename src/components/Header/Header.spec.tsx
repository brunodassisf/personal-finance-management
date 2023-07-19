import Header from './index';

import { render, screen } from '@testing-library/react';

describe('<Haeder />', () => {
  it('Must have render logo and title', () => {
    const { container } = render(<Header />);
    const checkName = screen.getByText('Finanças pessoais');
    const haveLogo = container.querySelector('svg');

    expect(checkName).toBeInTheDocument();
    expect(haveLogo).toBeInTheDocument();
    expect(haveLogo).toHaveAttribute('width', '24');
    expect(haveLogo).toHaveAttribute('height', '24');
  });
});
