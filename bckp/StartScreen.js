import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    im: {
        width:'100vw',
        height:'100vh'
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 0,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#fffff',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
    

});

export default function StartScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Content")}}>
          <Image
            style={styles.im} 
            source={require("./assets/StartScreen.jpg")}/>
        </TouchableOpacity>
        </View>
    )
}

