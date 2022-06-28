import React,{memo,useState,useCallback,useEffect} from 'react';


import {scaleOrdinal,extent,format,csv,scaleBand,scaleLinear,max,ascending,descending,cos,sin,min} from 'd3';
import {useData} from './useData'
import {randArray} from './randArray'


import {Marks} from './Marks'
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


export const Viz1=({yAxislabelOffset,xAxislabelOffset,width,height,marginTop,marginRight,marginBottom,marginLeft})=>{
  const data=useData();
  const rand=randArray();
  const [hoveredValue,setHoveredValue]=useState(null)

  
   if(!data){
   
  	return <pre>...loading</pre>;
  };
  
    if(!rand){
   
  	return <pre>...loading</pre>;
  };
  
  
  const innerHeight=height-marginTop-marginBottom;
  const innerWidth=width-marginLeft-marginRight;
  const centerX=innerWidth/2;
  const centerY=innerHeight/2;
  
  
  const xValue=d=>d.Corrup;

 
  const yValue=d=>d.Gap;
  const fadeOpacity=0.2;
  const larr=[];

  rand.map((d,i)=>larr.push(Math.PI*rand[i].number))
  

  const xAxistickFormat=tickvalue=>siFormat(tickvalue).replace('G','Bi');
  
 
  const rScale = scaleLinear()
		.domain(extent(data,yValue))
  	.range([0, innerHeight]);
  
  
  
 const radialScale = scaleLinear()
		.domain(extent(data,xValue))
  	.range([0, innerHeight]);

  
  const xScale=scaleLinear()
  	.domain(extent(data,xValue))
  	.range([0,innerWidth]);
  
	const yScale=scaleLinear()
  .domain(extent(data,yValue))
  .range([0, innerHeight])
  
  const colorValue=d=>d.Corrup;
  
   const colorScale=scaleOrdinal()
  	.domain(data.sort(function(a, b){return a.Corrup-b.Corrup}).map(d=>d.Corrup))
  	.range(["#23171b","#271a28","#2b1c33","#2f1e3f","#32204a","#362354","#39255f","#3b2768","#3e2a72","#402c7b","#422f83","#44318b","#453493","#46369b","#4839a2","#493ca8","#493eaf","#4a41b5","#4a44bb","#4b46c0","#4b49c5","#4b4cca","#4b4ecf","#4b51d3","#4a54d7","#4a56db","#4959de","#495ce2","#485fe5","#4761e7","#4664ea","#4567ec","#446aee","#446df0","#426ff2","#4172f3","#4075f5","#3f78f6","#3e7af7","#3d7df7","#3c80f8","#3a83f9","#3985f9","#3888f9","#378bf9","#368df9","#3590f8","#3393f8","#3295f7","#3198f7","#309bf6","#2f9df5","#2ea0f4","#2da2f3","#2ca5f1","#2ba7f0","#2aaaef","#2aaced","#29afec","#28b1ea","#28b4e8","#27b6e6","#27b8e5","#26bbe3","#26bde1","#26bfdf","#25c1dc","#25c3da","#25c6d8","#25c8d6","#25cad3","#25ccd1","#25cecf","#26d0cc","#26d2ca","#26d4c8","#27d6c5","#27d8c3","#28d9c0","#29dbbe","#29ddbb","#2adfb8","#2be0b6","#2ce2b3","#2de3b1","#2ee5ae","#30e6ac","#31e8a9","#32e9a6","#34eba4","#35eca1","#37ed9f","#39ef9c","#3af09a","#3cf197","#3ef295","#40f392","#42f490","#44f58d","#46f68b","#48f788","#4af786","#4df884","#4ff981","#51fa7f","#54fa7d","#56fb7a","#59fb78","#5cfc76","#5efc74","#61fd71","#64fd6f","#66fd6d","#69fd6b","#6cfd69","#6ffe67","#72fe65","#75fe63","#78fe61","#7bfe5f","#7efd5d","#81fd5c","#84fd5a","#87fd58","#8afc56","#8dfc55","#90fb53","#93fb51","#96fa50","#99fa4e","#9cf94d","#9ff84b","#a2f84a","#a6f748","#a9f647","#acf546","#aff444","#b2f343","#b5f242","#b8f141","#bbf03f","#beef3e","#c1ed3d","#c3ec3c","#c6eb3b","#c9e93a","#cce839","#cfe738","#d1e537","#d4e336","#d7e235","#d9e034","#dcdf33","#dedd32","#e0db32","#e3d931","#e5d730","#e7d52f","#e9d42f","#ecd22e","#eed02d","#f0ce2c","#f1cb2c","#f3c92b","#f5c72b","#f7c52a","#f8c329","#fac029","#fbbe28","#fdbc28","#feb927","#ffb727","#ffb526","#ffb226","#ffb025","#ffad25","#ffab24","#ffa824","#ffa623","#ffa323","#ffa022","#ff9e22","#ff9b21","#ff9921","#ff9621","#ff9320","#ff9020","#ff8e1f","#ff8b1f","#ff881e","#ff851e","#ff831d","#ff801d","#ff7d1d","#ff7a1c","#ff781c","#ff751b","#ff721b","#ff6f1a","#fd6c1a","#fc6a19","#fa6719","#f96418","#f76118","#f65f18","#f45c17","#f25916","#f05716","#ee5415","#ec5115","#ea4f14","#e84c14","#e64913","#e44713","#e24412","#df4212","#dd3f11","#da3d10","#d83a10","#d5380f","#d3360f","#d0330e","#ce310d","#cb2f0d","#c92d0c","#c62a0b","#c3280b","#c1260a","#be2409","#bb2309","#b92108","#b61f07","#b41d07","#b11b06","#af1a05","#ac1805","#aa1704","#a81604","#a51403","#a31302","#a11202","#9f1101","#9d1000","#9b0f00","#9a0e00","#980e00","#960d00","#950c00","#940c00","#930c00","#920c00","#910b00","#910c00","#900c00","#900c00","#900c00"]);
  
  const rfactor=1.7
  
 
  
  return (


  <svg width={width} height={height} style={{backgroundColor:"#222367"}}>
    
      <g transform={`translate(${marginLeft},${marginTop})`}>
      
      
        

        <g transform={`translate(${innerWidth-250},70)`}>



          <text 
            x={-650}
            y={-20}
            style={{
              fill:styles.titText.fill,
              fontFamily: styles.titText.fontFamily,
              fontSize:styles.titText.fontSize
            }}
            
            >
          Internet Gender Gap Vs 
            <tspan x="-650" y="15">Corruption Perception</tspan>
          </text>
          <text 
            x={-650}
            y={5}
            style={{
              fill:styles.baseText.fill,
              fontFamily: styles.baseText.fontFamily,
              fontSize:"15"
            }}
            
            >
            <tspan x="-650" y="40" style={{fontSize:"25"}}>Roll over or click on the circles </tspan>
            <tspan x="-650" y="65" style={{fontSize:"25"}}>to see countries details</tspan>
            <tspan x="-650" y="80" >Source:</tspan>
            <tspan x="-650" y="93" >
              <a 
                href="https://research.facebook.com/data/#data-for-good"
                target="_blank">
                https://research.facebook.com/data/#data-for-good
              </a></tspan>
            
          </text>
          <text 
            x={-650}
            y={300}
            style={{
              fill:styles.baseText.fill,
              fontFamily: styles.baseText.fontFamily,
              fontSize:styles.baseText.fontSize
            }}
            >
            <tspan x="-650" y="260" style={{fontSize:"20"}}>Internet Gender Gap</tspan>
            <tspan x="-650" y="280" >This measures the gap between male</tspan>
            <tspan x="-650" y="290" >and female access to the Internet</tspan>
            <tspan x="-650" y="300" >(% male access - % female access / % male access). </tspan>
            <tspan x="-650" y="310" >Positive values indicate that male access</tspan>
            <tspan x="-650" y="320" >exceeds female access. </tspan>
            <tspan x="-650" y="330" >A smaller or negative gap indicates</tspan>
            <tspan x="-650" y="340" >greater female connectivity. </tspan>
                        </text>

          <text 
            x={-650}
            y={300}
            style={{
              fill:styles.baseText.fill,
              fontFamily: styles.baseText.fontFamily,
              fontSize:styles.baseText.fontSize
            }}
            
            >
            <tspan x="-650" y="360" style={{fontSize:"20"}}>Corruption Perception</tspan>
            <tspan x="-650" y="375" >Compiled by Transparency International, measures the perceived</tspan>
            <tspan x="-650" y="385" >levels of public-sector corruption worldwide.</tspan>
            </text>
          
          <text 
            x={-35}
            y={-20}
            style={{
              fill:styles.baseText.fill,
              fontFamily: styles.baseText.fontFamily,
              fontSize:"20"
            }}
            >Corruption Perception
          </text>
          
          <text 
            x={-200}
            y={410}
            style={{
              fill:styles.baseText.fill,
              fontFamily: styles.baseText.fontFamily,
              fontSize:"15",
              textAnchor:"middle"
            }} >
            <tspan >Created by Jonas Carvalho Feb. 19th 2022</tspan>
          </text>
          <text 
            x={0}
            y={5}
            style={{fill:styles.baseText.fill,fontFamily: styles.baseText.fontFamily,fontSize:20}}
          >- More Corrupt
          </text>
          <text 
            x={-0}
            y={353}
            style={{fill:styles.baseText.fill,fontFamily: styles.baseText.fontFamily,fontSize:20}}
          >- Less Corrupt
          </text>


          <ColorLegend
          colorScale={colorScale}
          tickTextOffset={20}
          tickSpace={30}
          tickSize={10}
          innerWidth={innerWidth}
          data={data}
          /></g>
        <g transform={`translate(${innerWidth-150},130)`}>
          <text 
            x={-35}
            y={-20}
            style={{fontSize:"20",fill:styles.baseText.fill,fontFamily: styles.baseText.fontFamily}}
            >Internet Gender Gap</text>
          <SizeLegend
      
          tickTextOffset={30}
          tickSpace={30}
          tickSize={10}
          innerWidth={innerWidth}
            data={data}
            rScale={rScale}
            yValue={yValue}
            rfactor={rfactor}
          /></g>
         <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale}
          rScale={rScale}
          radialScale={radialScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxistickFormat}
          centerX={centerX}
          centerY={centerY}
          colorValue={colorValue}
          colorScale={colorScale}
          onHover={setHoveredValue}
          hoveredValue={hoveredValue}
          fadeOpacity={fadeOpacity}
           larr={larr}
           rfactor={rfactor}
        />



       </g>
      
        
 	</svg>
);
};  
