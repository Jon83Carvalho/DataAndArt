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
  
  console.log(data)

  
  useEffect(
    ()=>{
      const screenheight=+select("#root").style("height").slice(0,-2)
      const data_keys=data.map(d=>parseFloat(Object.keys(d)[0]))
      const data_complete=data.map(d=>{
        return {"price":parseFloat(Object.keys(d)[0]),"volume":JSON.parse(Object.values(d)[0]).Volume}
      })

      const sizey=scaleLinear()
      .domain(extent(data_keys))
      .range([screenheight,10])

      console.log(data_complete)

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
        .attr('y', (d,i)=>sizey(d.price))
        .style('fill',"black")
        .text(d=>d.price),
        update=>
        update
        .transition()
        .duration(5000)
        .attr('x', (d,i)=>d-100)

        )
      

      g.selectAll("text")
      .data(data)
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
      .attr('x', (d,i)=>d)
      .attr('y', (d,i)=>100+(i+1)*15)
      .attr('id', "value")
      .style('fill',"black")
      .text((d,i)=>d)
          .transition()
          .attr("fill-oppacity","1")
          .duration(5000)
          .textTween((d) => t =>{
            const i=interpolateNumber(g.selectAll("#value").node().textContent,d) 
            return `${i(t)}`
          }),
      update=>
      update
        .transition()
        .attr("fill-oppacity","1")
        .duration(5000)
        .attr('x', (d,i)=>d)
        .textTween((d) => t =>{
          const i=interpolateNumber(g.selectAll("#value").node().textContent,d) 
          return `${i(t)}`
        })
        
      )

      
  
      },[data]);
 
  
  return (


  <svg width={width} height={height} style={{backgroundColor:"#66679G"}}>
    
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
