import { GridProvider } from '@/lib/provider/grid-provider';

export default function Page({ searchParams }: { searchParams: { type: string } }) {
  console.log(searchParams);

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="px-100 py-30">
        <GridProvider></GridProvider>
      </section>
    </main>
  );
}
