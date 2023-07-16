import { render, screen } from '@testing-library/react';
import WrapperLayout from './index';

describe('<WrapperLayout />', () => {
  it('Must have render component and children', () => {
    render(
      <WrapperLayout>
        <div>body component</div>
      </WrapperLayout>
    );
  });
});
