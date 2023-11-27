// import { cookies } from "next/headers";

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// ! cookie로 로그인 data 전달을 위한 api입니다.
export async function POST(req: Request) {
  try {
    const response = NextResponse.json({ code: 200, message: '로그아웃 되었습니다.' });
    console.log(cookies().get('csrftoken')?.value);
    if (!cookies().get('csrftoken')?.value) {
      throw Error;
    }
    console.log('토큰 있음');
    response.cookies.delete('csrftoken');
    return response;
  } catch (err) {
    const response = NextResponse.json({ code: 400, message: '로그아웃에 실패하였습니다.' });
    return response;
  }
}
