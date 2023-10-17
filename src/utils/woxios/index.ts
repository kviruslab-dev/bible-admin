import { woxios } from 'woxios';

export const instance = woxios.create({
  baseUrl: process.env.SERVER_URL ?? process.env.NEXT_PUBLIC_SERVER_URL!,
});

instance.interceptors.request.use(
  config => {},
  error => {}
);
instance.interceptors.response.use(
  config => {},
  error => {
    console.log(error);
  }
);
