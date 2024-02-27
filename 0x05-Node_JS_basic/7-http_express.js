const express = require('express');
const fs = require('fs');
/**
 * Counts the students in a CSV data file.
 * @param {String} path to the CSV data file.
 */
const app = express();


const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
const PORT = 1245;



const countStudents = (path) => new Promise((resolve, reject) => {

  if (path) {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportArray = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const groupedStudents = {};
        const dbFieldNames = fileLines[0].split(',');
        const stdPropNames = dbFieldNames.slice(
          0,
          dbFieldNames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(groupedStudents).includes(field)) {
            groupedStudents[field] = [];
          }
          const studentEntries = stdPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          groupedStudents[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(groupedStudents).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportArray.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(groupedStudents)) {
          reportArray.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportArray.join('\n'));
      }
    });
  }else {
    reject(new Error('Cannot load the database'));
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const responseSplits = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseSplits.push(report);
      const resText = responseSplits.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resText.length);
      res.status = 200;
      res.write(Buffer.from(resText));
    })
    .catch((err) => {
      responseSplits.push(err instanceof Error ? err.message : err.toString());
      const resText = responseSplits.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resText.length);
      res.status = 200;
      res.write(Buffer.from(resText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
