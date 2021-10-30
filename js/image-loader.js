export default function loadImage(url) {
  if(url === undefined) return; 

  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', resolve(img));
    img.src = url;
  });
}