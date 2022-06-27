import React,{useState,useCallback,useEffect} from 'react';
import {csv,descending,max,min} from 'd3';

const csvUrl='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/int_index.csv';

export const useData=()=>{
  const [data,setData]=useState(null);
   useEffect(()=>{
    
    const row=d=>{
       return d;
    };
    csv(csvUrl,row).then(setData);
    
  },[]);

 
	return data
}
