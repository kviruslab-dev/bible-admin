'use client';

import { Toaster } from 'react-hot-toast';

interface SnackbarProvider {
  children: React.ReactNode;
}

export function ToastProvider(/* { children }: SnackbarProvider */) {
  return (
    <>
      <Toaster />
    </>
  );
}
