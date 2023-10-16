'use client';

import { ADS } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
// import { headers } from 'next/headers';
import { useSearchParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams().get('type');
  // const headersList = headers();r
  // const url = new URL(headersList.get('referer') as string).searchParams.get('type');

  const header = Object.keys(ADS);

  return (
    <>
      <header className="fixed flex items-center justify-between bg-white bg-opacity-50 w-full px-24">
        <div className="relative">
          <Image src={'/logo.png'} width={50} height={50} alt="로고" />
          <span className="text-xs absolute -top-10 -right-90 p-3 bg-blue-400 text-white rounded-md">
            바이블25 어드민
          </span>
        </div>
        <section className="flex h-[80px] w-[600px] justify-between items-center mr-20">
          {header.map((item, index) => {
            return (
              <div key={index} className="px-6 font-medium text-14">
                <Link
                  href={'/ads' + ADS[item as keyof typeof ADS]}
                  className={
                    ADS[item as keyof typeof ADS].includes(searchParams!) ? 'text-main font-semibold' : 'text-gray-600'
                  }
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </section>
        <div className="text-14">
          <Link href={'/signin'} className="px-6 py-10 rounded-lg mr-10 border-[2px]">
            로그아웃
          </Link>
          <Link href={'/'} className="bg-gray-800 text-white px-6 py-10 rounded-lg">
            푸시 알림
          </Link>
        </div>
      </header>

      {children}
    </>
  );
}
