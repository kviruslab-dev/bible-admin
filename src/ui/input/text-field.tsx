'use client';

import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputMode = 'search' | 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | undefined;
type RegisterType = 'senderName' | 'senderPhone' | 'senderContent' | 'phone' | 'comment' | 'id' | 'password'; // ! 필드 타입
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  register: () => UseFormRegisterReturn<RegisterType>;
  inputMode?: InputMode;
  // error?: boolean;
}

// ! nomal type
export function TextField({ inputMode = 'text', register, ...props }: TextFieldProps) {
  return <input className="accessInput" inputMode={inputMode} {...register()} {...props} />;
}

interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  register: () => UseFormRegisterReturn<RegisterType>;
  inputMode?: InputMode;
  // error?: boolean;
}

// ! textarea type
export function TextArea({ inputMode = 'text', register, ...props }: TextAreaProps) {
  return <textarea className="accessInput" inputMode={inputMode} {...register()} {...props} />;
}
