import { Router } from 'express';
import upload from '../middleware/upload.js';
import { submissionValidationRules, validate } from '../middleware/validator.js';
import { createSubmission, getAllSubmissions, getSubmissionById } from '../controllers/submissionController.js';

const router = Router();

// POST / - Create new submission (upload image first, then validate)
router.post('/', upload.single('image'), submissionValidationRules, validate, createSubmission);

// GET / - Get all submissions
router.get('/', getAllSubmissions);

// GET /:id - Get submission by ID
router.get('/:id', getSubmissionById);

export default router;
