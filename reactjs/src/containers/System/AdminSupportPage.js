import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminSupportPage.scss';

const AdminSupportPage = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchSupportRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/support');
      setSupportRequests(response.data.data);
    } catch (error) {
      setErrorMessage('Failed to fetch support requests.');
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const handleReply = async (request) => {
    const emailSubject = encodeURIComponent(`Re: Support Request from ${request.name}`);
    const emailBody = encodeURIComponent(`Hello ${request.name},\n\n${request.message}\n\nBest regards,\nYour Support Team`);

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${request.email}&su=${emailSubject}&body=${emailBody}`;

    window.open(mailtoLink, '_blank');
    await handleMarkAsResolved(request.id);
  };

  const handleMarkAsResolved = async (requestId) => {
    try {
      await axios.put(`http://localhost:8080/api/support/${requestId}`, { status: 'Resolved' });
      fetchSupportRequests();
    } catch (error) {
      setErrorMessage('Failed to update support request status.');
    }
  };

  const getStatusText = (status) => {
    if (status === 'Pending') {
      return { text: 'Đang chờ', className: 'pending' };
    }
    if (status === 'Resolved') {
      return { text: 'Đã xử lý', className: 'resolved' };
    }
    return { text: status, className: '' };
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="admin-support-container">
      <h1>Admin Support Management</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supportRequests.map((request) => {
            const { text, className } = getStatusText(request.status);
            return (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.email}</td>
                <td>{request.name}</td>
                <td className="message-cell">{request.message}</td>
                <td className={className}>{text}</td>
                <td>
                  {request.status !== 'Resolved' && (
                    <button className="button" onClick={() => handleReply(request)}>Phản hồi</button>
                  )}
                  <button className="button" onClick={() => handleViewDetails(request)}>Xem chi tiết</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>×</span>
            <h2>Detail of Support Request</h2>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>Message:</strong></p>
            <p>{selectedRequest.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupportPage;
