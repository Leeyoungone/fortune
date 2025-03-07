import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header'; 
import Footer from "../components/Footer";

const Layout = () => {
    return(
        <SafeAreaView>  
            <Header/>
            <Slot/>
            <Footer/>
        </SafeAreaView>
    );
}; 

export default Layout;