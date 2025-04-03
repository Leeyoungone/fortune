import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'; 
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { Stack, Button, TextField, Box } from '@mui/material'


const boundedHeight = Dimensions.get('window').height;

const Fortunes = () => {
    const router = useRouter();

    const receivedFortune = () => {
        router.push('/ReceiveFortune');
    }; 

    const sendFortune = () => {
        router.push('/SendFortune');
    }

    return (
        <View style={styles.containerStyle}> 
            <Box sx={{m: 2}}>
            <Stack
                direction="column"
                spacing={ 2 }
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Button 
                    variant="contained"
                    sx={{ width: '25%' }}
                    onClick ={()=> {
                        receivedFortune();
                    }}
                    >
                    Received Fortune
                </Button>

                <Button 
                    variant="contained"
                    sx={{ width: '25%' }}
                    onClick ={()=> {
                        sendFortune();
                    }}>
                    Make Fortune
                </Button>
            </Stack>
            </Box>
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
            }
        })
    }
});

export default Fortunes; 