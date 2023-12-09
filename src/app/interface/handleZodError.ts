import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "./error";

const handleZodError = (err: ZodError) => {
  const errorSourcess: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation Error',
    errorSourcess,
  };
};

export default handleZodError;
