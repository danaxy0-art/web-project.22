
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // 1. قراءة الـ Token من ترويسة الطلب
  const authHeader = req.headers.authorization;

  // 2. التحقق من وجود الـ Token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'غير مصرح لك بالدخول، يرجى تسجيل الدخول أولاً' });
  }

  // 3. استخراج الـ Token
  const token = authHeader.split(' ')[1];

  try {
    // 4. التحقق من صحة الـ Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. إرفاق بيانات المستخدم بالطلب
    req.user = decoded;
    
    // 6. السماح بالمرور
    next(); 
  } catch (err) {
    return res.status(401).json({ error: 'انتهت صلاحية الجلسة أو الـ Token غير صالح' });
  }
};

module.exports = protect;