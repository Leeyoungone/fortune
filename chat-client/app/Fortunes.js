//Send Fortune 
//See Received Fortune
//two buttons that redirect or open a separate "room"
import { Text } from 'react-native'; 
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

const boundedHeight = Dimensions.get('window').height;

const Fortunes = () => {
    const router = useRouter();

    return (
        <Text> Some Text Here </Text>
    )
}

export default Fortunes; 