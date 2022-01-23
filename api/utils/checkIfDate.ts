export default function checkIfDate(date: any): boolean {
  console.log(date);
  return date && Object.prototype.toString.call(date) === "[object Date]";
}
