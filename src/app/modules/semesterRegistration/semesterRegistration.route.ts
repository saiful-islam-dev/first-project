import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

// router.get('/');

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationSchemaValidation,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemestecrRegistrations);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updatSemesterRegistrationSchemaValidation,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

// router.get('/:id');

// router.delete('/:id');

// router.get('/');

export const semesterRegistrationRoutes = router;
