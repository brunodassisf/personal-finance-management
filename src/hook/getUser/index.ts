import useSWR from 'swr';
import { IUser } from 'util/interface';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useGetUser() {
  const { data, error, isLoading, mutate } = useSWR<IUser>(`/api/user`, fetcher);

  return { data, error, isLoading, mutate };
}
