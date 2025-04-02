import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FortuneProvider } from "../providers/FortuneContext";
import Header from '../components/Header'; 
import Footer from "../components/Footer";

const Layout = () => {
    return(
        <FortuneProvider>
            <SafeAreaView>  
                <Header/>
                <Slot/>
                <Footer/>
            </SafeAreaView>
        </FortuneProvider>
    );
}; 

export default Layout;