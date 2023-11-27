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
    } else if (req.method === 'POST') {
      const { id, pwd }: { id: string; pwd: string } = await req.json(); // body data
      const data: Array<{ [key: string]: string }> = readFile(buildPath());

      if (!data.some(i => i.id === id && i.pwd === pwd)) {
        throw Error;
      }

      response.cookies.set({
        name: 'csrftoken',
        value: JSON.stringify({ id }),
        httpOnly: true,
        expires: new Date().setDate(new Date().getDate() + 1),
        path: '/',
        secure: true,
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
