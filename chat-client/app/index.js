import { View, Image, StyleSheet } from 'react-native'; 

const Home = () => {
    const banner = require('../assets/pikachuBanner.jpg'); 
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