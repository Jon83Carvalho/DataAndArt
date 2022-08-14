import { scrollView, Text,ImageBackground, StyleSheet} from 'react-native';
import React,{ useRef, useEffect } from 'react'; 
import {range} from 'd3';



import {Viz2} from './Viz2';

const image={uri:"https://github.com/Jon83Carvalho/DataAndArt/blob/main/eye.jpg?raw=true"};

const circleRadius=30;

const array=range(1);


const margin={
  top:30,
  right:50,
  bottom:80,
  left:50
};
const xAxislabelOffset=70;
const yAxislabelOffset=50;




export function Art3() {
    return (
   
  <Viz2
  
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    
  />
 

 
    )
  }
 