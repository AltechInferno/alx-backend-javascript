const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<void>} promise that resolves when the operation is complete.
 * @throws {Error} If the database cannot be loaded.
 */
const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const lines = data.trim().split('\n');
    const [dbFieldNames, ...studentRecords] = lines.map(line => line.split(','));

    const studentGroups = studentRecords.reduce((groups, record) => {
      const [field, ...props] = record;
      if (!groups[field]) {
        groups[field] = [];
      }
      groups[field].push(Object.fromEntries(dbFieldNames.slice(0, dbFieldNames.length - 1).map((name, idx) => [name, props[idx]])));
      return groups;
    }, {});

    const totalStudents = Object.values(studentGroups).flat().length;
    console.log(`Number of students: ${totalStudents}`);

    for (const [field, group] of Object.entries(studentGroups)) {
      const studentNames = group.map(student => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
    }

    return true;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;

