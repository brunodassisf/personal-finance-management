import WrapperLayout from './index';

import { render } from '@testing-library/react';

describe('<WrapperLayout />', () => {
  it('Must have render component and children', () => {
    render(
      <WrapperLayout>
        <div>body component</div>
      </WrapperLayout>
    );
  });
});
