
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// --- 1. عملية التسجيل (Register) ---
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // الموديل سيقوم بتشفير الباسوورد تلقائياً بفضل الـ pre-save hook الذي كتبناه
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Registration Successful!",
      userId: user._id
    });
  } catch (err) {
    // التعامل مع خطأ تكرار الإيميل
    if (err.code === 11000) {
      return res.status(400).json({ error: "هذا البريد الإلكتروني مسجل مسبقاً" });
    }
    // ⭐️ التعديل هنا: إرسال الخطأ كـ JSON للمتصفح بدلاً من HTML
    res.status(500).json({ error: err.message });
  }
};

// --- 2. عملية تسجيل الدخول (Login) ---
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم وتضمين الباسوورد (لأننا أخفيناه في الموديل بـ select: false)
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Wrong email or password!" });
    }

    // إنشاء "مفتاح الأمان" (JWT Token)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // صالح لمدة 7 أيام
    );

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    // ⭐️ التعديل هنا أيضاً
    res.status(500).json({ error: err.message });
  }
};