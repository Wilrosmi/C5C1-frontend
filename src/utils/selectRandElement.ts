export default function selectRandElement<T>(arr: Array<T>): T {
  const randPos = Math.floor(Math.random() * arr.length);
  return arr[randPos];
}
