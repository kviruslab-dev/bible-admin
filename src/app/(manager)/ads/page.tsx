import { GridProvider } from '@/lib/provider/grid-provider';
import { instance } from '@/utils/woxios';
import { use } from 'react';
import { woxios } from 'woxios';

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  console.log(searchParams);
  const { data }: any = use(instance.get('/admin/select', { params: { type: searchParams.type }, cache: 'no-cache' }));

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center">
      <section className="w-[1200px] h-[700px] py-30 px-10 overflow-x-scroll overflow-y-scroll">
        <GridProvider data={data?.data}></GridProvider>
      </section>
    </main>
  );
}
