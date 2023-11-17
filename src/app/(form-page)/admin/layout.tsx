import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  if (!cookie.get('csrftoken')?.value) {
    return redirect('/signin');
  }

  return <>{children}</>;
}
