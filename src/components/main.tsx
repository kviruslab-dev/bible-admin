'use client';
import { FormProvider } from '@/lib/provider';
import { Input, TextFiled } from './common/text-input';
import { useForm } from 'react-hook-form';
import { Spacing } from './common/spacing';
import { toast } from 'react-hot-toast';
// import { useFormStatus } from 'react-dom';
import Link from 'next/link';

interface MainProps {
  children: React.ReactNode;
}

export function Main() {
  const methods = useForm({ mode: 'onSubmit' });
  // const { pending } = useFormStatus();
  // console.log(pending)

  const onSubmit = methods.handleSubmit(
    data => {
      try {
        toast.promise(
          fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/device/fcmpush/all', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }),
          {
            loading: '잠시만 기다려주세요',
            success: <span>푸시 알림을 전송했어요!</span>,
            error: <span>푸시 알림 전송에 실패했어요!</span>,
          }
        );

        throw new Error('error');
      } catch (err) {
        console.log('error');
      }
    },
    () => {
      toast.error('제목과 내용은 5글자 이상 작성해주세요.', {
        style: { backgroundColor: '#ff0000', color: '#ffffff' },
      });
    }
  );

  return (
    <main className="min-h-screen bg-gray-200 px-15">
      <Spacing size={100} />
      <section className="flex justify-center">
        <div className="h-5/6 max-w-[800px] justify-center items-center flex-col text-16 font-medium py-40 px-30 rounded-2xl bg-white">
          <h1 className="text-28 text-gray-700 font-semibold">알림 메시지 보내기</h1>
          <Spacing size={30} />
          <FormProvider methods={methods}>
            <form onSubmit={onSubmit}>
              <Input label="제목 입력">
                <TextFiled
                  {...{
                    className:
                      'w-full bg-gray-100 px-10 py-10 focus:bg-gray-200 transition-colors transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
                    placeholder: '제목을 입력해주세요.',
                  }}
                />
              </Input>
              <Spacing size={20} />
              <Input label="본문 내용 입력">
                <Input.AccessFiled
                  {...{
                    className:
                      'w-full h-150 bg-gray-100 px-10 py-10 focus:bg-gray-200 transition-colors transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
                    placeholder: '본문 내용을 입력해주세요.',
                  }}
                />
              </Input>
              <Spacing size={20} />
              <button
                type="submit"
                // disabled={pending}
                className={`${
                  true ? 'bg-main hover:bg-blue-600' : 'bg-gray-400'
                } w-full rounded-lg text-white font-medium p-8`}
              >
                {/* {pending ? '처리중 입니다' : '푸시 전송'} */}
                푸시 전송
              </button>
              <Spacing size={5} />
              <Link
                href={'/ads'}
                prefetch
                className="block text-center rounded-lg text-main font-medium p-8 bg-blue-100 hover:bg-gray-300 hover:text-gray-500"
              >
                뒤로가기
              </Link>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
