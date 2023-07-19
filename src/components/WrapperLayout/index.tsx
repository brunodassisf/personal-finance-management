'use client';
import { ToastContainer } from 'react-toastify';

import Header from '../Header';

function WrapperLayiout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto pt-5 px-4 xl:px-0">{children}</main>
      <ToastContainer />
    </>
  );
}

export default WrapperLayiout;
