import {Viz2} from './Viz2'
import React, {useState,useRef} from 'react'
import {csvParse} from 'd3';
import { View, Text } from 'react-native';
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
const margin={
  top:30,
  right:50,
  bottom:80,
  left:50
};

export function Art3() {
    
  const [start, setStart] = useState(false);
 
    
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
      
  
  
  
    
  if (!data||!data2 || !fontsLoaded) 
  {
    return <div>
            <Text>Carregando...</Text>
           </div>
  }
  

  
  
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <>
       <button onClick={() => setStart(!start)}>
        {start ? "Before the War" : "The War!"}
      </button>
      <Viz2
      data={data}
      data2={data2} 
      svgRef={svgRef}
      marginTop={margin.top}
      marginRight={margin.right}
      marginBottom={margin.bottom}
      marginLeft={margin.left}
 />
        
      </>
      
      </View>
      
    );
  }