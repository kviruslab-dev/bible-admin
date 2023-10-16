'use client';

import { useLayoutEffect } from 'react';
import NProgress from 'nprogress';

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function ProgressBar() {
  useLayoutEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href]');

      anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return <></>;
}

// function StyledProgressBar() {
//   return (

//   )
// }

// styles={{
//   '#nprogress': {
//     pointerEvents: 'none',
//     '.bar': {
//       top: 0,
//       left: 0,
//       height: 3,
//       zIndex: 9999,
//       width: '100%',
//       position: 'fixed',
//       backgroundColor: theme.palette.primary.main,
//       boxShadow: `0 0 2px ${theme.palette.primary.main}`,
//     },
//     '.peg': {
//       right: 0,
//       opacity: 1,
//       width: 100,
//       height: '100%',
//       display: 'block',
//       position: 'absolute',
//       transform: 'rotate(3deg) translate(0px, -4px)',
//       boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
//     },
//   },
