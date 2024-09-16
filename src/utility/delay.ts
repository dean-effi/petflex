export default function delay(data: any, duration: number) {
  return new Promise(resolve => {
    console.log("promisinggg");
    setTimeout(() => {
      resolve(data);
      return "";
    }, duration);
  });
}
