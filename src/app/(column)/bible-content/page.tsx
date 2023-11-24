import { ColumnType, ProductColumnType } from '@/constants/column';
import { use } from 'react';
import { Container } from './_container';

type ResData = { data: ColumnType[] | ProductColumnType[] };

export default function Page() {
  const data = use(
    fetch('https://spare25backend.givemeprice.co.kr/admin/todaybook?take=100&page=1', { cache: 'no-cache' })
      .then(res => res.json())
      .catch(err => console.log(err)) as Promise<ResData>
  ).data;

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      <Container data={data as any} />
    </main>
  );
}
