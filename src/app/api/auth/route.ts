import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  console.log('진입 했음');

  try {
    if (req.method !== 'POST') {
      throw Error;
    }
    console.log('POST 성공');
    const { id, pwd }: { id: string; pwd: string } = await req.json(); // body data
    const response = NextResponse.json({ code: 200, message: 'success' });
    const data: Array<{ [key: string]: string }> = readFile(buildPath());
    console.log('파일 리드 성공');
    if (!data.some(i => i.id === id && i.pwd === pwd)) {
      throw Error;
    }
    console.log('아이디 비번 찾기 성공');
    response.cookies.set({
      name: 'csrftoken',
      value: JSON.stringify(decodeURI(id + pwd)),
      httpOnly: true,
      expires: new Date().setDate(new Date().getDate() + 1),
      secure: true,
      // sameSite: 'none',
    });
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
