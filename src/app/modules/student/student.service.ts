import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const gellAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const gellSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  gellAllStudentFromDB,
  gellSingleStudentFromDB,
};
