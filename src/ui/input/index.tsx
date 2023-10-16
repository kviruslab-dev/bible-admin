'use client';

import { Children, HTMLAttributes, ReactElement, cloneElement, useId } from 'react';
import { TextField } from './text-field';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactElement;
  bottomText?: string;
}

export function Input({ label, children, bottomText, ...props }: InputProps) {
  const child = Children.only(children);
  const generatedId = useId();
  // const isError: boolean = child.props.error ?? false;

  return (
    <div style={{ width: '100%' }} {...props}>
      <label htmlFor={generatedId} className="block py-[5px] text-xl font-semibold text-gray-600">
        {label}
      </label>
      {cloneElement(child, { id: generatedId, ...child.props })}
    </div>
    // ! error 메세지가 있을시
  );
}

Input.TextField = TextField;
// Input.TextArea = forwardRef(TextArea);
