// src/containers/HomePage/MedicationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MedicationForm = () => {
  const [drugName, setDrugName] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra thông tin người dùng nhập vào
    if (!drugName || !scheduleTime || !reminderTime || !email) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/medication/schedule', {
        drug_name: drugName,
        schedule_time: scheduleTime,
        reminder_time: reminderTime,
        email: email
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Error creating schedule');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="drugName">Drug Name</label>
        <input
          id="drugName"
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="Enter drug name"
        />
      </div>

      <div>
        <label htmlFor="scheduleTime">Schedule Time</label>
        <input
          id="scheduleTime"
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          placeholder="Enter schedule time"
        />
      </div>

      <div>
        <label htmlFor="reminderTime">Reminder Time</label>
        <input
          id="reminderTime"
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          placeholder="Enter reminder time"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <button type="submit">Create Schedule</button>
    </form>
  );
};

export default MedicationForm;
