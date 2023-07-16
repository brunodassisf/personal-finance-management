import Balance from 'components/Balance';

export default function HomeScreen() {
  const data = {
    name: 'Fulano de tal',
    phone: 99999999999,
    balance: 0
  };
  return (
    <div className="grid grid-cols-3">
      <Balance info={data} />
    </div>
  );
}
