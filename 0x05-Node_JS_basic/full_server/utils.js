import fs from 'fs';

/**
 * Reads the data of students in a CSV data file.
 * @param {String} path to the CSV data file.
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>}
 */
const readDatabase = (path) => new Promise((resolve, reject) => {

  if (path) {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const fileSplits = data
          .toString('utf-8')
          .trim()
          .split('\n');
        const groupedStudents = {};
        const dbFieldNames = fileSplits[0].split(',');
        const studentPropNames = dbFieldNames
          .slice(0, dbFieldNames.length - 1);

        for (const line of fileSplits.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord
            .slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(groupedStudents).includes(field)) {
            groupedStudents[field] = [];
          }
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);
          groupedStudents[field].push(Object.fromEntries(studentEntries));
        }
        resolve(groupedStudents);
      }
    });
  }else {
    reject(new Error('Cannot load the database'));
  }
});

module.exports = readDatabase;
