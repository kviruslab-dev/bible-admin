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
Input.AccessFiled = AccessFiled;
Input.TextFiled = TextFiled;
