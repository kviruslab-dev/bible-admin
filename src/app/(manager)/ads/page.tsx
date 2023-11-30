import { DonateGrid } from '@/components/bd-grid';
import { ProductGrid } from '@/components/product-grid';
import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { use } from 'react';

export default function Page({ searchParams }: { searchParams: { type: string; city: string } }) {
  const { type = 'main' } = searchParams;

  const data = use(
    instance.get('/admin/select', { params: { type }, cache: 'no-cache' }).then((res: any) => res.data)
  ).data;

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
}
