import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


export const ClassContext = createContext();

// const API_URL = 'https://attendance-tracker-backend-ws6l.onrender.com/';
const API_URL = 'http://127.0.0.1:5000';

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  // create a new class
  const addClass = async (classData) => {
    try {
      const response = await axios.post(`${API_URL}/class`, classData, {
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem('authToken')}`,
            "Content-Type":"Application/json"
        }
      });
      setClasses([...classes, response.data]);
      return response.data;
    } catch (error) {
      setError('Error creating a new class');
      throw error;
    }
  };

  // update class details
  const updateClass = async (classId, updatedData) => {
    setLoading(true)
    try {
        const response = await axios.patch(`${API_URL}/class/${classId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            "Content-Type": "Application/json",
          },
        });
  
        setClasses(classes.map((cls) => (cls.id === classId ? response.data : cls)));
  
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Class Updated',
          text: 'The class details have been updated successfully!',
        });
  
        return response.data;
      
    } catch (error) {
        setError('Error updating class details');
    
        // Show error alert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error updating the class details. Please try again.',
        });
      throw error;
    } finally{
        setLoading(false)
    }
  };
  

  // delete a class
  const deleteClass = async (classId) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You are about to delete this class. This action cannot be undone!',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        setLoading(true)
        await axios.delete(`${API_URL}/class/${classId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            "Content-Type": "Application/json",
          },
        });
  
        setClasses(classes.filter((cls) => cls.id !== classId));
  
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Class Deleted',
          text: 'The class has been deleted successfully!',
        });
      }
    } catch (error) {
      setError('Error deleting class');
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error deleting the class. Please try again.',
      });
  
      throw error;
    } finally{
        setLoading(false)
    }
  };
  

  // add student(s) to a class   
  const addStudentToClass = async (classId, userId) => {
    try {
      const response = await axios.post(`${API_URL}/class/${classId}/students/${userId}`);
      // Optionally, update the local state with the new data
      setStudents([...students, response.data]);
      return response.data;
    } catch (error) {
      setError('Error adding student to class');
      throw error; // Rethrow the error for handling in the component
    }
  };

  // remove student from a class
  const removeStudentFromClass = async (classId, userId) => {
    try {
      await axios.delete(`${API_URL}/class/${classId}/students/${userId}`);
      // Optionally, update the local state by removing the deleted student
      setStudents(students.filter((student) => student.user_id !== userId));
    } catch (error) {
      setError('Error removing student from class');
      throw error; // Rethrow the error for handling in the component
    }
  };

  return (
    <ClassContext.Provider
      value={{
        classes,
        setClasses,
        students,
        loading,
        setLoading,
        error,
        setError,
        addClass,
        updateClass,
        deleteClass,
        addStudentToClass,
        removeStudentFromClass,
        API_URL
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  return useContext(ClassContext);
};
