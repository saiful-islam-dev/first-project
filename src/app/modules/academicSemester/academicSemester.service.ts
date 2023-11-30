import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterNameCodeMapper } from './academicSenester.constant';

const createAcademicSemesterIntoDB = async (paylod: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[paylod.name] !== paylod.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = AcademicSemester.create(paylod);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
};
