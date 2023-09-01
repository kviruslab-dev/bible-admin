'use client';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export function FormProvider({ children, methods }: Props) {
  return <Form {...methods}>{children}</Form>;
}
