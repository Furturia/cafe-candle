import Submission from '../models/Submission.js';
import { convertToFullYear, calculateYearsSinceGraduation } from '../utils/graduationCalculator.js';
import { generateHeartwarmingMessage } from '../utils/messageGenerator.js';

/**
 * Create a new submission
 */
export const createSubmission = async (req, res) => {
  try {
    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'กรุณาอัพโหลดรูปภาพ' });
    }

    const { firstName, lastName, graduationYear, major, description } = req.body;

    const gradYear = parseInt(graduationYear, 10);
    if (isNaN(gradYear) || gradYear < 40 || gradYear > 99) {
      return res.status(400).json({ message: 'รหัสรุ่นต้องเป็นตัวเลข 2 หลัก ระหว่าง 40-99' });
    }

    const validMajors = ['IT', 'CS', 'DSI'];
    if (!major || !validMajors.includes(major)) {
      return res.status(400).json({ message: 'กรุณาเลือกสาขา (IT, CS, DSI)' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const submission = await Submission.create({
      firstName,
      lastName,
      graduationYear: gradYear,
      major,
      description: description || null,
      imageFilename: req.file.filename,
      imageUrl
    });

    // Calculate extra fields for response
    const fullYears = convertToFullYear(gradYear);
    const yearsSinceGraduation = calculateYearsSinceGraduation(gradYear);
    const heartwarmingMessage = generateHeartwarmingMessage(yearsSinceGraduation);

    res.status(201).json({
      message: 'ส่งข้อมูลสำเร็จ!',
      id: submission.id,
      data: {
        ...submission.toJSON(),
        fullYears,
        yearsSinceGraduation,
        heartwarmingMessage
      }
    });
  } catch (error) {
    console.error('Error creating submission:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'ข้อมูลไม่ถูกต้อง',
        errors: error.errors.map(e => ({ msg: e.message, path: e.path }))
      });
    }

    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการส่งข้อมูล' });
  }
};

/**
 * Get all submissions with pagination
 */
export const getAllSubmissions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const submissions = await Submission.findAll({
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    // Enhance each submission with calculated fields
    const enhanced = submissions.map(sub => {
      const data = sub.toJSON();
      const yearsSinceGraduation = calculateYearsSinceGraduation(data.graduationYear);
      return {
        ...data,
        fullYears: convertToFullYear(data.graduationYear),
        yearsSinceGraduation,
        heartwarmingMessage: generateHeartwarmingMessage(yearsSinceGraduation)
      };
    });

    res.json(enhanced);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

/**
 * Get a single submission by ID
 */
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id);

    if (!submission) {
      return res.status(404).json({ message: 'ไม่พบข้อมูล' });
    }

    const data = submission.toJSON();
    const yearsSinceGraduation = calculateYearsSinceGraduation(data.graduationYear);

    res.json({
      ...data,
      fullYears: convertToFullYear(data.graduationYear),
      yearsSinceGraduation,
      heartwarmingMessage: generateHeartwarmingMessage(yearsSinceGraduation)
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};
