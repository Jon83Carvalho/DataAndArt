import React,{memo,useState,useCallback,useEffect,useRef} from 'react';
import ReactDOM from 'react-dom';

import {scaleLog,log,select,scaleOrdinal,extent,format,csv,scaleBand,scaleLinear} from 'd3';

import {randArray} from './randArray'


import {StockMarks} from './StockMarks'
import {ColorLegend} from './ColorLegend'
import {SizeLegend} from './SizeLegend'



const image={uri:"https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/eye.png"};


const styles = {
  baseText: {
    fill: "darkgrey",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"12"
  },
  titText: {
    fill: "#DD7788",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"2.3em"
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
    backgroundColor:"#444",
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


export const Viz2=({data,data2,marginTop,marginRight,marginBottom,marginLeft})=>{
  
  const width=+select("#root").style("width").slice(0,-2)
  const height=+select("#root").style("height").slice(0,-2)
  
  const innerHeight=height-marginTop-marginBottom;
  const innerWidth=width-marginLeft-marginRight;
 
  
  

  const xValue=(d)=>d.size;
  const rValue=(d)=>d.timestamp;
 
  const yValue=d=>d.price;
  const fadeOpacity=0.2;
  const larr=[];

  const xAxistickFormat=tickvalue=>siFormat(tickvalue).replace('G','Bi');
  
 
  const rScale = scaleLinear()
		.domain([0,Math.log10(extent(data,rValue)[1])])
  	.range([0, innerHeight]);
  
  
  
 const xScale=scaleLinear()
  	.domain([0,Math.log10(extent(data,xValue)[1])])
  	.range([0,innerWidth]);
  
	const yScale=scaleLinear()
  .domain(extent(data,yValue))
  .range([0, innerHeight])
  
  const colorValue=d=>d.Symbol;
  
   const colorScale=scaleOrdinal()
  	.domain(data.map(colorValue))
    .range(["#bebada","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f","#ffffb3","#8dd3c7","#fb8072","#80b1d3","#fdb462"])
   
  	
  const rfactor=1.7
  
useEffect(()=>{
  const g=select("g");
 
  g.selectAll('circle')
    .data(data)
    .join(enter=>
      enter.append("circle")
    .attr('class', "mark")
    .attr('cx', (d,i)=>`${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))}`)
    .attr('cy', (d,i)=>`${yScale(yValue(d))}`)
    .attr('r',"0.1")
    .attr('opacity',"0")
    .attr('fill',(d,i)=> `${colorScale(colorValue(d))}`)
    .transition()
        .delay((d,i)=>i*0.5)
        .duration(3000)
        .attr('opacity',"0.5")
        .attr('r',(d,i)=>`${isNaN(rScale(Math.log10(rValue(d))))?0:rScale(Math.log10(rValue(d)))*0.02}`),
    update=>
    update
    .transition()
        .delay((d,i)=>i*0.5)
        .duration(3000)
        .attr('cx', (d,i)=>`${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))}`)
        .attr('cy', (d,i)=>`${yScale(yValue(d))}`)
        .attr('r',(d,i)=>`${isNaN(rScale(Math.log10(rValue(d))))?0:rScale(Math.log10(rValue(d)))*0.02}`),
    exit=>
    exit
    .transition()
        .delay((d,i)=>i*0.5)
        .duration(3000) 
        .attr('r',"0")   
    
        
    )
  
 },[data]);

  return (
 <React.Fragment>
  <svg width={width} height={height} style={{backgroundColor:"#4d4a4a"}}>
  
   <g transform={`translate(${marginLeft},${marginTop})`}>


</g>

 
</svg>
</React.Fragment>

  
);
};  
