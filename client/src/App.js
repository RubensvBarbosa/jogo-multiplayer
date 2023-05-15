import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from "universal-cookie";
import { useState } from 'react';
import JoinGame from './components/JoinGame';
import { useHistory } from 'react-router-dom';

function App() {
  const api_key = "26m7ytqqkxe7";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);


  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  }



  if (token){
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        hashedPassword: cookies.get("hashedPassword"),
      },
      token
    ).then((user) => {
      setIsAuth(true);
    });
  }
  return (
    <div className="App">
      {isAuth ? (        
        <Chat client={client}>
          <JoinGame/>
          <button onClick={logOut}> Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
