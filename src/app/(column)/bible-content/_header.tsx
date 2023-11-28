import { ADS, TODAY_CONTENT } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLayout({ type, children }: { type: string; children?: React.ReactNode }) {
  const header = Object.keys(TODAY_CONTENT);

  return (
    <>
      <header className="fixed z-[400] flex justify-center bg-white bg-opacity-90 w-full px-24">
        <section className="min-w-[1200px] flex justify-between items-center">
          <div className="relative">
            <Image src={'/logo.png'} width={50} height={50} alt="로고" />
            <span className="text-xs absolute -top-5 -right-90 p-4 bg-blue-400 text-white rounded-md">
              바이블25 어드민
            </span>
          </div>
          <section className="flex h-[80px] w-[650px] justify-between items-center">
            {header.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: '/bible-content',
                    query: { type: TODAY_CONTENT[item as keyof typeof TODAY_CONTENT] },
                  }}
                  className={`px-10 py-13 text-14 rounded-lg hover:bg-[#ededed] ${
                    TODAY_CONTENT[item as keyof typeof TODAY_CONTENT].includes(type)
                      ? 'text-main font-semibold'
                      : 'text-gray-500 font-normal'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </section>
          <div className="text-14 flex items-center text-gray-700">{children}</div>
        </section>
      </header>
      <div className="h-[80px]" />
    </>
  );
}
