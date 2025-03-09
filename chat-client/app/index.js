import { View, Image, StyleSheet } from 'react-native'; 
import { FortuneContext } from '../providers/FortuneContext';
import { useEffect, useContext } from 'react';

const Home = () => {
    const banner = require('../assets/pikachuBanner.jpg'); 
    const {isConnected, chatDisconnect} = useContext(FortuneContext); 

    useEffect(() => {
        if(isConnected) {
            chatDisconnect();
        }
    })

    return(
        <View>
            <Image
                source={banner}
                style={styles.banner}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    banner:{
        width:'100%', 
        height:300,
        resizeMode: 'stretch'
    }
}); 

export default Home;