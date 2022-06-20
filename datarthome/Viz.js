import React, { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import {selectAll,select,xml,scaleLinear,extent,range,max,min} from "d3";


const heart=  require('./assets/heart.svg')

export const Viz=({x,svgRef,previousx})=>{
  
  const wrapperRef = useRef();
  const firstdisp = useRef();
  
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


      var gapy
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
              const currentw=size(x)*(1+gap*(k+1))
              const currenth=sizey(x)*(1+gap*(k+1)) 
              
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
              svg
              .append("defs")
              .append("font-face")
              .append("font-face-uri")
              .attr("href","https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@300&display=swap")

              g
              .append("text") 
              .text("Developed by Jonas Carvalho 03/04/2022")
              .attr("x",`${screenwidth/2-100}`)
              .attr("y",`${screenheight-100}`)
              .attr("text-anchor","middle")
              .attr("id","author")
              .attr("fill","#997788")
              .attr("style","font-family: 'Yanone Kaffeesatz', sans-serif;")
              .attr("style","font-size: 1vw;")
              
              }
          });

      
        
      })
    } else {
      const img2 = selectAll("image")
 
      img2
      .transition()
      .duration((d,i)=>du*(1+gap*del*(i)))
      .attr("width", (d,i)=>size(x)*(1+gap*(i+1)))
      .attr("height", (d,i)=>sizey(x)*(1+gap*(i+1)))
      .attr("x",(d,i)=>screenwidth/2-(size(x)*(1+gap*(i+1)))/2)
      .attr("y",(d,i)=>screenheight/2-(sizey(x)*(1+gap*(i+1)))/2)
      
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
