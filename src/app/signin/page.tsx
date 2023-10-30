import { SignInSection } from '@/components/signin-section';
import { cookies } from 'next/headers';

export default function SigninPage() {
  // create()
  // const cookie = cookies();
  // if (cookie.has('csrftoken')) {
  //   console.log('진입 :::');
  //   fetch('http://localhost:3000/api/signout', { method: 'GET' });
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 scrollbar-hide bg-gray-200">
      <section className="min-w-[650px] bg-white p-[40px] rounded-3xl">
        <h1 className="text-3xl font-semibold text-gray-600">로그인</h1>
        <div className="h-[50px]" />
        <SignInSection />
      </section>
    </main>
  );
}

// async function create() {
//   'use server'
//   cookies().delete('csrftoken')
// }
