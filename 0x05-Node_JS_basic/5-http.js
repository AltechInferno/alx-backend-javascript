const http = require('http');
const fs = require('fs')

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = async (dataPath) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
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
    return [
      `Number of students: ${totalStudents}`,
      ...Object.entries(studentGroups).map(([field, group]) => 
        `Number of students in ${field}: ${group.length}. List: ${group.map(student => student.firstname).join(', ')}`
      )
    ].join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const responseText = 'Hello Holberton School!\n';
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': responseText.length });
    res.end(responseText);
  } else if (req.url === '/students') {
    try {
      const report = await countStudents(DB_FILE);
      const responseText = `This is the list of our students\n${report}`;
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': responseText.length });
      res.end(responseText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error.toString();
      const responseText = `This is the list of our students\n${errorMessage}`;
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': responseText.length });
      res.end(responseText);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = app;
 
