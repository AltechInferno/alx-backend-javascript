import readDatabase from '../utils';

/**
 * The list of supported majors.
 */
const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(path)
      .then((groupedStudents) => {
        const responseSplits = ['This is the list of our students'];

        // comparison for ordering a list of strings in ascending order
        // order by alphabetic order and case sensitive

        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        for (const [field, group] of Object.entries(groupedStudents).sort(cmpFxn)) {
          responseSplits.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        response.status(200).send(responseSplits.join('\n'));
      })
      .catch((err) => {
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(path)
      .then((groupedStudents) => {
        let resText = '';

        if (Object.keys(groupedStudents).includes(major)) {
          const group = groupedStudents[major];
          resText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }
        response.status(200).send(resText);
      })
      .catch((err) => {
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
