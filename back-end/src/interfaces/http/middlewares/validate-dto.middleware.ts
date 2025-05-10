import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassConstructor } from "class-transformer/types/interfaces";

function validateDto<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "Request body is required",
      });
      return;
    }
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    });

    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
      return;
    }

    req.body = dtoObject;
    next();
  };
}

interface FormattedError {
  property: string;
  message: string;
}

function formatValidationErrors(errors: ValidationError[]): FormattedError[] {
  let formattedErrors: FormattedError[] = [];

  for (const error of errors) {
    if (error.constraints) {
      const messages = Object.values(error.constraints);
      formattedErrors.push({
        property: error.property,
        message: messages[0] || "Invalid value",
      });
    }

    if (error.children && error.children.length > 0) {
      const nestedErrors = formatValidationErrors(error.children);
      nestedErrors.forEach((nestedError) => {
        formattedErrors.push({
          property: `${error.property}.${nestedError.property}`,
          message: nestedError.message,
        });
      });
    }
  }

  return formattedErrors;
}

export default validateDto;
