/*
 * Context API:
 * Uygulamada birden çok bileşenin ihtiyacı olan verileri bileşenlerden bağımsız bir
 * şekilde konumlanan merkezlerde yönetmeye yarar.
 
  * Context yapısı içerisinde verilerin stateini ve verileri 
  * değiştirmeye yarayan fonksiyonları tutabiliriz.
  
  * Context, tuttuğumuz statelerin bileşenlere doğrudan aktarım yapabilen state yönetim aracıdır.
 */

import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

//* 1.adım: Context yapısının temelini oluşturur.
export const UserContext = createContext();

//* 2.adım: Verileri bileşenlere aktaracak olan sağlayıcıyı ve onun tuttuğu verileri tanımlarız.
export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      //api e istek at
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
 //* 3.adım: Sağlayıcı fonksiyonları mutlaka provider ı return etmelidir ve App'i sarmalamalıdır.
  //* value olarak eklenen değerler projedeki bileşenler tarafından erişilebilir olur.
  return (
    <UserContext.Provider value={{users, loading, error}}>
      {children}
    </UserContext.Provider>
  );
};
