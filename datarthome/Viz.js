import React, { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import {selectAll,select,xml,scaleLinear,extent,range,max,min} from "d3";


const heart=  require('./assets/heart.svg')
const webfont=require('./assets/fonts/yane-font.woff2')
export const Viz=({x,svgRef,previousx})=>{
  
  const firstdisp = useRef();
  const rate_love=(x.count/x.max)*2;
  
  
  useEffect(()=>{
    const du=5000
  	const svg=select(svgRef.current)
    

    svg
      .attr("width","100vw")
      .attr("height","100vh")

        const screenwidth=+select("#root").style("width").slice(0,-2)
        const screenheight=+select("#root").style("height").slice(0,-2)
          
        const size=scaleLinear()
           .domain(extent([0,1500]))
           .range([10,screenwidth])

           const sizey=scaleLinear()
           .domain(extent([0,1500]))
           .range([10,screenheight])
      
      
 
      const len=50
      const array=range(len)


      const gap=0.7
      const del=0.05
      
      const g=svg.append("g")  
      var k=0

      firstdisp.current=localStorage.getItem('firstdisplay')
      if (firstdisp.current==='0'){
       

        array.map((d,i)=>{
  

            xml(heart).then(data=>{
              
              g.node().append(data.documentElement.childNodes[1])
              const img2 = g.select(`image:nth-child(${k+1})`)

              const previousw=size(previousx)*(1+gap*(k+1))
              const previoush=sizey(previousx)*(1+gap*(k+1)) 
              const currentw=size(rate_love)*(1+gap*(k+1))
              const currenth=sizey(rate_love)*(1+gap*(k+1)) 
              
              img2
              .attr("x",`${screenwidth/2-previousw/2}`)
              .attr("y",`${screenheight/2-previoush/2}`)
              .attr("width", previousw)
              .attr("height", previoush)
              .attr("opacity",0.8)
              .transition()
              .duration(du*(1+gap*del*(k)))
              .attr("width", currentw)
              .attr("height", currenth)
              .attr("x",`${screenwidth/2-currentw/2}`)
              .attr("y",`${screenheight/2-currenth/2}`)
              console.log('entroou antes aqui')
              
            

            k=k+1
          
            if(k==len){
              
              g
              .append("text") 
              .text("Developed by Jonas Carvalho 03/04/2022")
              .attr("x",`${screenwidth/2}`)
              .attr("y",`${screenheight-100}`)
              .attr("text-anchor","middle")
              .attr("id","author")
              .attr("fill","#997788")
              .attr("style","font-family:YanoneKaffeesatz_400Regular")
              
              }
          });

      
        
      })
    } else {
      const img2 = selectAll("image")
 
      img2
      .transition()
      .duration((d,i)=>du*(1+gap*del*(i)))
      .attr("width", (d,i)=>size(rate_love)*(1+gap*(i+1)))
      .attr("height", (d,i)=>sizey(rate_love)*(1+gap*(i+1)))
      .attr("x",(d,i)=>screenwidth/2-(size(rate_love)*(1+gap*(i+1)))/2)
      .attr("y",(d,i)=>screenheight/2-(sizey(rate_love)*(1+gap*(i+1)))/2)
      
    }
 
    localStorage.setItem('firstdisplay',`1`);

  
  },[x])
 
  


  return (
    <React.Fragment>
      
      <svg id="images" ref={svgRef} fill="none">
        
   
      </svg>
     
      </React.Fragment>
   
  )
  
  
 
 
 
  
  
};  
