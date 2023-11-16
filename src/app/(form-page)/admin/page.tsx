import { instance } from '@/utils/woxios';
import { use } from 'react';
import { Container } from './_container';
import { ChartBox } from './_component';

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

  console.log(data?.data);

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data?.data} type={page} />
      <ChartBox />
    </main>
  );
}

const status = ['상담신청', '상담취소', '상담완료', '설치완료'];
