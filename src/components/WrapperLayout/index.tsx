'use client';
import { ToastContainer } from 'react-toastify';

import Header from '../Header';

import { AppProvider } from 'lib/ProviderApp';

function WrapperLayiout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppProvider>
        <Header />
        <main className="container mx-auto pt-5 px-4 xl:px-0">{children}</main>
        <ToastContainer />
      </AppProvider>
    </>
  );
}

export default WrapperLayiout;
