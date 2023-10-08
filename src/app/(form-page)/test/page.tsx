import { use } from 'react';

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  console.log(response.json());
  // let blob = new Blob([new ArrayBuffer(response)], { type: "image/png" });

  // const new_url = URL.createObjectURL(data);
  // return new_url;
};

export default function App() {
  const data = use(fetch('https://bible25backend.givemeprice.co.kr/api/v1/market/webmain').then(res => res.json()));
  const url = 'http://ch2ho.bible25.com/data/editor/2309/8b7f5b448b25da7d7e58d23df58e4412_1694968677_0443.jpg'
    .replace('http:', 'https:')
    .replace('.com', '.co.kr');

  return (
    <div>
      <h1>hello world</h1>
      <h1>hello world</h1>
      <img src={url} alt="" />
    </div>
  );
}
