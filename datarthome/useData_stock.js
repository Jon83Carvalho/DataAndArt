import React,{useState,useCallback,useEffect} from 'react';
import {csv,descending,max,min} from 'd3';

const data_stock_d1=require('./assets/day1.csv')

export const useData_stock=()=>{
  const [data,setData]=useState(null);
   useEffect(()=>{
    
    const row=d=>{
       return d;
    };
    csv(data_stock_d1,row).then(setData);
    
  },[]);

 
	return data
}
