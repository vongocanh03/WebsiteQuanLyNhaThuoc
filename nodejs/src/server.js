import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/conectDB';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';  // Cập nhật dotenv
dotenv.config();  // Đảm bảo dotenv được gọi trước khi sử dụng process.env

// Khởi tạo ứng dụng express
const app = express();

// Sử dụng CORS để cho phép frontend giao tiếp với backend
app.use(cors());

// Cấu hình để có thể truy cập các file trong thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Cấu hình middleware body-parser để phân tích dữ liệu JSON và dữ liệu form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine nếu có (thông qua viewEngine.js)
viewEngine(app);

// Khởi tạo các route
initWebRoutes(app);

// Kết nối với cơ sở dữ liệu
connectDB();

// Lấy PORT từ biến môi trường, nếu không có thì dùng 8080 mặc định
const port = process.env.PORT || 8080;  

// Lắng nghe cổng và in ra thông báo
app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});
