import { body, validationResult } from 'express-validator';

export const submissionValidationRules = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('กรุณากรอกชื่อ')
    .isLength({ min: 2 }).withMessage('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('กรุณากรอกนามสกุล')
    .isLength({ min: 2 }).withMessage('นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),

  body('graduationYear')
    .isInt({ min: 40, max: 99 })
    .withMessage('รหัสรุ่นต้องเป็นตัวเลข 2 หลัก ระหว่าง 40-99 (เช่น 66)'),

  body('major')
    .trim()
    .notEmpty().withMessage('กรุณาเลือกสาขา')
    .isIn(['IT', 'CS', 'DSI']).withMessage('สาขาต้องเป็น IT, CS หรือ DSI'),

  body('description')
    .optional({ values: 'falsy' })
    .isLength({ max: 500 }).withMessage('คำบรรยายต้องไม่เกิน 500 ตัวอักษร')
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors.array()
    });
  }
  next();
};
