import axios from 'axios';
import { useState ,useEffect, createContext} from 'react';
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState([]);
    const [user_id, setuser_id] = useState();
    const [user_db, setuser_db] = useState({});
    const [client, setclient] = useState({});
    const [userisauth, setuserisauth] = useState(false);
    const [isclient, setisclient] = useState(false);
   
    const id = localStorage.getItem('id_active');
    const users = localStorage.getItem('user');
   
    console.log(userisauth)
    useEffect(() => {
      fetchuser();
  }, [userisauth,isclient]);


  const fetchuser = () => {
    axios.get(`http://127.0.0.1:8000/api/getuser?id=${id}`)
    .then(response => {
              setuser_db(response.data.user)
              console.log(response.data.user)
          })
          .catch(error => {
              console.error(error);
          });
  };
  
    return (

        <AuthContext.Provider value={{isclient,setisclient, client,setclient,setuserisauth,userisauth,user, setUser, profile, user_id,setuser_id,setProfile,user_db,setuser_db}}>
            {children}
        </AuthContext.Provider>

    )
}
