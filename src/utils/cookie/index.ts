export function setCookie(name: string, value: string, options: any = {}) {
  options = {
    path: '/',
    ...options,
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updateCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  for (const optionKey in options) {
    updateCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updateCookie += '=' + optionValue;
    }
  }
  // console.log(updateCookie, 'cookie')
  document.cookie = updateCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    expires: new Date().toUTCString(),
  });
}

export const allDelCookies = (domain: string, path: string) => {
  // const doc = document;
  domain = domain || document.domain;
  path = path || '/';

  const cookies = document.cookie.split('; '); // 배열로 반환
  console.log(cookies);
  const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

  // 반목문 순회하면서 쿠키 전체 삭제
  if (!document.cookie) {
    alert('삭제할 쿠키가 없습니다.');
  } else {
    for (let i = 0; i < cookies.length; i++) {
      // const uname = cookies[i].split('=')[0];
      // document.cookie = `${uname}=; expires=${expiration}`;
      document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
      // document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain =' + domain;
    }
    alert('쿠키 전부 삭제완료!!');
  }
};
