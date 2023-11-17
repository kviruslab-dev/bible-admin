import { cookies } from 'next/headers';
import HeaderLayout from './_container';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  if (cookie.get('csrftoken')?.value?.includes('kviruslab')) {
    return redirect('/admin');
  }
  if (!cookie.get('csrftoken')?.value?.includes('pcw')) {
    return redirect('/signin');
  }

  return (
    <>
      <HeaderLayout />
      {children}
    </>
  );
}

// const headersList = headers();r
// const url = new URL(headersList.get('referer') as string).searchParams.get('type');
