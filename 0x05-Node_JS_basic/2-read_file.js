const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} path to the CSV data file
 */

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n');

    // Filter out empty lines
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    if (nonEmptyLines.length === 0) {
      throw new Error('Cannot load the database');
    }

    const students = nonEmptyLines.map(line => line.split(','));

    const studentCount = students.length;
    console.log(`Number of students: ${studentCount}`);

    const fields = {};
    students.forEach(student => {
      const field = student[3];
      const name = student[0];

      if (fields[field] === undefined) {
        fields[field] = {
          count: 0,
          names: []
        };
      }

      fields[field].count++;
      fields[field].names.push(name);
    });

    for (const field in fields) {
      const count = fields[field].count;
      const names = fields[field].names.join(', ');
      console.log(`Number of students in ${field}: ${count}. List: ${names}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
