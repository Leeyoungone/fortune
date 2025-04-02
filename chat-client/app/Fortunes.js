//Send Fortune 
//See Received Fortune
//two buttons that redirect or open a separate "room"
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'; 
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

const boundedHeight = Dimensions.get('window').height;

const Fortunes = () => {
    const router = useRouter();

    const receivedFortune = () => {
        router.push('/Received');
    }; 

    const sendFortune = () => {
        router.push('/Send');
    }

    return (
        <View> 
            <Text> Some Text Here </Text>
            <TouchableOpacity onPress={receivedFortune}> 
                <Text style={styles.formButtonLabel}> RECEIVED</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={sendFortune}> 
                <Text style={styles.formButtonLabel}> SEND</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    formButtonLabel: {
        ...Platform.select({
            android: {
                fontSize: 16,
                paddingTop: 12
            },
            ios: {
                fontSize: 16,
                paddingTop: 12
            },
            default: {
                fontSize: 24,
                paddingTop: 20,
                display: 'inline-block', 
                backgroundColor: '#DDDDDD', 
            }
        })
    }
});

export default Fortunes; 