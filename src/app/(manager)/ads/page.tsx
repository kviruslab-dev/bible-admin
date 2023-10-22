import { ProductGrid } from '@/components/product-grid';
import { ColumnType, ProductColumnType, columns, productColumn } from '@/constants/column';
import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { use } from 'react';

type ResData = { data: ColumnType[] } | { data: ProductColumnType[] };

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  const { type = 'main' } = searchParams;

  const data: any = use(
    instance.get('/admin/select', { params: { type }, cache: 'force-cache' }).then((res: any) => res.data)
  );
  const location = use(instance.get('/admin/local', { params: { type: '서울' }, cache: 'force-cache' }));
  // console.log(location)

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center">
      <section className="w-[1200px] h-[700px] py-30 px-10 overflow-x-scroll">
        {type !== 'product' ? <GridProvider data={data?.data} /> : <ProductGrid data={data?.data} />}
      </section>
    </main>
  );
}
