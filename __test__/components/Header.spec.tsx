import { render } from '@testing-library/react';

describe('<Haeder />', () => {
  it('Must have render logo and title', () => {
    render(<Header />);
  });
});
