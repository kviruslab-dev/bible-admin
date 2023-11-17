import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  if (!cookie.get('csrftoken')?.value) {
    return redirect('/signin');
  }

  return <>{children}</>;
}

// const headersList = headers();r
// const url = new URL(headersList.get('referer') as string).searchParams.get('type');
