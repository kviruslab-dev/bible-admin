import { ToastProvider } from '@/lib/provider';
import ProgressBar from '@/lib/provider/progress-bar';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바이블 25 | 어드민',
  description: 'Generated by create next app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '../../public/favicon.ico',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:image" content={'/oglogo.jpeg'} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:title" content="바이블 25" />
        <meta property="og:description" content="바이블 25 관리자 페이지입니다." />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </head>
      <body className="scrollbar-hide">
        <ToastProvider />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
