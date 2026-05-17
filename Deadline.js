
const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['Assignment', 'Exam'] // تحديد النوع كما هو في واجهتك
  },
  course: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  // ربط المهمة بالطالب الذي أضافها
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Deadline', deadlineSchema);