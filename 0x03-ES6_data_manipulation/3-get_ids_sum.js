export default function getStudentIdsSum(students) {
  return students.reduce((arg, student) => arg + student.id, 0);
}
