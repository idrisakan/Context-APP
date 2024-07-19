import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {TaskContext} from '../context/TaskContext';
import Loader from '../components/Loader';

export default function TaskScreen() {
  const route = useRoute();
  const {userId} = route.params;
  const {
    tasks,
    loading,
    error,
    removeTask,
    addTask,
    setNewTaskTitle,
    newTaskTitle,
  } = useContext(TaskContext);

 

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <FlatList
            data={tasks}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.title}>
                  {item.title.length > 20
                    ? item.title.slice(0, 30) + '...'
                    : item.title}
                </Text>
                <Button
                  title="Remove"
                  color={'#eeedeb'}
                  onPress={() => removeTask(item.id)}
                />
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
            value={newTaskTitle}
              placeholder="New Task Title"
              style={styles.input}
              onChangeText={setNewTaskTitle}
            />
            <Button title="Add Task" onPress={() => addTask(newTaskTitle)} />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#2f3645',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    width: '75%',
    padding: 5,
    borderRadius: 5,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
});
