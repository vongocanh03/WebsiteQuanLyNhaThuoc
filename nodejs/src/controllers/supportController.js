import { SupportRequest } from '../models';

// Tạo yêu cầu hỗ trợ
const createSupportRequest = async (req, res) => {
  try {
    const { email, name, message } = req.body;
    const newRequest = await SupportRequest.create({ email, name, message });
    res.status(201).json({ message: 'Support request created successfully', data: newRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create support request' });
  }
};

// Lấy tất cả yêu cầu hỗ trợ
const getAllSupportRequests = async (req, res) => {
  try {
    const supportRequests = await SupportRequest.findAll();
    res.status(200).json({ data: supportRequests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch support requests' });
  }
};

// Cập nhật trạng thái của yêu cầu hỗ trợ
const updateSupportRequestStatus = async (req, res) => {
  const { id } = req.params;  // ID yêu cầu hỗ trợ
  const { status } = req.body;  // Trạng thái mới ("Resolved" hoặc "Pending")

  try {
    // Tìm yêu cầu hỗ trợ bằng ID
    const supportRequest = await SupportRequest.findByPk(id);
    if (!supportRequest) {
      return res.status(404).json({ error: 'Support request not found' });
    }

    // Cập nhật trạng thái
    supportRequest.status = status;
    await supportRequest.save();

    res.status(200).json({ message: 'Support request status updated successfully', data: supportRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update support request status' });
  }
};

module.exports = { createSupportRequest, getAllSupportRequests, updateSupportRequestStatus };
