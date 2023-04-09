import { scrollView, Text,ImageBackground, StyleSheet} from 'react-native';
import React from 'react'; 
import {range} from 'd3';
import useSWR from 'swr';
import { useRef } from 'react';
import {csvParse} from 'd3';

import {Viz4} from './Viz4';


import axios from 'axios';



const image={uri:"https://github.com/Jon83Carvalho/DataAndArt/blob/main/eye.jpg?raw=true"};

const circleRadius=30;

const array=range(1);

const width="100%"; 
const height="100%";
const margin={
  top:100,
  right:400,
  bottom:200,
  left:100
};
const xAxislabelOffset=70;
const yAxislabelOffset=50;

export function Art4() {
 
  //START - variable declaration=========================================
  const rawdata=[{28000:'{"Volume":0.1}'}]; 
  var csvUrl
  csvUrl='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/LoveWord.csv'
  const previousdata = useRef();
  const respdata=useRef()
  //END - variable declaration=========================================
  
  //START - reading data===============================
  const fetcher = (url) => {
    
    //const request= axios.get(url).then(res=>res.data)
    //const resp= request
    
    //const respo = axios.get('http://127.0.0.1:8000/').then(res=>res.data[0].loveword)
    const respo = axios.get('http://127.0.0.1:8000/').then(res=>res.data)

    return respo;
  };

  const {data} = useSWR(csvUrl,fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount:true,
    refreshInterval: 5000,

    
  })


  previousdata.current=localStorage.getItem('cdata')
  
  if (previousdata.current===null){
    localStorage.setItem('pdata',`Volume\n${rawdata[0].Volume}`);
    localStorage.setItem('firstdisplay',`0`);
    
    previousdata.current=localStorage.getItem('pdata');
  }
  
  previousdata.current=csvParse(previousdata.current,
    (d)=>{
      //d=+d;
       return d}
       )

       if(!data){
   
        return <pre>...loading</pre>;
      };
      
      
      
      
      respdata.current=data
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
  