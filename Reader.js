import React from 'react';

import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
   View,
   TouchableOpacity
} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';


const Reader = (props) => {

    const scanTag = async() => {

       /*  try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.warn('Tag found', tag);
          } catch (ex) {
            console.warn('Oops!', ex);
          } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
          } */

NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    console.warn('tag found', tag)
});
await NfcManager.registerTagEvent(); 
    }

   return (
 
             <View style={styles.wrapper}>
          <Text style={styles.titleText} >NFC Reader</Text>
<TouchableOpacity style={styles.btn} onPress={scanTag}>
    <Text>START</Text>
</TouchableOpacity>
        </View>
     
 
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
},
btn: {
margin: 15,
padding: 15,
borderRadius: 8, 
backgroundColor: '#ccc'
}
});

export default Reader;
