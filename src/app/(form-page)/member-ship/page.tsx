import { Spacing } from '@/components/common/spacing';
import { FormContainer, TabMenu } from './_container';

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="frameWrapper">
        <div className="px-30">
          {/* 베너 */}
          <img src="https://data.bible25.com/market/etc/internet_001.jpeg" alt="" className="w-full" />
          <Spacing size={50} />
          <FormContainer />
          <Spacing size={50} />
          <p className="text-[22px] text-[#414141] font-semibold">인터넷 통신사를 선택해주세요.</p>
          <Spacing size={20} />
          <div>
            <TabMenu />
          </div>
          <img src="https://data.bible25.com/market/etc/internet_005.jpeg" alt="" className="w-full" />
          <FormContainer />
          <Spacing size={20} />
        </div>
      </main>
    </div>
  );
}
