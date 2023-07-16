export default async function getUser() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: 'GET',
    cache: 'no-cache'
  });

  const data = await response.json();

  return { data, error: !response.ok && 'Ocorreu um erro, tente novamente mais tarde.' };
}
