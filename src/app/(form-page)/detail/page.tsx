import { Spacing } from '@/components/common/spacing';
import { FormContainer } from '../member-ship/_container';

//! test
export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="frameWrapper">
        <div className="px-30">
          <Spacing size={20} />
          <FormContainer />
          <Spacing size={20} />
        </div>
      </main>
    </div>
  );
}
