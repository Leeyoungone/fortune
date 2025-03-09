import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FortuneContext } from "../providers/FortuneContext";
import { useEffect, useContext } from "react";

const Chat = () => {
    const router = useRouter(); 
    const {
        isLoggedIn, 
        loggedUser, 
        isConnected, 
        transport, 
        roomListing, 
        getChatUser, 
        fortuneConnection, 
        fetchRooms, 
        listRooms
    } = useContext(FortuneContext);

    useEffect(() => {
        getChatUser(), 
        fortuneConnection(); 
        fetchRooms(); 
        listRooms();
    }, [isLoggedIn])

    const RoomComponent = ({roomId, roomName, description}) => {
        return(
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: '/Room', 
                        params: {room_id: roomId, roomTitle: roomName, sender: loggedUser}
                    });
                }}
            >
                <View style={styles.roomItem}>
                    <Text style={styles.roomTitle}>{roomName}</Text>
                    <Text style={styles.roomDesc}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <View styles={styles.statusBox}>
                <Text style={styles.statusLabel}>
                    Status: { isConnected? 'connected' : 'disconnected' }
                </Text>
                <Text style={styles.statusLabel}>
                    Transport: {transport}
                </Text>
            </View>

            <FlatList 
                data={roomListing}
                renderItem={({item}) => <RoomComponent {...item} />}
                keyExtractor={item => item.roomId} 
            />
        </View>
    )
}; 

const styles = StyleSheet.create({
    roomItem: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 30,
        borderTopWidth: 1
    },
    roomTitle: {
        fontSize: 24,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        paddingBottom: 10
    },
    roomDesc: {
        fontSize: 20,
    },
    container: {
        alignItems: 'center',
        paddingBottom: 100
    },
    statusBox: {
        alignSelf: 'flex-start',
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});

export default Chat;