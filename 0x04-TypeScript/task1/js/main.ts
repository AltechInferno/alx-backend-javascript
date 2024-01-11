interface User {
  firstName: string;
  lastName: string;
}

class TeacherClass implements User {
  constructor(public firstName: string, public lastName: string) {}

  prepareStudentTest(): string {
    console.log("Currently in class");
    return "Currently in class";
  }

  displayName(): string {
    console.log(this.firstName);
    return this.firstName;
  }
}

