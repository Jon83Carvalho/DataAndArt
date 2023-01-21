import {Viz2} from './Viz2'
import React, {useState,useRef} from 'react'
import {select} from 'd3';
import { View, Text,Button, TouchableOpacity } from 'react-native';
import {useData_stock} from './useData_stock'


import {
  useFonts,
  YanoneKaffeesatz_200ExtraLight,
  YanoneKaffeesatz_300Light,
  YanoneKaffeesatz_400Regular,
  YanoneKaffeesatz_500Medium,
  YanoneKaffeesatz_600SemiBold,
  YanoneKaffeesatz_700Bold,
} from '@expo-google-fonts/yanone-kaffeesatz';


localStorage.removeItem('pdata');
localStorage.removeItem('firstdisplay');


import useSWR from 'swr';

import { laggy } from './laggy';
import axios from 'axios';

const screenwidth=+select("#root").style("width").slice(0,-2)
const screenheight=+select("#root").style("height").slice(0,-2)

console.log("width:",screenwidth,"height:",screenheight)

const size_unit_w=screenwidth/20
const size_unit_h=screenheight/20

const aspect_ratio=5;


const margin={
  top:size_unit_h,
  right:size_unit_w*7.4,
  bottom:size_unit_h*3,
  left:size_unit_w
};


export function Art3() {
    
  const [start, setStart] = useState(false);
  const dataused=useRef()
 
    
    let [fontsLoaded] = useFonts({
      YanoneKaffeesatz_200ExtraLight,
      YanoneKaffeesatz_300Light,
      YanoneKaffeesatz_400Regular,
      YanoneKaffeesatz_500Medium,
      YanoneKaffeesatz_600SemiBold,
      YanoneKaffeesatz_700Bold,
    })
  
    
    
  
    
    const svgRef = useRef();
    
    const {data,data2}=useData_stock();
    
    const [dataUsed,setdataUsed]=useState([{data1:"data"}])

  

 
    
  if (!data||!data2 || !fontsLoaded) 
  {
    return <div>
            <Text>Carregando...</Text>
           </div>
  }
  
  
  
   
    return (
      <React.Fragment>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
        
      
      <Viz2
      data={start ? dataUsed : data}
      data2={data2} 
      svgRef={svgRef}
      marginTop={margin.top}
      marginRight={margin.right}
      marginBottom={margin.bottom}
      marginLeft={margin.left}
 />
        
       
      
      </View>
      <View 
      style={{
        position:'absolute',
        top:(screenheight-size_unit_h*10/aspect_ratio)/2,
        right:(screenwidth-size_unit_h*10)/2,
        width:size_unit_h*10,
        height:size_unit_h*10/aspect_ratio,
        opacity:"70%"

        }}
      >
        <TouchableOpacity
        style={{
        backgroundColor:start ? "#880000" : "#006600",
        activeOpacity:0.80,
        width:size_unit_h*10,
        height:size_unit_h*10/aspect_ratio,
        shadowColor: 'rgba(255,255,255, .8)', // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 20, //IOS
        borderRadius:10
      }}
      onPress={() => {
        
        setStart(!start)
        setdataUsed(data2)

        }
    }  
        >
          <Text style={{
            textAlign:'center',
            color:'white',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: size_unit_h/1.2,
            marginTop: size_unit_h*10/aspect_ratio/2.8,
            fontFamily:'YanoneKaffeesatz_400Regular'
          }}>
          {start ? "The War!" : "Before the War!"}
          </Text>
        
        </TouchableOpacity>
        
      </View>
      <View 
      style={{
        position:'absolute',
        top:(screenheight-size_unit_h*20/aspect_ratio),
        right:(screenwidth-size_unit_h*10)/2,
        width:size_unit_h*10,
        height:size_unit_h*10/aspect_ratio,
        opacity:"100%"
      }}>
   <Text  href="https://www.linkedin.com/in/jonascarvalhoeng" 
        style={{
            textAlign:'center',
            color:'white',
            alignItems: 'center',
            fontWeight: 'light',
            fontSize: size_unit_h/2.2,
            marginTop: size_unit_h*15/aspect_ratio/2.8,
            fontFamily:'YanoneKaffeesatz_400Regular'
          }}>
          Developed by Jonas Carvalho 22th Aug 2022
          </Text>
      </View>
      </React.Fragment>
      
    );
  }