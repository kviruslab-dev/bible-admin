// export const convertDataUrlToFile = (name: string) => {
//   const dataURL = canvasRef.current.toDataURL('image/png');
//   const decodedURL = dataURL.replace(/^data:image\/\w+;base64,/, '');
//   const buf = Buffer.from(decodedURL, 'base64');
//   const imageBlob = new Blob([buf], { type: 'image/png' });
//   return new File([imageBlob], encodeURI(name + '.png'), { type: 'image/png' });
// };
