import { ProductGrid } from '@/components/product-grid';
import { ColumnType, ProductColumnType, columns, productColumn } from '@/constants/column';
import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { use } from 'react';

type ResData = { data: ColumnType[] } | { data: ProductColumnType[] };

export default function Page({ searchParams }: { searchParams: { type: string; city: string } }) {
  const { type = 'main', city = '서울' } = searchParams;

  const data: any = use(
    instance.get('/admin/select', { params: { type }, cache: 'force-cache' }).then((res: any) => res.data)
  );
  const location = use(instance.get('/admin/local', { params: { type: city }, cache: 'force-cache' }));
  // console.log(location)

  return (
    <main className="min-h-screen bg-gray-50 ">
      <div className="h-[50px]" />
      <section className="flex justify-center">
        <div className="w-[1200px] h-[700px] overflow-auto">
          {type !== 'product' ? <GridProvider data={data?.data} /> : <ProductGrid data={data?.data} />}
        </div>
      </section>
    </main>
  );
}
