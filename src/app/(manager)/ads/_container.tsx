'use client';

import { ADS } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function HeaderLayout() {
  const searchParams = useSearchParams().get('type') ?? 'main';
  const header = Object.keys(ADS);

  return (
    <>
      <header className="fixed z-[999] flex justify-center bg-white bg-opacity-90 w-full px-24">
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
                  href={{ pathname: '/ads', query: { type: ADS[item as keyof typeof ADS] } }}
                  className={`px-10 py-13 text-14 rounded-lg hover:bg-[#ededed] ${
                    ADS[item as keyof typeof ADS].includes(searchParams!)
                      ? 'text-main font-semibold'
                      : 'text-gray-500 font-normal'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </section>
          <div className="text-14 flex items-center text-gray-700">
            <Link
              href={'/signin'}
              className="px-12 py-8 rounded-lg mr-10 border-[2px] transition-all ease-in-out hover:border-gray-400 hover:ease-in-out"
            >
              로그아웃
            </Link>
            <Link
              href={'/'}
              className="bg-blue-500 text-white px-12 py-8 rounded-lg transition-all ease-in-out hover:bg-blue-600 hover:ease-in-out"
            >
              푸시 알림
            </Link>
          </div>
        </section>
      </header>
      <div className="h-[80px]" />
    </>
  );
}

// const headersList = headers();r
// const url = new URL(headersList.get('referer') as string).searchParams.get('type');
