'use client';
import { Children, HTMLAttributes, ReactElement, cloneElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactElement;
  bottomText?: string;
}

export function Input({ label, children, bottomText, ...props }: InputProps) {
  const child = Children.only(children);
  // const isError: boolean = child.props.error ?? false;

  return (
    <div style={{ width: '100%' }} {...props}>
      <label
        // htmlFor={id}
        className="inline-block py-[5px] text-base font-semibold text-gray-600"
      >
        {label}
      </label>
      {cloneElement(child, { ...child.props })}
    </div>
  );
}

// interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
//   error?: boolean;
// }
export const TextFiled = ({ ...props }) => {
  const { control, setValue, register } = useFormContext();

  return (
    <input
      type="text"
      className="accessInput"
      inputMode="text"
      {...register('title', {
        required: '제목을 입력해주세요.',
        minLength: 5,
      })}
      {...props}
    />
  );
};

const AccessFiled = ({ secret, ...props }: any) => {
  const { register } = useFormContext();

  return (
    <textarea
      type="text"
      className="accessInput"
      {...register('content', {
        required: '인증번호를 입력해주세요',
        // validate: value => value === secret,
      })}
      {...props}
    />
  );
};
const PhoneFiled = ({ secret, ...props }: any) => {
  const { register } = useFormContext();
  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  return (
    <input
      type="number"
      className="accessInput"
      inputMode="numeric"
      {...register('phone', {
        required: '휴대폰 번호를 입력해주세요',
        pattern: {
          value: regPhone,
          message: '번호를 확인해주세요.',
        },
      })}
      {...props}
    />
  );
};
const NameFiled = ({ secret, ...props }: any) => {
  const { register } = useFormContext();

  return (
    <input
      type="text"
      className="accessInput"
      {...register('name', {
        required: '이름을 입력해주세요',
        minLength: 2,
        // validate: value => value === secret,
      })}
      {...props}
    />
  );
};

Input.AccessFiled = AccessFiled;
Input.TextFiled = TextFiled;
Input.PhoneFiled = PhoneFiled;
Input.NameFiled = NameFiled;
