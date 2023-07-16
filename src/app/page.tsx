import Balance from 'components/Balance';
import getUser from 'hook/getUser';

export default async function HomeScreen() {
  const { data, error } = await getUser();
  if (error) throw Error(error);

  return (
    <div className="flex flex-col md:grid grid-cols-3">
      <Balance info={data.user} />
    </div>
  );
}
