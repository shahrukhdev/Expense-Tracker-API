import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      }));

      return res.status(422).json({
        success: false,
        message: 'Invalid request data',
        errors,
      });
    }

    req.body = result.data;
    next();
  };

export default validate;