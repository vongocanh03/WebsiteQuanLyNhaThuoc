import React from 'react';
import './Foodter.scss';
import qrCode from '../../assets/QR code.png'; // Đường dẫn tới ảnh QR code

const Foodter = () => {
  return (
    <footer className="foodter">
      <div className="foodter-container">
        <div className="foodter-section">
          <h4>VỀ CHÚNG TÔI</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Hệ thống cửa hàng</li>
            <li>Giấy phép kinh doanh</li>
            <li>Quy chế hoạt động</li>
            <li>Chính sách đặt cọc</li>
            <li>Chính sách nội dung</li>
            <li>Chính sách đổi trả thuốc</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách thanh toán</li>
            <li>Kiểm tra hóa đơn điện tử</li>
            <li>Chính sách thu thập và xử lý dữ liệu cá nhân</li>
            <li>Chính sách hoàn hủy đổi trả Vắc xin</li>
            <li>Thông tin trung tâm bảo hành thiết bị y tế từng hãng</li>
          </ul>
        </div>
        <div className="foodter-section">
          <h4>DANH MỤC</h4>
          <ul>
            <li>Thực phẩm chức năng</li>
            <li>Dược mỹ phẩm</li>
            <li>Thuốc</li>
            <li>Chăm sóc cá nhân</li>
            <li>Trang thiết bị y tế</li>
            <li>Đặt thuốc online</li>
            <li>Trung tâm Tiêm chủng</li>
          </ul>
        </div>
        <div className="foodter-section">
          <h4>TÌM HIỂU THÊM</h4>
          <ul>
            <li>Góc sức khỏe</li>
            <li>Tra cứu thuốc</li>
            <li>Tra cứu dược chất</li>
            <li>Tra cứu dược liệu</li>
            <li>Bệnh thường gặp</li>
            <li>Bệnh viện</li>
            <li>Đội ngũ chuyên môn</li>
            <li>Hoạt động xã hội</li>
            <li>Tin tức tuyển dụng</li>
            <li>Tin tức sự kiện</li>
          </ul>
        </div>
        <div className="foodter-section contact-info">
          <h4>TỔNG ĐÀI</h4>
          <p>Tư vấn mua hàng: <strong>18006928</strong> (Nhánh 1)</p>
          <p>Trung tâm Vắc xin: <strong>18006928</strong> (Nhánh 2)</p>
          <p>Góp ý, khiếu nại: <strong>18006928</strong> (Nhánh 3)</p>
          <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
          <div className="social-media">
            <a href="#">Facebook</a>
            <a href="#">Zalo</a>
          </div>
          <div className="qr-code">
            <img src={qrCode} alt="QR Code" />
          </div>
        </div>
      </div>
      <div className="foodter-bottom">
        <p>
          © 2007 - 2024 Công ty Cổ phần Dược phẩm VNA Pharmacy. Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM.
          Điện thoại: (028)12345678 - Email: contact@vnapharmacy.vn
        </p>
      </div>
    </footer>
  );
};

export default Foodter;
