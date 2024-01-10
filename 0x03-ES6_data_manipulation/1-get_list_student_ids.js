export default function getListStudentIds(arr) {
  let emptyArr = [];
  if (arr instanceof Array) {
    emptyArr = arr.map((item) => item.id);
  }

  return emptyArr;
}
