import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

export default function UserListScreen() {
  const navigation = useNavigation();
  //* Contextte abone olmak için useContext kullanırız.useContext içerisine girdiğimiz contextin verilerini getirir.

  const {loading, error, users} = useContext(UserContext);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserDetails', {userId: item.id})
              }>
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});
