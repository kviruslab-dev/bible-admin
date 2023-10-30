import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';

// ! 로그아웃 안됨

// export const deleteCookie = (
//   request: NextRequest,
//   response: NextResponse,
//   cookie: string
// ) => {
//   const { value, options } = request.cookies.getWithOptions(cookie);
//   if (value) {
//     response.cookies.set(cookie, value, options);
//     response.cookies.delete(cookie);
//   }
// };

export async function GET(req: NextApiRequest, res: NextResponse) {
  console.log('진입 :::');
  try {
    if (req.method !== 'GET') {
      throw Error;
    }
    const response = NextResponse.json({ code: 200, message: 'success' });
    // const cookieStore = cookies();
    const token = response.cookies.get('csrftoken')?.value;
    console.log(token, '들어있나?');

    return new Response('Cookie deleted', { status: 200 });
  } catch (err) {
    return NextResponse.json({ code: 400, message: 'fail' });
  }
}
