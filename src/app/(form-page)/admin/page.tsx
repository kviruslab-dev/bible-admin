import { instance } from '@/utils/woxios';
import { use } from 'react';
import { Container } from './_container';

// const getData = (url) => {
//   return
// }

export default function App({ searchParams }: any) {
  const { page = '1' } = searchParams;

  const data: any = use(
    fetch('https://dev25backend.givemeprice.co.kr/cms?page=1&take=500', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then(res => res.json())
      .catch(err => console.log(err))

    // instance.get('/cms', {
    //   params: {
    //     take: '100',
    //     page,
    //   },
    //   cache: 'no-cache',
    // }).catch(err => console.log(err))
  );

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data?.data} type={page} />
    </main>
  );
}
