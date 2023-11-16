'use client';

import { CheckBox } from '@/components/common/checkbox';
import { Spacing } from '@/components/common/spacing';
import { Input, TextFiled } from '@/components/common/text-input';
import { FormProvider } from '@/lib/provider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Home() {
  const methods = useForm({ mode: 'onSubmit' });

  const onSubmit = methods.handleSubmit(
    async data => {
      const body = JSON.stringify({ name: data.name, phone: String(data.phone) });
      await fetch('https://bible25backend.givemeprice.co.kr/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(res => {
          toast.success('가입신청에 성공하셨습니다', { position: 'top-center' });
          methods.reset();
        })
        .catch(err => toast.error('실패', { position: 'top-center' }));
    },
    (error: any) => {
      if (error.name) {return toast.error(error.name.message, { position: 'top-center' });}
      if (error.phone) {return toast.error(error.name.message, { position: 'top-center' });}
      if (error.agree) {return toast.error(error.name.message, { position: 'top-center' });}
      console.log(error);
    }
  );

  return (
    <main className="px-30">
      {/* 베너 */}
      <img src="https://data.bible25.com/market/etc/large.png" alt="" className="w-full" />
      <Spacing size={50} />
      <section className="text-center">
        <h3 className="max-sm:text-30 text-45 font-bold">가입 신청</h3>
        <Spacing size={5} />
        <div className="max-sm:text-13">
          <p>아래의 양식을 작성해 주시면 담당자가 확인 후</p>
          <p>빠른 시일 내에 연락을 취해 가입을 도와드립니다.</p>
        </div>
      </section>
      <Spacing size={20} />
      <section className="h-5/6 justify-center items-center flex-col text-16 font-medium">
        <FormProvider methods={methods}>
          <form onSubmit={onSubmit}>
            <Input label="신청자명">
              <Input.NameFiled
                {...{
                  placeholder: '신청자명을 입력해주세요.',
                }}
              />
            </Input>
            <Spacing size={20} />
            <Input label="연락처">
              <Input.PhoneFiled
                {...{
                  placeholder: '연락처를 입력해주세요.',
                }}
              />
            </Input>
            <Spacing size={20} />
            <section className="rounded-xl border-2 border-[#efefef] box-content px-20 pt-30 py-20 w-600">
              <div className="font-semibold text-24">가입 신청을 위한 약관 동의</div>
              <Spacing size={10} />
              <div className="overflow-y-scroll w-full h-200 p-15 max-sm:text-13 border-t-2 border-gray-300 bg-gray-50 text-gray-500 whitespace-pre-line">
                <p>
                  ㈜후원쇼핑에서는 귀하께서 요청하신 가입 신청에 대해 아래와 같은 사항을 알리고 동의를 받아 귀하의
                  개인정보를 수집합니다.
                </p>
                {'\n'}
                <p>
                  {` 1. 수집하는 개인정보 항목
                  - 신청자명, 연락처`}
                </p>
                {'\n'}
                <p>
                  {`2. 개인정보의 수집 및 이용목적
                  - 가입 신청에 대한 본인확인, 연락처 확인, 가입 신청에 대한 안내
                  - 요청하신 문의에 대한 답변 및 관련 제반 업무 지원
                  `}
                </p>
                {'\n'}
                <p>
                  {`3. 개인정보의 보유 및 이용기간
                  수집된 개인정보는 최초 온라인 문의 요청 서비스 접수일로부터 보관, 활용하며 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다. 다만, 수집 목적 또는 제공받은 목적이 달성된 경우에도 하기와 같이 상법, 국세기본법 등 관련 법령 규정에 의한 거래 관련 권리 의무 관계의 확인 등을 이유로 일정 기간 보유하여야 할 필요가 있을 경우에는 일정 기간 보유합니다. 이 경우 회사는 보관하는 개인정보를 그 보관의 목적으로만 이용하며 보존 기간은 아래와 같습니다.
                  가. 상법 등 법령의 규정에 의하여 보존할 필요성이 있는 경우
                  - 계약 또는 청약철회 등에 관한 기록 : 5년
                  - 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                  - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년  
                  `}
                </p>
                {'\n'}
                <p>
                  {`4. 동의 거부권에 대한 고지
                  고객님께서 개인정보의 수집·이용에 동의하지 않을 권리가 있으며, 미동의 시 서비스를 이용하실 수 없습니다.
                  `}
                </p>
                {'\n'}
              </div>
              <Spacing size={20} />
              <section className="max-sm:text-13 flex items-center justify-center">
                <p className="pr-10">개인정보 수집·이용 동의</p>
                <div className="flex items-center">
                  <CheckBox type={'radio'} name={'agree'} value={'true'} />
                  <span className="pl-4 pr-7">동의</span>
                  <CheckBox type={'radio'} name={'agree'} value={'false'} />
                  <span className="pl-4 pr-7">비동의</span>
                </div>
              </section>
            </section>
            <Spacing size={20} />
            <button
              type="submit"
              className={`${true ? 'bg-main' : 'bg-gray-400'} w-full rounded-lg text-white font-medium p-10`}
            >
              신청하기
            </button>
          </form>
        </FormProvider>
      </section>
      <Spacing size={20} />
    </main>
  );
}
