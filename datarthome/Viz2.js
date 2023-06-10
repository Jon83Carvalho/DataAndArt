import React,{useEffect} from 'react';

import {select,scaleOrdinal,extent,scaleLinear} from 'd3';





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
  	.range([0, innerHeight>innerWidth?innerWidth:innerHeight]);
  
  
  
 const xScale=scaleLinear()
  	.domain([0,Math.log10(extent(data,xValue)[1])])
  	.range([0,innerWidth]);
  
	const yScale=scaleLinear()
  .domain(extent(data,yValue))
  .range([0, innerHeight])
  
  const colorValue=d=>d.Symbol;
  
   const colorScale=scaleOrdinal()
  	.domain(data.map(colorValue))
    .range(["#ff4040","#e78d0b","#a7d503","#58fc2a","#18f472","#00bfbf","#1872f4","#582afc","#a703d5","#e70b8d","#ff4040"])
   
  	
  const rfactor=1.7
  const ry_fact=3.0
  const dur=20000
  
useEffect(()=>{
  const g=select("g");
 
  g.selectAll('ellipse')
    .data(data)
    .join(enter=>
      enter.append("ellipse")
    .attr('class', "mark")
    .attr('cx', (d,i)=>`${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))}`)
    .attr('cy', (d,i)=>`${yScale(yValue(d))}`)
    .attr('rx',"0.5")
    .attr('ry',ry_fact)
    .attr('opacity',"0.1")
    .attr('fill',(d,i)=> `${colorScale(colorValue(d))}`)
    .transition()
        .delay((d,i)=>i*2)
        .duration(dur)
        .attr('opacity',"0.3")
        .attr('rx',(d,i)=>`${isNaN(rScale(Math.log10(rValue(d))))?0:rScale(Math.log10(rValue(d)))*0.07}`)
        .attr('ry',ry_fact)
        .attr("transform",(d,i)=>`rotate(${20+6*Math.random()}, ${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))},${yScale(yValue(d))})`),
        
    update=>
    update
    .transition()
        .delay((d,i)=>i*2)
        .duration(dur)
        
        .attr('cx', (d,i)=>`${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))}`)
        .attr('cy', (d,i)=>`${yScale(yValue(d))}`)
        .attr('rx',(d,i)=>`${isNaN(rScale(Math.log10(rValue(d))))?0:rScale(Math.log10(rValue(d)))*0.07}`)
        .attr('ry',ry_fact)
        .attr("transform",(d,i)=>`rotate(${20+6*Math.random()}, ${isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))},${yScale(yValue(d))})`),
        
    exit=>
    exit
    .transition()
        .delay((d,i)=>i*2)
        .duration(dur) 
        .attr('rx',"0")
        .attr('ry',"0")    
    
        
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
