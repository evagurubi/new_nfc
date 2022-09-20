/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
   View,
   TouchableOpacity
} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import Reader from './Reader';
import ScanPrompt from './ScanPrompt';



const App = () => {

  const [hasNfc, setHasNfc] = useState(null);
const promptRef = React.useRef();

const checkNfc = async() => {
  const supported = await NfcManager.isSupported();
  if (supported) {
    await NfcManager.start()
  }
  setHasNfc(supported)}

  useEffect(() => {
      checkNfc();
  }, [])
  

if (hasNfc === null) {
  return null;
} else if (!hasNfc) {
  return (
    <View style = {styles.wrapper}>
      <Text style={styles.titleText}>Your device doesn't support NFC</Text>
      <TouchableOpacity onPress = {() => {
  promptRef.current.setVisible(true);
}}>
  <Text>TEST</Text>
</TouchableOpacity>
      <ScanPrompt ref={promptRef}/>
    
    </View>
  );
}

  return (
            <Reader/>     
   );
};

const styles = StyleSheet.create({
  
 wrapper: {
  flex:1,
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor: '#808080',
 },
titleText: {
  fontSize: 20,
    fontWeight: "bold", 
    color: 'white'
}
});

export default App;
