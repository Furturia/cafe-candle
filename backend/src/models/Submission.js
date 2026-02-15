import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'last_name'
  },
  graduationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'graduation_year',
    validate: {
      min: 40,
      max: 99
    },
    comment: '2-digit graduation year (e.g., 66 for class of 2566/2023)'
  },
  major: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'major',
    validate: {
      isIn: [['IT', 'CS', 'DSI']]
    },
    comment: 'Department abbreviation: IT, CS, DSI'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageFilename: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_filename'
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'image_url'
  }
}, {
  tableName: 'submissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Submission;
