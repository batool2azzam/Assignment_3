import React, { useState } from 'react';
import './App.css';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    age: '',
    isEmployee: false,
    salary: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }
  
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone number must be 10 digits';
    }
  
    if (!formData.age.trim()) {
      validationErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || +formData.age < 18 || +formData.age > 65) {
      validationErrors.age = 'Age must be between 18 and 65';
    }
  
    if (!formData.salary.trim()) {
      validationErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || +formData.salary <= 0) {
      validationErrors.salary = 'Salary must be a positive number';
    }
  
    const errorKeys = Object.keys(validationErrors);
  
    if (errorKeys.length === 0) {
      const userData = { ...formData };
      alert('Form Submitted successfully');
      console.log('User Data:', userData); 
    } else {

        const sortedErrorKeys = ['name', 'phoneNumber', 'age', 'salary'].filter((key) =>
        errorKeys.includes(key)
      );
  
      const errorMessage = sortedErrorKeys.map((key) => validationErrors[key]).join('\n');
      alert(errorMessage);
    }
  };
  

  return (
    <div>
      <h1>Requesting a Loan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="off"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Your Phone Number"
            autoComplete="off"
            onChange={handleChange}
            value={formData.phoneNumber}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            placeholder="Your Age"
            autoComplete="off"
            onChange={handleChange}
            value={formData.age}
          />
        </div>
        <div>
          <label>
            Are you an Employee?
            <input
              type="checkbox"
              name="isEmployee"
              onChange={handleChange}
              checked={formData.isEmployee}
            />
          </label>
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            placeholder="Your Salary"
            autoComplete="off"
            onChange={handleChange}
            value={formData.salary}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
