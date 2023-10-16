import { GridProvider } from '@/lib/provider/grid-provider';

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  console.log(searchParams);

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center">
      <section className="w-[1200px] h-[400px] py-30 overflow-scroll">
        <GridProvider></GridProvider>
      </section>
    </main>
  );
}
