import React from 'react'; 
import {range} from 'd3';
import useSWR from 'swr';
import { useRef } from 'react';
import {csvParse} from 'd3';

import {Viz4} from './Viz4';


import axios from 'axios';


/////////////////////////
const styles = {
  
  baseText: {
    fill: "darkgrey",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"12"
  },
  titText: {
    fill: "#DD7788",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"4.5vw"
  },
  innerText: {
    color:"#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"1.7rem"
  },
  container: {
    flex: 1,
  },
  image: {
    flex:1,
    resizeMode:"cover",
    width:"1450px",
    position:"relative",
    top:0,
    left:-200,
    backgroundColor:"#6667AB",
    opacity:"50%"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
 
};


///////////////////////


const image={uri:"https://github.com/Jon83Carvalho/DataAndArt/blob/main/eye.jpg?raw=true"};

const circleRadius=30;

const array=range(1);

const width="100%"; 
const height="100%";
const margin={
  top:100,
  right:400,
  bottom:200,
  left:10
};
const xAxislabelOffset=70;
const yAxislabelOffset=50;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function Art4() {
 
  //START - variable declaration=========================================
  const rawdata=[{28000:'{"Volume":0.1}'}]; 
  var csvUrl
  csvUrl='http://127.0.0.1:8000/'
  const previousdata = useRef();
  const respdata=useRef()
  //END - variable declaration=========================================
  
  //START - reading data===============================
  const fetcher = (url) => {
    
    
    const respo = axios.get(url).then(res=>res.data)
      
    
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
      
      
      
      
      respdata.current=data.trade_data
      

  //FINISH - reading data===============================

const sequence=data.count

  

      
   
    return (
<div id="root_svg" key={`main_div`} style={{"height": "100%"}}>
  <Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right+100}
    marginBottom={margin.bottom}
    marginLeft={margin.left}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    ichart={sequence[0]}
    iterate_plot={0}
    opac={1}
    gradType="barsGrad"
    coin="BTC/USD"
    />

<Viz4
    width={width}
    height={height}
    marginTop={margin.top}
    marginRight={margin.right}
    marginBottom={margin.bottom+100}
    marginLeft={margin.left+300}
    xAxislabelOffset={xAxislabelOffset}
    yAxislabelOffset={yAxislabelOffset}
    data={respdata.current}
    ichart={sequence[1]}
    iterate_plot={0}
    opac={0.6}
    gradType="barsGrad-2"
    coin="ETH/USD"
    />
</div>
   
      )}    
      
    
  