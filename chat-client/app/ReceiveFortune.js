import { View, Text, Dimensions } from "react-native";
import { useRouter } from 'expo-router'; 
import { Stack, Button, TextField, Box } from '@mui/material'


const boundedHeight = Dimensions.get('window').height;

const ReceiveFortune = () => {
    const router = useRouter();


    return (
        <View>
            <Box sx={{m: 2}}>
            <Stack
                direction="column"
                spacing={ 2 }
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text> This is the received Fortune Page </Text>
                <Button 
                    variant="contained"
                    sx={{ width: '25%' }}>
                    Open Fortune
            </Button>  
            </Stack>
            </Box>
        </View>
    );

}

export default ReceiveFortune;