import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';


const ClassContext = createContext();

// const API_URL = 'https://attendance-tracker-backend-ws6l.onrender.com/';
const API_URL = 'http://127.0.0.1:5000';

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // get all classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}/class`, {
            headers: {
                Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
            }
        });
        setClasses(response.data);
      } catch (error) {
        setError('Error fetching classes');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

 
  // get students in a particular class
  const fetchClassStudents = async (classId) => {
    try {
      const response = await axios.get(`${API_URL}/class/${classId}/students`);
      setStudents(response.data);
    } catch (error) {
      setError('Error fetching class students');
    }
  };

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
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Do you want to save the changes?',
        text: 'Class Details will be updated!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });
  
      if (result.isConfirmed) {
        // User clicked "Yes, update it!"
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
      }
    } catch (error) {
      setError('Error updating class details');
  
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error updating the class details. Please try again.',
      });
  
      throw error;
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

  // mark attendance for student   
  const markAttendance = async (classId) => {
    try {
      await axios.post(`${API_URL}/class/${classId}/attendance`);
      // Optionally, update the local state or trigger a refetch if needed
    } catch (error) {
      setError('Error marking attendance');
      throw error; // Rethrow the error for handling in the component
    }
  };

  return (
    <ClassContext.Provider
      value={{
        classes,
        classDetails,
        students,
        loading,
        error,
        // fetchClasses,
        // fetchClassDetails,
        fetchClassStudents,
        addClass,
        updateClass,
        deleteClass,
        addStudentToClass,
        removeStudentFromClass,
        markAttendance,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  return useContext(ClassContext);
};
