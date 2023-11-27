import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User allready exists!');
  }

  const result = await Student.create(studentData);

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User allready exists!');
  // }

  // const result = await student.save(); // built in instance methode
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deletedStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
};
