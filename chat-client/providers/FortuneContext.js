import { createContext, useState} from 'react'; 
import { socket } from '../utils/socket'; 
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Alert } from 'react-native';

export const FortuneContext = createContext(null); 

export const FortuneProvider = (props) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(''); 
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A'); 
    const [roomListing, setRoomListing] = useState([]); 
    const [chatMessages, getChatMessages] = useState([]); 
    const [userMessage, setUserMessage] = useState('');

    const toggleLogin = () => {
        if (isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', () => {
                setIsLoggedIn(false); 
                setLoggedUser(''); 
                Alert.alert('user logged out'); 
            })
        }
        else {
            router.push('/Login')
        }
    };

    const getUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if(result === 'none') {
                console.log('No one is logged in'); 
            }
            else if (result===null) {
                AsyncStorage.setItem('userLoggedIn', 'none', () => {
                    console.log('Set user to NONE'); 
                })
            }
            else {
                setIsLoggedIn(true); 
                setLoggedUser(result); 
                console.log('Logged in user: ', loggedUser); 
            }
        })
    };

    const getChatUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if(result === 'none') {
                console.log('No one is logged in'); 
                Alert.alert('You need to Login to Chat'); 
                router.push('/Login'); 
            }
            else {
                console.log('logged in user: ', loggedUser); 
            }
        }); 
    }; 

    const chatConnect = () => {
        setIsConnected(true); 
        setTransport(socket.io.engine.transport.name); 
        socket.io.engine.on('upgrade', (transport) => {
            setTransport(transport.name);
        }); 
    }; 

    const chatDisconnect = () => {
        socket.disconnect(); 
        setIsConnected(false); 
        setTransport('N/A');
    }

    const fortuneConnection = () => {
        if(socket.connected) {
            chatConnect();
        } 
        else {
            socket.connect();
        }
        socket.on('connect', chatConnect);
        socket.on('disconnect', chatDisconnect); 

        return () => {
            socket.off('connect', chatConnect); 
            socket.off('disconnect', chatDisconnect);
        }; 
    }

    const fetchRooms = () => {
        socket.emit('getRooms'); 
    }; 

    const listRooms = () => {
        socket.on('returnRooms', (rooms) => {
            setRoomListing(rooms);
        });
    }; 

    const joinRoom = (room, user) => {
        const messageTime = new Date().toLocaleString();
        let joinMessage = `${user} has joined the chat @ ${messageTime}`; 
        socket.emit('connectRoom', room); 
        socket.on('joinedRoom', (roomMessages) => getChatMessages(roomMessages)); 
        sendMessage(joinMessage, room, user);
    }

    const handleChatMessages = (value) => {
        getChatMessages(value); 
    }; 

    const sendMessage = (userMessage, room_id, sender) => {
      if(userMessage){
        const messageTime = new Date().toLocaleString(); 
        socket.emit('newPost', {
            userMessage, 
            room_id, 
            sender, 
            messageTime
        });
        setUserMessage(''); 
      }
      else {
        Alert.alert('Please send a message');
      }

    };

    return(
        <FortuneContext.Provider
            value={{
                toggleLogin, 
                getUser, 
                isLoggedIn, 
                setIsLoggedIn, 
                loggedUser, 
                getChatUser,
                isConnected, 
                transport, 
                roomListing, 
                chatConnect, 
                chatDisconnect, 
                fortuneConnection, 
                fetchRooms, 
                listRooms,
                chatMessages, 
                joinRoom, 
                userMessage, 
                setUserMessage, 
                sendMessage, 
                socket, 
                handleChatMessages 
            }}
        >
            {props.children}
        </FortuneContext.Provider>
    ); 


}