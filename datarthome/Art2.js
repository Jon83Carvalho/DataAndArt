import {Viz} from './Viz'
import React, {useState,useRef} from 'react'
import {csvParse} from 'd3';
import { View, Text } from 'react-native';
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

export function Art2() {
    const rawdata=[{"count":5000,"max":0},{"count":5000,"max":100}];
  
    var csvUrl
    csvUrl='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/LoveWord.csv'
    
    let [fontsLoaded] = useFonts({
      YanoneKaffeesatz_200ExtraLight,
      YanoneKaffeesatz_300Light,
      YanoneKaffeesatz_400Regular,
      YanoneKaffeesatz_500Medium,
      YanoneKaffeesatz_600SemiBold,
      YanoneKaffeesatz_700Bold,
    })
  
    const fetcher = (url) => {
    
      const request= axios.get(url).then(res=>res.data)
      const resp= request
    
      return resp;
    };
  
    
    const iteration=useRef()
    const [start, setStart]   = useState(false);
    const previousdata = useRef();
    const respdata=useRef()
    
    const svgRef = useRef();
    
  
    const {data} = useSWR(csvUrl,fetcher,{
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount:true,
      refreshInterval: 1000,
      use:[laggy]
    })
  
  
  previousdata.current=localStorage.getItem('pdata')
  
  if (previousdata.current===null){
    localStorage.setItem('pdata',`count,max\n${rawdata[0].count},${rawdata[0].max}`);
    localStorage.setItem('firstdisplay',`0`);
    
    previousdata.current=localStorage.getItem('pdata');
  }
  
  previousdata.current=csvParse(previousdata.current,
    (d)=>{
      d.max=+d.max;
       return d}
       )
    
  if (!data || !fontsLoaded) {return <div>
  <Text>Carregando</Text>
        </div>}
  
  respdata.current=data
  
  localStorage.setItem('pdata', `count,max\n${respdata.current.count},${respdata.current.max}`);
  
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <>
      <Viz x={respdata.current.max} svgRef={svgRef} previousx={previousdata.current[0].max}/>
        
      </>
      </View>
    );
  }