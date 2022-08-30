import React,{useState,useCallback,useEffect} from 'react';
import {csv,descending,max,min} from 'd3';

const data_stock_d1=require('./assets/day1_g_2.csv')
const data_stock_d2=require('./assets/day2_g_2.csv')

export const useData_stock=()=>{
  const [data,setData]=useState(null);
  const [data2,setData2]=useState(null);
   useEffect(()=>{
    
    const row=d=>{
       return d;
    };
    csv(data_stock_d1,row).then(setData);
    csv(data_stock_d2,row).then(setData2);
    
  },[]);

  
	return {data,data2}
}
