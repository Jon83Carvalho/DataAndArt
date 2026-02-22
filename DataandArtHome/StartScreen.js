import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    im: {
        height:'100vh',
        width:'100vw'
    },
});

export default function StartScreen ({navigation}) {
    return (
        <View style={styles.container} name="Data and Art">
            <Pressable style={styles.button} onPress={()=>{navigation.navigate("Art Gallery")}}>
          <Image
            style={styles.im} 
            source={require("./assets/StartScreen.jpg")}
            resizeMode="cover"
            />
        </Pressable>
        </View>
    )
}
