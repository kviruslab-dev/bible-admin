'use client';

import { Input } from '@/ui/input';
import { useForm } from 'react-hook-form';

export const SignInSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = handleSubmit(submitData => console.log(submitData));

  return (
    <form onSubmit={onSubmit}>
      <Input label="아이디">
        <Input.TextField
          {...{ placeholder: '아이디를 입력해주세요', type: 'text' }}
          inputMode={'text'}
          register={() =>
            register('id', {
              required: '아이디를 입력해주세요.',
            })
          }
        />
      </Input>
      <div className="h-[20px]" />
      <Input label="비밀번호">
        <Input.TextField
          {...{ placeholder: '비밀번호를 입력해주세요.', type: 'password' }}
          inputMode={'text'}
          register={() =>
            register('password', {
              required: '아이디를 입력해주세요.',
            })
          }
        />
      </Input>
      <div className="h-[30px]" />
      <button type="submit" className="bg-main text-white w-full py-10 rounded-lg hover:bg-[#3173f6]">
        로그인
      </button>
    </form>
  );
};
