import { render } from '@testing-library/react';
import Balance from './index';

describe('<Balance />', () => {
  it('Must have render component and children', () => {
    const data = {
      name: 'Fulano de tal',
      phone: 99999999999,
      balance: 0
    };
    render(<Balance info={data} />);
  });
});
