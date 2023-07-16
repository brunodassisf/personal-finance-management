import Header from '../Header';

function WrapperLayiout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default WrapperLayiout;
