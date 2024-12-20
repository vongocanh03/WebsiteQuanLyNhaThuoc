import React, { useEffect, useRef } from 'react';
import './Introduce.scss';
import introduceImage from '../../assets/introduce.jpg';

// Dữ liệu bình luận
const reviews = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
    review: "Dịch vụ tuyệt vời và nhân viên thân thiện!",
    rating: 5,
  },
  {
    name: "Trần Thị B",
    avatar: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/462871269_1821733098588303_201893991951586849_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=k1QhnLT04qIQ7kNvgHIh0-w&_nc_zt=24&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=AX0kXlcSiAHPFRn172MOsQL&oh=00_AYARab8FtD1pncijtkcwWecQ2SqyWRH-uGNEWxMsg58zKQ&oe=676AFF6D",
    review: "Mua thuốc tại VNA-Pharmacy rất dễ dàng và nhanh chóng.",
    rating: 4,
  },
  {
    name: "Lê Minh C",
    avatar: "https://th.bing.com/th/id/OIP.NtLcR7dN43f7PhOkWk5UaAHaJy?pid=ImgDet&w=184&h=242&c=7&dpr=1.3",
    review: "Sản phẩm chất lượng, giao hàng nhanh chóng.",
    rating: 5,
  },
  {
    name: "Phạm Thị D",
    avatar: "https://th.bing.com/th/id/OPAC.MntOcvNxHZUDsA474C474?o=5&pid=21.1&w=160&h=220&dpr=1.3",
    review: "Tôi rất hài lòng với dịch vụ tại VNA-Pharmacy.",
    rating: 4,
  },
  {
    name: "Bùi Đức E",
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/10/anh-trai-dep-han-quoc.jpg",
    review: "Giá cả hợp lý và chất lượng sản phẩm tốt!",
    rating: 5,
  },
  {
    name: "Nguyễn Văn A",
    avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
    review: "Dịch vụ tuyệt vời và nhân viên thân thiện!",
    rating: 5,
  },
  {
    name: "Trần Thị B",
    avatar: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/462871269_1821733098588303_201893991951586849_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=k1QhnLT04qIQ7kNvgHIh0-w&_nc_zt=24&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=AX0kXlcSiAHPFRn172MOsQL&oh=00_AYARab8FtD1pncijtkcwWecQ2SqyWRH-uGNEWxMsg58zKQ&oe=676AFF6D",
    review: "Mua thuốc tại VNA-Pharmacy rất dễ dàng và nhanh chóng.",
    rating: 4,
  },
  {
    name: "Lê Minh C",
    avatar: "https://th.bing.com/th/id/OIP.NtLcR7dN43f7PhOkWk5UaAHaJy?pid=ImgDet&w=184&h=242&c=7&dpr=1.3",
    review: "Sản phẩm chất lượng, giao hàng nhanh chóng.",
    rating: 5,
  },
  {
    name: "Phạm Thị D",
    avatar: "https://th.bing.com/th/id/OPAC.MntOcvNxHZUDsA474C474?o=5&pid=21.1&w=160&h=220&dpr=1.3",
    review: "Tôi rất hài lòng với dịch vụ tại VNA-Pharmacy.",
    rating: 4,
  },
  {
    name: "Bùi Đức E",
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/10/anh-trai-dep-han-quoc.jpg",
    review: "Giá cả hợp lý và chất lượng sản phẩm tốt!",
    rating: 5,
  },
];

const Introduce = () => {
  const reviewListRef = useRef(null);

  // Sao chép các bình luận khi render
  useEffect(() => {
    if (reviewListRef.current) {
      const clonedReviews = Array.from(reviewListRef.current.children).map(child => child.cloneNode(true));
      reviewListRef.current.append(...clonedReviews); // Thêm các phần tử đã sao chép vào cuối danh sách
    }
  }, []);

  return (
    <div className="introduce-container">
      <div className="pharmacy-info">
        <h2>VNA-Pharmacy</h2>
        <p>Chúng tôi cam kết cung cấp các sản phẩm thuốc chất lượng, dịch vụ nhanh chóng và hiệu quả.</p>
        <img src={introduceImage} alt="VNA-Pharmacy" />
      </div>
      <div className="reviews">
        
        <div className="review-list" ref={reviewListRef}>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <img src={review.avatar} alt={review.name} className="avatar" />
                <div className="review-info">
                  <p className="review-name">{review.name}</p>
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < review.rating ? "filled" : ""}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
          
        </div>
        
      </div>
      
    </div>
    
  );
};

export default Introduce;
