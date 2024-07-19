import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => setError(err));
  }, []);
  //* Gönderilen idli taskı silmeye yarar
  const removeTask = id => {
    //* Parametre olarak gelen idli elemanı tasks dizisi içerisinde sil ve kalanları dizi olarak dönder.

    const filtred = tasks.filter(task => task.id !== id);
    //* Tasks state ini güncelle

    setTasks(filtred);
    Alert.alert('task silindi');
  };

  //* Gönderilen title yeni bir obje olarak tasks stateine ekle
  const addTask = title => {
    const newTask = {
      userId: 1,
      id: tasks.length + 1,
      title,
    };
    setTasks([...tasks, newTask]);
    Alert.alert('Yeni Task Eklendi');
    setNewTaskTitle(' ');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        loading,
        removeTask,
        addTask,
        setNewTaskTitle,
        newTaskTitle,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
