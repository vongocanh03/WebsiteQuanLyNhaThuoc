// controllers/medicationController.js
const nodemailer = require('nodemailer');
const { MedicationSchedule } = require('../models'); // Đảm bảo rằng model này đã được định nghĩa đúng

// Hàm tạo lịch nhắc uống thuốc
const createSchedule = async (req, res) => {
  const { drug_name, schedule_time, reminder_time, email } = req.body;

  try {
    // Lưu lịch nhắc uống thuốc vào DB
    const schedule = await MedicationSchedule.create({
      drug_name,
      schedule_time,
      reminder_time,
      email
    });

    // Gửi email thông báo
    sendEmailNotification(email, drug_name, schedule_time);

    return res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating schedule', error });
  }
};

// Hàm gửi email thông báo
const sendEmailNotification = (email, drug_name, schedule_time) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'www.linh6789@gmail.com',  // Đọc từ biến môi trường
      pass: 'ukbr wczi qovz oxhd',  // Đọc từ biến môi trường
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,  // Địa chỉ email gửi
    to: email,                    // Địa chỉ email nhận thông báo
    subject: 'Medication Reminder', // Tiêu đề email
    text: `Don't forget to take your medicine: ${drug_name} at ${schedule_time}.` // Nội dung email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  createSchedule
};
