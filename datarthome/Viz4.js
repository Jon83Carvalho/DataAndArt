import React,{useState,useEffect} from 'react';


import {interpolateNumber,scaleOrdinal,extent,format,csv,scaleBand,scaleLinear,max,ascending,descending,cos,sin,min, select,selectAll} from 'd3';


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


export const Viz4=({yAxislabelOffset,xAxislabelOffset,width,height,marginTop,marginRight,marginBottom,marginLeft,data})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)

  const innerHeight=height-marginTop-marginBottom;
  const innerWidth=width-marginLeft-marginRight;
  const centerX=innerWidth/2;
  const centerY=innerHeight/2;
  
  
  const xValue=d=>d.Corrup;

 
  const yValue=d=>d.Gap;
  const fadeOpacity=0.2;
  const larr=[];

  const xAxistickFormat=tickvalue=>siFormat(tickvalue).replace('G','Bi');


  
  useEffect(
    ()=>{
      

      

      const data_complete=data.map(d=>{
        return {
        "price":parseFloat(Object.keys(d)[0]),
        "volume":JSON.parse(Object.values(d)[0]).Volume, 
        "price_str":Object.keys(d)[0]
      }
      }).sort((a,b)=>b.price_str-a.price_str)

      
      //escala Y
  

      const data_string=data_complete.map(d=>d.price_str).sort((a,b)=>b-a)
      const sizey=scaleBand()
      .domain(data_string)
      .range([10,innerWidth])



      //escala X  
      const sizex=scaleLinear()
      .domain(extent(data_complete,d=>d.volume))
      .range([10,innerWidth])

      
      console.log(sizey(data_complete[4].price_str))

      const g=select("#animation");
      const g1=select("#static");


     //Ler os preços e criar escala



      g1.selectAll("text")
        .data(data_complete)
        .join(
        enter=>
        enter
        .append("text")
        .attr('x', "100")
        .attr('y', (d,i)=>sizey(d.price_str))
        .style('fill',"black")
        .attr('id', "price")
        .text(d=>d.price),
        update=>
        update
        .transition()
        .text(d=>d.price)
         .duration(5000)
         .attr('y', (d,i)=>sizey(d.price_str))
         )
          
      

      g.selectAll("text")
      .data(data_complete.sort((a,b)=>a.price-b.price))
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
      .attr('x', (d,i)=>200+sizex(d.volume))
      .attr('y', (d,i)=>sizey(d.price_str))
      .attr('id', "value")
      .style('fill',"black")
      .text((d,i)=>d.volume)
          .transition()
          .attr("fill-oppacity","1")
          .duration(5000)
          .attr('x', (d,i)=>200+sizex(d.volume))
          .attr('y', (d,i)=>sizey(d.price_str))
          .textTween((d) => t =>{
            const i=interpolateNumber(g.selectAll("#value").node().textContent,d.volume) 
            return `${i(t)}`
          }),
      update=>
      update
        .transition()
        .attr("fill-oppacity","1")
        .duration(5000)
        .attr('x', (d,i)=>200+sizex(d.volume))
        .attr('y', (d,i)=>sizey(d.price_str))
        .textTween((d) => t =>{
          const i=interpolateNumber(g.selectAll("#value").node().textContent,d.volume) 
          return `${i(t)}`
        })
        
      )

      
  
      },[data]);
 
  
  return (


  <svg width={innerWidth} height={innerHeight} style={{backgroundColor:"#66679G"}}>
    
      <g transform={`translate(${marginLeft},${marginTop})`}>
      
      
        
        <g id="static" transform={`translate(0,70)`}>
        </g>
        
        <g transform={`translate(0,70)`} id="animation">
        
        </g>
        <g transform={`translate(0,70)`} >
          <text 
            x="0"
            y="0"
            
            style={{
              fill:styles.titText.fill,
              fontFamily: styles.titText.fontFamily,
              fontSize:styles.titText.fontSize
            }}
            
            >
            Crypto Coins Values Vs Volume 
          
          </text>
        </g>
        


       </g>
      
        
 	</svg>
);
};  
