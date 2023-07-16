import Header from '../Header';

function WrapperLayiout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto pt-10 px-4 xl:px-0">{children}</main>
    </>
  );
}

export default WrapperLayiout;
