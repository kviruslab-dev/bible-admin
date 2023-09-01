'use client';
import { FormProvider } from '@/lib/provider';
import { Input, TextFiled } from './common/text-input';
import { useForm } from 'react-hook-form';
import { Spacing } from './common/spacing';

export function Main() {
  const methods = useForm({ mode: 'onSubmit' });

  const onSubmit = methods.handleSubmit(data => {
    try {
      fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/fcmpush/all', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      throw new Error('error');
    } catch (err) {
      console.log('error');
    }
  });

  return (
    <main className="px-30">
      <Spacing size={100} />
      <section className="h-5/6 justify-center items-center flex-col text-16">
        <FormProvider methods={methods}>
          <form onSubmit={onSubmit}>
            <Input label="제목을 입력해주세요">
              <TextFiled
                {...{
                  className: 'w-full bg-gray-100 px-10 py-10 focus:bg-gray-200',
                  placeholder: '제목을 입력해주세요',
                }}
              />
            </Input>
            <Spacing size={20} />
            <Input label="본문 내용을 입력해주세요.">
              <Input.AccessFiled
                {...{
                  className: 'w-full h-150 bg-gray-100 px-10 py-10 focus:bg-gray-200',
                  placeholder: '본문 내용을 입력해주세요.',
                }}
              />
            </Input>
            <Spacing size={20} />
            <button
              type="submit"
              className={`${true ? 'bg-main' : 'bg-gray-400'} w-full rounded-lg text-white font-medium p-8`}
            >
              푸시 전송
            </button>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
