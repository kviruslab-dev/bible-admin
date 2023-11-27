import { ColumnType, ProductColumnType, TodayColumnType } from '@/constants/column';
import { use } from 'react';
import { Container } from './_container';

type ResData = { data: TodayColumnType[] };

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  const { type = 'todaybook' } = searchParams;

  const data = use(
    fetch(`https://spare25backend.givemeprice.co.kr/admin/${type}?take=50&page=1`, { cache: 'no-cache' })
      .then(res => res.json())
      .catch(err => console.log(err)) as Promise<ResData>
  ).data;

  if (type === 'malsum') {
    return <></>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data} />
    </main>
  );
}
