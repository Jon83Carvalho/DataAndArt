import React,{useState,useEffect} from 'react';


import {interpolateNumber,extent,scaleBand,scaleLinear,select,selectAll,format} from 'd3';


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

  
  
  

  
 
  
  useEffect(
    ()=>{
      
      const screenheight=+select("#root").style("height").slice(0,-2)
      const screenwidth=+select("#root").style("width").slice(0,-2)

      const innerHeight=screenheight-marginTop-marginBottom;
      const innerWidth=screenwidth-marginLeft-marginRight;
      const centerX=innerWidth/2;
      const centerY=innerHeight/2;
      
     
      const data_complete=data.map((d,i)=>{
         return {
        "order":JSON.parse(Object.values(d)[0]).Order,
        "price":parseFloat(Object.keys(d)[0]),
        "volume":JSON.parse(Object.values(d)[0]).Volume, 
        "price_str":Object.keys(d)[0],
        "previous":JSON.parse(Object.values(d)[0]).Previous
        }
      }).sort((a,b)=>a.order-b.order)

      

      
      //escala Y
  
      const data_string=data_complete.map(d=>d.price_str).sort((a,b)=>b-a)
      const sizey=scaleBand()
      .domain(data_string)
      .range([10,innerHeight])



      //escala X  
      const sizex=scaleLinear()
      .domain(extent(data_complete,d=>d.volume))
      .range([10,innerWidth])
  

      const g=select("#animation");
      const g1=select("#static");

      const f=format(".4f")  

      console.log(data_complete)
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
        .attr("fill-opacity",0)
        .text(d=>d.price)
        .transition()
          .attr("fill-opacity",1)
        ,
        update=>
        update
        .transition()
        .text(d=>d.price)
         .duration(5000)
         .attr('y', (d,i)=>sizey(d.price_str))
         )
          
      

      g.selectAll("text")
      .data(data_complete)
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
    //  .attr('x', (d,i)=>200+sizex(d.volume))
      .attr('x',0)
      .attr('y', (d,i)=>sizey(d.price_str))
      .attr('id', "value")
      .style('fill',"black")
      .attr("fill-opacity",0)
      .text(f(0))
          .transition()
          .attr("fill-opacity",1)
          .duration(5000)
          .attr('x', (d,i)=>200+sizex(d.volume))
          .attr('y', (d,i)=>sizey(d.price_str))
          .textTween((d) => t =>{

            const i=interpolateNumber(0,d.volume) 
            return `${f(i(t))}`
          }),
      update=>
      update
        .transition()
        .attr("fill-oppacity","1")
        .duration(5000)
        .attr('x', (d,i)=>200+sizex(d.volume))
        .attr('y', (d,i)=>sizey(d.price_str))
        .textTween((d) => t =>{
          
          const i=interpolateNumber(d.previous,d.volume) 
          return `${f(i(t))}`
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
