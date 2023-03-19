import { scrollView, Text,ImageBackground, StyleSheet} from 'react-native';
import React from 'react'; 
import {range} from 'd3';
import useSWR from 'swr';
import { useRef } from 'react';
import {csvParse} from 'd3';

import {Viz4} from './Viz4';

import { laggy } from './laggy';
import axios from 'axios';



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

export function Art4() {
 
  //START - variable declaration=========================================
  const rawdata=[{"count":5000,"max":0},{"count":5000,"max":100}]; 
  var csvUrl
  csvUrl='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/LoveWord.csv'
  const previousdata = useRef();
  const respdata=useRef()
  //END - variable declaration=========================================
  
  //START - reading data===============================
  const fetcher = (url) => {
    
    const request= axios.get(url).then(res=>res.data)
    const resp= request
    
    const respo = axios.get('http://127.0.0.1:8000/').then(res=>res.data[0].loveword)
     
    return respo;
  };

  const {data} = useSWR(csvUrl,fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount:true,
    refreshInterval: 10000,

    
  })


  previousdata.current=localStorage.getItem('cdata')
  
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

       if(!data){
   
        return <pre>...loading</pre>;
      };
      
      
      
      
      respdata.current=JSON.parse(data)
  //FINISH - reading data===============================

    return (
      
  <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    
    />
    );
  }
  