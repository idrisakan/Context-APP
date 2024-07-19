import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../context/UserContext';

export default function UserDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = route.params;
  const {users} = useContext(UserContext);
  const user = users.find(user => user.id === userId);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <Button
          title="View Taks"
          onPress={() => navigation.navigate('Tasks', {userId})}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#eeedeb',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
