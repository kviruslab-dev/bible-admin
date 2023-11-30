import { instance } from '@/utils/woxios';
import { use } from 'react';
import { Container } from './_container';

export default function App({ searchParams }: any) {
  const { page = '1' } = searchParams;

  const data = use(
    fetch('https://spare25backend.givemeprice.co.kr/cms?page=1&take=500', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  )?.data;

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data} type={page} />
    </main>
  );
}
