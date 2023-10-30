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
  document.cookie = updateCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
