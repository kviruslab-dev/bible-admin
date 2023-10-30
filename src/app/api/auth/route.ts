import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  const response = NextResponse.json({ code: 200, message: 'success' });

  try {
    if (req.method === 'GET') {
      const response = NextResponse.next({
        headers: {
          cookie: req.headers.get('csrftoken')!,
        },
      });
      response.cookies.delete('csrftoken');
      console.log('GET 성공');
    } else if (req.method === 'POST') {
      console.log('POST 진입');
      const { id, pwd }: { id: string; pwd: string } = await req.json(); // body data
      const data: Array<{ [key: string]: string }> = readFile(buildPath());
      console.log('파일 리드 성공');
      if (!data.some(i => i.id === id && i.pwd === pwd)) {
        throw Error;
      }
      console.log('아이디 비번 매칭 성공');
      response.cookies.set({
        name: 'csrftoken',
        value: JSON.stringify({ id, pwd }),
        // httpOnly: true,
        expires: new Date().setDate(new Date().getDate() + 1),
        path: '/',
        // secure: true,
        // sameSite: 'none',
      });
    } else {
      throw Error;
    }
    return response;
  } catch (err) {
    return NextResponse.json({ code: 400, message: 'fail' });
  }
}

function buildPath() {
  return path.join(process.cwd(), 'data', 'permission.json');
}

function readFile(filePath: string) {
  const fileData: any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
