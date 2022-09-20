import React from 'react';

import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
   View,
   TouchableOpacity,
   Platform
} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import ScanPrompt from './ScanPrompt';



const Reader = (props) => {

  const [tagId, setTagId] = useState("");
  const ScanPromptRef = React.useRef();
   /*  const scanTag = async() => {

         try {
           // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
           // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
           // console.warn('Tag found', tag.id);
setTagId(tag.id)
          } catch (ex) {
            console.warn('Oops!', ex);
          } finally {
           // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
          }  

// NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
//     console.warn('tag found', tag)
//     setTagId(tag.id) 
// });
// await NfcManager.registerTagEvent(); 

    } */

    // ***************************************
    useEffect(() => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        console.warn('tag found', tag.id)
        setTagId(tag.id)
      })
  
      return () => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      }
    }, [])
  
  
    const readTag = async () => {
      await NfcManager.registerTagEvent();
      if (Platform.OS === 'android') {
        ScanPromptRef.current.setVisible(true)
      }
       }

    const cancelReadTag = async () => {
      await NfcManager.unregisterTagEvent();
   
    }
    // ******************************************

   return (
 
             <View style={styles.wrapper}>
          <Text style={styles.titleText} >NFC Reader</Text>
<TouchableOpacity style={styles.btn} onPress={readTag}>
    <Text>START</Text>
</TouchableOpacity>
<ScanPrompt ref={ScanPromptRef} />
<TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={cancelReadTag}>
        <Text style={{ color: "white" }}>Cancel Scan</Text>
      </TouchableOpacity>
<Text>What you've been looking for: {tagId}</Text>
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
},
btnCancel: {
  margin: 15,
  padding: 15,
  borderRadius: 8, 
  backgroundColor: 'pink'
  }
});

export default Reader;
