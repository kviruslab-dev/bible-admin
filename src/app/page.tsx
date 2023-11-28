import { Main } from '@/components/main';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookie = cookies();
  if (!cookie.has('csrftoken') || !cookie.get('csrftoken')?.value?.includes('bible')) {
    return redirect('/signin');
  }

  return <Main />;
}
