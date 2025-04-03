import * as React from 'react';
import { View, Dimensions } from "react-native";
import { useRouter } from 'expo-router'; 
import { Stack, Button, TextField, Box, InputLabel, useTheme, OutlinedInput, MenuItem } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, DemoContainer} from "@mui/x-date-pickers";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const boundedHeight = Dimensions.get('window').height;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: boundedHeight * 4.5 + 2,
        width: '50%',
      },
    },
  };

const SendFortune = () => {
    const router = useRouter();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const getStyles = (name, personName, theme) => {
        return {
            fontWeight: personName.includes(name)
              ? theme.typography.fontWeightMedium
              : theme.typography.fontWeightRegular,
        };
    }; 
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const names = [
        "twerp", 
        "twerb", 
        "bwuh", 
        "gwuh"
    ];

    return (
        <View>
            <Box sx= {{ m: 3 }}> 
                <Stack spacing={{ xs: 1, sm: 2 }} >
                    
                <InputLabel id="demo-multiple-name-label">Receiver</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                    >
                {name}
                </MenuItem>
            ))}
            </Select>
                        
                    
     
                    <TextField
                        id="outlined-helperText"
                        label="User's name"
                        helperText="This is who you can impersonate"
                        sx={{ width: '60%'}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Fortune Context"
                        multiline
                        rows={4}
                        sx={{ width: '75%' }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Send on" sx={{ width: '25%'}} />
                    </LocalizationProvider>
                    <Button 
                        variant="contained"
                        sx={{ width: '50%' }}>
                        Wrap Fortune
                    </Button>
                </Stack> 
            </Box>
        </View>
    );
}

export default SendFortune;