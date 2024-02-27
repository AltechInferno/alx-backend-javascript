const http = require('http');
const fs = require('fs');
/**
 * Counts the students in a CSV data file.
 * @param {String} path to the CSV data file
 */
const HOST = 'localhost';
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
const app = http.createServer();

const countStudents = (path) => new Promise((resolve, reject) => {

  if (path) {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const outputSlice = [];
        const lines = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const dbFieldNames = lines[0].split(',');
        const studentNames = dbFieldNames.slice(
          0,
          dbFieldNames.length - 1,
        );

        for (const line of lines.slice(1)) {
          const studentRecord = line.split(',');
          const studentValues = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const studentEntries = studentNames.map((propName, idx) => [
            propName,
            studentValues[idx],
          ]);
          groups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(groups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        outputSlice.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(groups)) {
          outputSlice.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(outputSlice.join('\n'));
      }
    });
  }else {
    reject(new Error('Cannot load the database'));
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const resText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resText.length);
      res.status = 200;
      res.write(Buffer.from(resText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const resText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', resText.length);
          res.status = 200;
          res.write(Buffer.from(resText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const resText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', resText.length);
          res.status = 200;
          res.write(Buffer.from(resText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
