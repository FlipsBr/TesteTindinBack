export default function checkIfDate(date) {
    console.log(date);
    return date && Object.prototype.toString.call(date) === "[object Date]";
}
