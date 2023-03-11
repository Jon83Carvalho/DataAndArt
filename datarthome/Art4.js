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


//KAFKA

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'stock-view-app',
  brokers: ['aa4908a7571c44b3097172c2e89017bf-964543852.us-east-2.elb.amazonaws.com:9092'],
})
const topic='stock-output'
const consumer = kafka.consumer({ groupId: 'stock-view-app' })


const run= async ()=>{
    await consumer.connect()
    await consumer.subscribe({ topic: 'stock-output', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
}

run().catch(async error=> {
  
  console.error(error)
try {
await consumer.disconnect()
} catch (e) {
console.error('Failed to gracefully disconnect consumer', e)
}
process.exit(1)
})


//KAFKA

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
    const g_id="stock-view-app"

    

    return resp;
  };

  const {data} = useSWR(csvUrl,fetcher,{
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount:true,
    refreshInterval: 1000,
    use:[laggy]
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
  