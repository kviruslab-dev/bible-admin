import { TodayColumnType } from '@/constants/column';
import { use } from 'react';
import { Container } from './_container';
import { MalsumContainer, defaultRow } from './_malsum';
import HeaderLayout from './_header';

// type ResData = { data: TodayColumnType[] };
// type malsumData = { data: typeof defaultRow[] };

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  const { type = 'todaybook' } = searchParams;

  const data = use(
    fetch(`https://spare25backend.givemeprice.co.kr/admin/${type}?take=50&page=1`, { cache: 'no-cache' })
      .then(res => res.json())
      .catch(err => console.log(err))
  ).data;

  if (type === 'malsum') {
    return (
      <>
        <HeaderLayout type={type} />
        <main className="min-h-screen bg-gray-50 px-50">
          <MalsumContainer data={data} />
        </main>
      </>
    );
  }

  return (
    <>
      <HeaderLayout type={type} />
      <main className="min-h-screen bg-gray-50 px-50">
        <Container data={data} />
      </main>
    </>
  );
}
