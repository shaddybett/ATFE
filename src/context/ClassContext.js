import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ClassContext = createContext();

const API_URL = 'https://attendance-tracker-backend-ws6l.onrender.com/';
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
        const response = await axios.get(`${API_URL}/class`);
        setClasses(response.data);
      } catch (error) {
        setError('Error fetching classes');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // get class details
  const fetchClassDetails = async (classId) => {
    try {
      const response = await axios.get(`${API_URL}/class/${classId}`);
      setClassDetails(response.data);
    } catch (error) {
      setError('Error fetching class details');
    }
  };

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
  const createClass = async (classData) => {
    try {
      const response = await axios.post(`${API_URL}/class`, classData);
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
      const response = await axios.patch(`${API_URL}/class/${classId}`, updatedData);
      setClasses(classes.map((cls) => (cls.id === classId ? response.data : cls)));
      return response.data;
    } catch (error) {
      setError('Error updating class details');
      throw error;
    }
  };

  // delete a class
  const deleteClass = async (classId) => {
    try {
      await axios.delete(`${API_URL}/class/${classId}`);
      setClasses(classes.filter((cls) => cls.id !== classId));
    } catch (error) {
      setError('Error deleting class');
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
        fetchClassDetails,
        fetchClassStudents,
        createClass,
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
