import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constand';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseInToDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaingData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisites } },
        },
      });

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToSet: { preRequisiteCourses: { $eatch: newPreRequisites } },
      });

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFronDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculty: { $each: payload } },
    },
    {
      $upsert: true,
    },
  );

  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );

  return result;
};

export const CourseService = {
  createCourseInToDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseInToDB,
  deleteCourseFronDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
