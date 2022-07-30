import { scrollView, Text,ImageBackground, StyleSheet} from 'react-native';
import React from 'react'; 
import {range} from 'd3';


import {Viz2} from './Viz2';

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




export function Art3() {
    return (
      <scrollView width={width} style={{ justifyContent: 'center', alignItems: 'left' ,marginHorizontal: 20}}>
      
       <>
  <Viz2
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

      </scrollView>
    );
  }
 