import React from 'react'; 
import {range} from 'd3';
import { TouchableOpacity, Text } from 'react-native';


import {Viz1} from './Viz1';
import { View } from 'react-native';

const image={uri:"https://github.com/Jon83Carvalho/DataAndArt/blob/main/eye.jpg?raw=true"};

const circleRadius=30;

const array=range(1);

const width=960; 
const height=500;
const margin={
  top:0,
  right:0,
  bottom:0,
  left:0
};
const xAxislabelOffset=70;
const yAxislabelOffset=50;




export function Art1({navigation}) {
    return (
      <View width={width} style={{ justifyContent: 'center', alignItems: 'left' ,marginHorizontal: 20}}>
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: '#6667AB',
            padding: 10,
            borderRadius: 5,
            zIndex: 1000
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>☰ Menu</Text>
        </TouchableOpacity>
       <>
  <Viz1
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    
    />
 </>

      </View>
    );
  }
  