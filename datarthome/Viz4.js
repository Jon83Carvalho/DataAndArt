import React,{useState,useEffect} from 'react';


import {min,interpolateNumber,extent,scaleBand,scaleLinear,select,selectAll,format} from 'd3';
import { firstGradient, secondGradient } from './Gradient';


const styles = {
  baseText: {
    fill: "darkgrey",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"12"
  },
  titText: {
    fill: "#DD7788",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"4.5vw"
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



export const Viz4=({gradType,iterate_plot,ichart,opac,yAxislabelOffset,xAxislabelOffset,width,height,marginTop,marginRight,marginBottom,marginLeft,data})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)


  
useEffect(
    ()=>{
      

///////////////////////////////////////Gradient

const main_root=select("#root_svg")

if(iterate_plot==0 && ichart==1){
  
  main_root.append("svg")
    .attr("id","main_svg")  
    .attr("width",width)
    .attr("height",height)

  main_root.select("#main_svg")
    .append('g')
    .attr("id","main_g")
  

 
}


const main_g=select("#main_g")
      .attr("transform",`translate(${marginLeft},${marginTop})`)
      .attr("key",`g${iterate_plot}`)

const svg=main_root.select("#main_svg")

if (iterate_plot==0 && ichart==1){
  svg.append("defs")
}

/// GRADIENT DEFINITION==============================

var svgDefs=svg.select("defs")
var barsGradient
const fGrad=firstGradient
const sGrad=secondGradient

fGrad(barsGradient,svgDefs)
sGrad(barsGradient,svgDefs)

//////////////////////////////////////


      const screenheight=+select("#root").style("height").slice(0,-2)
      const screenwidth=+select("#root").style("width").slice(0,-2)
      
      //Creating addustable margins according to screen size
      let adjmarginTop;
      let adjmarginBottom;
      let adjmarginLeft;
      let adjmarginRight;
      if(screenheight<screenwidth) {
        console.log("teste");
        adjmarginTop=marginTop/700*9/16*screenheight;
        adjmarginBottom=marginBottom/700*9/16*screenheight;
        adjmarginLeft=marginLeft/1900*16/9*screenwidth;
        adjmarginRight=marginRight/1900*16/9*screenwidth;
      } else {
        adjmarginTop=marginTop/1900*16/9*screenheight;
        adjmarginBottom=marginBottom/1900*16/9*screenheight;
        adjmarginLeft=marginLeft/700*9/16*screenwidth;
        adjmarginRight=marginRight/700*9/16*screenwidth;

      }

      const innerHeight=screenheight-adjmarginTop-adjmarginBottom;
      const innerWidth=screenwidth-adjmarginLeft-adjmarginRight;

      //gap unit
      const widthgap=marginLeft/30;

      const centerX=innerWidth/2;
      const centerY=innerHeight/2;
      const minf=20

      //PARSING DATA==============================
     
      const data_complete=data.map((d,i)=>{
         return {
        "order":JSON.parse(Object.values(d)[0]).Order,
        "price":parseFloat(Object.keys(d)[0]),
        "volume":JSON.parse(Object.values(d)[0]).Volume, 
        "price_str":Object.keys(d)[0],
        "previous":JSON.parse(Object.values(d)[0]).Previous
        }
      }).sort((a,b)=>a.order-b.order)

      //END PARSING DATA==============================

      
      //escala Y
  
      const data_string=data_complete.map(d=>d.price_str).sort((a,b)=>b-a)
      const sizey=scaleBand()
      .domain(data_string)
      .range([10,innerHeight])



      //escala X  
      const sizex=scaleLinear()
      .domain(extent(data_complete,d=>(d.volume)))
      .range([10,innerWidth])
  
      //appeding once the g groups used for the animation
      if(iterate_plot==0){
      
        main_g.append('g')
        .attr('key',`g2${ichart}`)
        .attr("id",`bars${ichart}`)

        main_g.append('g')
        .attr('key',`g${ichart}`)
        .attr("id",`animation${ichart}`)

        main_g.append('g')
        .attr('key',`g1${ichart}`)
        .attr("id",`static${ichart}`)

  
      }

      

      const g=svg.select(`#animation${ichart}`)

      const g1=svg.select(`#static${ichart}`)
      

      const g2=svg.select(`#bars${ichart}`)
      
      const f=format(".2f")  

      //console.log(data_complete)

      //STATIC Prince tick
      g1.selectAll("text")
        .data(data_complete)
        .join(
        enter=>
        enter
        .append("text")
        .attr('text-anchor','middle')
        .attr('x', adjmarginLeft+innerWidth/2)
        .attr('y', (d,i)=>sizey(d.price_str))
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .attr('id', "price")
        .attr("fill-opacity",0)
        .style('fill',"black")
        .style('font-family', `${styles.baseText.fontFamily}`)
        .text(d=>d.price)
        .transition()
          .duration(5000)
          .attr("fill-opacity",1)
        ,
        update=>
        update
        .transition()
        .text(d=>d.price)
         .duration(5000)
         .attr("fill-opacity",1)
         .attr('y', (d,i)=>sizey(d.price_str))
         
         .attr('x', adjmarginLeft+innerWidth/2)
         .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        ) 
      
      //Dynamic Volume
      g.selectAll("text")
      .data(data_complete)
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
      .attr('x',adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price_str))
      .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
      .attr('id', "value")
      .attr("fill-opacity",0)
      .style('fill',"black")
      .style('font-family', `${styles.baseText.fontFamily}`)
      .text(f(0))
          .transition()
          .duration(5000)
          .attr("fill-opacity",1)
          .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap*7)
          .attr('y', (d,i)=>sizey(d.price_str))
           .textTween((d) => (t) =>{
            
            const i=interpolateNumber(0,d.volume) 
            return `${f(i(t)*1000)}`
          })
          ,
      update=>
      update
        .transition()
        .duration(5000)
        .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap*7)
        .attr('y', (d,i)=>sizey(d.price_str))
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .textTween((d,k) => t =>{
          const volume_i=g.selectAll('text').nodes()[k].textContent/1000
          const i=interpolateNumber(volume_i,d.volume) 
          return `${f(i(t)*1000)}`
        })
        .attr("fill-opacity",1)
             
        
      )

      //Dynamic BARS
      g2.selectAll("rect")
      .data(data_complete)
      .join(
      enter=>
      enter
      .append("rect")
      .attr('x', adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
      .attr('rx',5)
      .attr('ry',5)
      .attr('width',0)
      .attr('height',min([minf,sizey.bandwidth()]))
      .attr('fill',"black")
      .attr("fill-opacity",opac)
          .transition()
          .duration(5000)
          .attr('fill',`url(#${gradType})`)
          .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
          .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
          .attr('width',(d,i)=>sizex(d.volume))
          .attr('height',min([minf,sizey.bandwidth()])),
          
      update=>
      update
        .transition()
        .duration(5000)
        .attr("fill-opacity",opac)
        .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
        .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
        .attr('fill',`url(#${gradType})`)
        .attr('width',(d,i)=>sizex(d.volume))
        .attr('height',min([minf,sizey.bandwidth()])),
              
      )
      
  
      },[data]);
 

  



return (
 
      <>
     
        
      </>
 
  

)

};  
