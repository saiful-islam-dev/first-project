import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);

  const student = new Student(studentData);
  const result = await student.save(); // built in instance methode
  return result;
};

const gellAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const gellSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  gellAllStudentFromDB,
  gellSingleStudentFromDB,
};
