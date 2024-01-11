interface Student {
  firstname: string;
  lastname: string;
  age: number;
  location: string;
}

function createStudent(student: Student) {
  return {
    firstname: student.firstname,
    lastname: student.lastname,
    age: student.age,
    location: student.location,
  };
}

const studentsList = [
  createStudent({ firstname: 'John', lastname: 'Charles', age: 12, location: 'Nairobi' }),
  createStudent({ firstname: 'Donald', lastname: 'Charles', age: 32, location: 'USA' }),
];

const table = document.createElement('table');

studentsList.forEach((student) => {
  const row = document.createElement('tr');

  for (const key in student) {
    if (Object.prototype.hasOwnProperty.call(student, key)) {
      const cell = document.createElement('td');
      cell.innerHTML = student[key];
      row.appendChild(cell);
    }
  }

  table.appendChild(row);
});

document.body.appendChild(table);

