export default function createIteratorObject(report) {
  const result = [];
  for (const i of Object.values(report.allEmployees)) {
    result.push(...i);
  }
  return result;
}
