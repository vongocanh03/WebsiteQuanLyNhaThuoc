import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SymptomManagement.scss'
import { toast } from 'react-toastify'; // Import toast
const SymptomManagement = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', productIds: [] });
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Khai báo currentPage và setCurrentPage
    const [itemsPerPage, setItemsPerPage] = useState(5); // Số lượng triệu chứng hiển thị trên mỗi trang

    useEffect(() => {
        fetchSymptoms();
        fetchProducts();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/symptoms');
            setSymptoms(response.data);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
        }
    };
    // Tính toán các triệu chứng cần hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSymptoms = symptoms.slice(indexOfFirstItem, indexOfLastItem);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(symptoms.length / itemsPerPage);

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            if (response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products); // Giả sử dữ liệu trả về là mảng
            } else {
                console.error('Dữ liệu sản phẩm không đúng định dạng:', response.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra xem tên triệu chứng có trống không
        if (!form.name.trim()) {
            toast.error('Tên triệu chứng không được để trống!',{autoClose: 2000,});
            return; // Dừng việc gửi dữ liệu nếu tên triệu chứng trống
        }
    
        // Kiểm tra xem có sản phẩm nào được chọn không
        if (form.productIds.length === 0) {
            toast.error('Vui lòng chọn ít nhất một thuốc!');
            return; // Dừng việc gửi dữ liệu nếu không có thuốc nào được chọn
        }
    
        try {
            // Tạo triệu chứng mới
            const symptomResponse = await axios.post('http://localhost:8080/api/symptoms', form);
    
            // Lấy ID của triệu chứng mới
            const symptomId = symptomResponse.data.id;
    
            // Thêm các mối quan hệ giữa triệu chứng và thuốc vào bảng productsymptoms
            if (form.productIds.length > 0) {
                await axios.post('http://localhost:8080/api/productsymptoms', {
                    symptomId,
                    productIds: form.productIds,
                });
            }
    
            // Cập nhật lại danh sách triệu chứng sau khi thêm thành công
            fetchSymptoms();
    
            // Hiển thị thông báo thành công
            toast.success('Thêm triệu chứng thành công!');
    
            // Reset form sau khi thêm thành công
            resetForm();
        } catch (error) {
            console.error('Error saving symptom:', error);
            toast.success('Thêm triệu chứng thành công!',{autoClose: 2000,});
        }
    };
    
    

    const handleEdit = (symptom) => {
        setEditingId(symptom.id);
        setForm({
            name: symptom.name,
            productIds: symptom.products.map((product) => product.id),
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/symptoms/${id}`);
            fetchSymptoms();
        } catch (error) {
            console.error('Error deleting symptom:', error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({ name: '', productIds: [] });
    };

    const handleProductChange = (productId) => {
        setForm((prev) => ({
            ...prev,
            productIds: prev.productIds.includes(productId)
                ? prev.productIds.filter((id) => id !== productId)
                : [...prev.productIds, productId],
        }));
    };

    return (
        <div className="symptom-management">
            <h2>Quản lý triệu chứng</h2>
            <form onSubmit={handleSubmit} className="symptom-form">
                <input
                    type="text"
                    placeholder="Tên triệu chứng"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <div className="product-selector">
                    <h4>Chọn thuốc:</h4>
                    {Array.isArray(products) && products.length > 0 ? (
                        <div className="scrollable-list">
                            {products.map((product) => (
                                <label key={product.id}>
                                    <input
                                        type="checkbox"
                                        checked={form.productIds.includes(product.id)}
                                        onChange={() => handleProductChange(product.id)}
                                    />
                                    {product.name}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p>Không có thuốc nào để chọn</p>
                    )}
                </div>

                <button type="submit">{editingId ? 'Cập nhật' : 'Thêm'}</button>
                {editingId && <button type="button" onClick={resetForm}>Hủy</button>}
            </form>

            <div className="symptom-list">
            <h3>Danh sách triệu chứng</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tên triệu chứng</th>
                        <th>Thuốc gợi ý</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSymptoms.map((symptom) => (
                        <tr key={symptom.id}>
                            <td>{symptom.name}</td>
                            <td>{symptom.products.map((p) => p.name).join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(symptom)}>Sửa</button>
                                <button onClick={() => handleDelete(symptom.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>

        </div>
    );
};

export default SymptomManagement;
