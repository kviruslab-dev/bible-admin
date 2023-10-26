import { ProductGrid } from '@/components/product-grid';
import { ColumnType, ProductColumnType, columns, productColumn } from '@/constants/column';
import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { use } from 'react';

type ResData = { data: ColumnType[] | ProductColumnType[] };

export default function Page({ searchParams }: { searchParams: { type: string; city: string } }) {
  const { type = 'main', city = '서울' } = searchParams;

  const data: any = use(
    instance.get('/admin/select', { params: { type }, cache: 'force-cache' }).then((res: any) => res.data)
  );
  // const location = use(instance.get('/admin/local', { params: { type: city }, cache: 'force-cache' }));

  return (
    <main className="min-h-screen bg-gray-50 px-50">
      {type !== 'product' ? <GridProvider data={data?.data} type={type} /> : <ProductGrid data={data?.data} />}
    </main>
  );
}
