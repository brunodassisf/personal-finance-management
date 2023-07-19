import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import WrapperLayiout from 'components/WrapperLayout';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'style/main.css';

const roboto = Roboto({
  weight: ['100', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Finanças pessoais',
  description: 'Aplicativo para gerenciamento de finanças pessoais'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <WrapperLayiout>{children}</WrapperLayiout>
      </body>
    </html>
  );
}
