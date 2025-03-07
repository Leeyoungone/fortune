import { StyleSheet, View, Image, Text } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { FontAwesome6 } from '@expo/vector-icons'; 


const Header = () => {
    const logo = require('../assets/pikachus.png');
    const router = useRouter(); 
    let userDisplay = <FontAwesome6 name="user-circle" size={30} color='#FFFFFF'/>

    return(
        <View style={styles.header}>
            <Image
                source={logo}
                style={styles.logoStyle}
                />
            <Text style={styles.menu}>
                BRANDS
            </Text>
            <Text style={styles.menu}>
                TWERB CHAT
            </Text>
            <Text style={styles.menu}>
                REGISTER
            </Text>
            <Text style={styles.menu}>
                {userDisplay}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        alignItems: 'center', 
        backgroundColor: '#212121', 
        height: 120, 
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5
    }, 

    logoStyle: {
        height: '60%', 
        width: '20%', 
        resizeMode: 'stretch'
    }, 
    menu: {
        color: '#00bda5',
        fontSize: 16, 
        alignSelf: 'center',
        paddingHorizontal: 5
    }
});

export default Header;