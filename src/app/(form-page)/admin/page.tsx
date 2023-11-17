import { instance } from '@/utils/woxios';
import { use } from 'react';
import { Container } from './_container';

export default function App({ searchParams }: any) {
  const { page = '1' } = searchParams;

  const data: any = use(
    instance.get('/cms', {
      params: {
        take: '100',
        page,
      },
      cache: 'no-cache',
    })
  );

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data?.data} type={page} />
    </main>
  );
}
