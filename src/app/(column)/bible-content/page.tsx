import { use } from 'react';
import { Container } from './_container';
import { MalsumContainer } from './_malsum';
import HeaderLayout from './_header';

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  const { type = 'todaybook' } = searchParams;

  const data = use(
    fetch(`https://spare25backend.givemeprice.co.kr/admin/${type}?take=50&page=1`, { cache: 'no-cache' })
      .then(res => res.json())
      .catch(err => console.log(err))
  ).data;

  switch (type) {
    case 'todaybook':
    case 'calum':
      return (
        <>
          <HeaderLayout type={type} />
          <main className="min-h-screen bg-gray-50 px-50">
            <Container data={data} type={type} />
          </main>
        </>
      );
    case 'malsum':
      return (
        <>
          <HeaderLayout type={type} />
          <main className="min-h-screen bg-gray-50 px-50">
            <MalsumContainer data={data} />
          </main>
        </>
      );
  }
}
