import { Request, Response } from 'express';
import { StudentService } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi

    const userNameSchemaJoi = Joi.object({
      firstName: Joi.string()
        .trim()
        .required()
        .max(20)
        .regex(/^[A-Z][a-z]*$/, { name: 'capitalize', invert: true })
        .message('{#label} must be in capitalize format'),
      middleName: Joi.string().trim(),
      lastName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Za-z]+$/)
        .message('{#label} must contain only alphabetic characters'),
    });

    const guardianSchemaJoi = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    });

    const localGuardianSchemaJoi = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
      address: Joi.string().required(),
    });

    // Define the main Joi schema
    const studentSchemaJoi = Joi.object({
      id: Joi.string().required(),
      name: userNameSchemaJoi.required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      dateOfBirth: Joi.string().required(),
      email: Joi.string().required().email(),
      contactNo: Joi.string().required(),
      emergencyContactNo: Joi.string().required(),
      bloogGroup: Joi.string().valid(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
      ),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      guardian: guardianSchemaJoi.required(),
      localGuardian: localGuardianSchemaJoi.required(),
      profileImg: Joi.string(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
    });

    const { student: studentData } = req.body;

    const { error, value } = studentSchemaJoi.validate(studentData);

    if (error) {
      res.status(200).json({
        success: false,
        message: 'Something went worng!',
        error,
      });
    }

    const result = await StudentService.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.gellAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.gellSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
