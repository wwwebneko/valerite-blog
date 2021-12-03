export function timeStampToDate(timeStamp) {
  const date = new Date(timeStamp);
  return `${date.toDateString()} - ${date.toLocaleTimeString('UA')}`;
}