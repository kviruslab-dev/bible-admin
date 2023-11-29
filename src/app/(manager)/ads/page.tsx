import { DonateGrid } from '@/components/bd-grid';
import { ProductGrid } from '@/components/product-grid';
import { ColumnType, ProductColumnType, columns, productColumn } from '@/constants/column';
import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { use } from 'react';

type ResData = { data: ColumnType[] | ProductColumnType[] };

export default function Page({ searchParams }: { searchParams: { type: string; city: string } }) {
  const { type = 'main' } = searchParams;

  const data: any = use(
    instance.get('/admin/select', { params: { type }, cache: 'no-cache' }).then((res: any) => res.data)
  ).data;

  console.log(data);

  switch (type) {
    case 'product':
      return (
        <main className="min-h-screen bg-gray-50 px-50">
          <ProductGrid data={data} />
        </main>
      );
    case 'donate':
      return (
        <main className="min-h-screen bg-gray-50 px-50">
          <DonateGrid data={data} />
        </main>
      );
    default:
      return (
        <main className="min-h-screen bg-gray-50 px-50">
          <GridProvider data={data} type={type} />
        </main>
      );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      {type !== 'product' ? <GridProvider data={data} type={type} /> : <ProductGrid data={data} />}
    </main>
  );
}
