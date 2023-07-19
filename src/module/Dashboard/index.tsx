'use client';
import Skeleton from 'react-loading-skeleton';

import Balance from 'components/Balance';
import History from 'components/History';
import Movements from 'components/Movements';

import useGetUser from 'hook/getUser';

export default function Dashboard() {
  const { data } = useGetUser();

  return (
    <section className="grid grid-cols-3 gap-3 pb-10">
      <article className="col-span-3 md:col-span-1">
        {data ? <Balance data={data} /> : <Skeleton height={200} />}
      </article>
      <article className="col-span-3 md:col-span-2">
        {data ? <Movements balance={data?.user.balance} /> : <Skeleton height={200} />}
      </article>
      <article className="col-span-3">
        {data ? <History list={data?.history} /> : <Skeleton height={200} />}
      </article>
    </section>
  );
}
