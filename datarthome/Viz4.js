import React,{useState,useEffect} from 'react';


import {min,max,interpolateNumber,extent,scaleBand,scaleLog,scaleLinear,select,selectAll,format} from 'd3';
import { firstGradient, secondGradient } from './Gradient';


const styles = {
  baseText: {
    fill: "darkgrey",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"12"
  },
  titText: {
    fill: "#DD7788",
    fontFamily:"YanoneKaffeesatz_700Bold",
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
    backgroundColor:"#28272d",
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



export const Viz4=({root_div,gradType,iterate_plot,ichart,opac,width,height,marginTop,marginRight,marginBottom,marginLeft,data,datacount})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)


  
useEffect(
    ()=>{
      

///////////////////////////////////////Gradient

const main_root=select(`#root_svg_${root_div}`)

try {
 let test_svg=select(`#main_svg_${root_div}`).style("height")
}
catch {
  main_root.append("svg") 
  
    .attr("id",`main_svg_${root_div}`)  
    .attr("width",width)
    .attr("height",height)
  
  main_root.select(`#main_svg_${root_div}`)
    .append('g')
    .attr("id",`main_g_${root_div}`)
  main_root.select(`#main_svg_${root_div}`)
    .append('g')
    .attr("id",`tick_g_${root_div}`)

}
  
  


const screenheight=select(`#main_svg_${root_div}`).style("height").slice(0,-2)
const screenwidth=select(`#main_svg_${root_div}`).style("width").slice(0,-2)


marginTop=screenheight/15

const main_g=select(`#main_g_${root_div}`)
      .attr("transform",`translate(${marginLeft},${marginTop})`)
      .attr("key",`g${iterate_plot}`)

const tick_g=select(`#tick_g_${root_div}`)
      .attr("transform",`translate(${marginLeft},0)`)
      .attr("key",`tick_g${iterate_plot}`)

const svg=main_root.select(`#main_svg_${root_div}`)


try {
  let test_svg=svg.append("defs")
}
catch {
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


   
      //Creating addustable margins according to screen size
      let adjmarginTop;
      let adjmarginBottom;
      let adjmarginLeft;
      let adjmarginRight;
      
      if(screenheight<=screenwidth) {
        
        adjmarginTop=marginTop;
        adjmarginBottom=marginBottom;
        adjmarginLeft=marginLeft;
        adjmarginRight=marginRight;
        
      } else {
        adjmarginTop=marginTop;
        adjmarginBottom=marginBottom;
        adjmarginLeft=marginLeft;
        adjmarginRight=marginRight;
        

      }

      const innerHeight=screenheight-adjmarginTop-adjmarginBottom;
      const innerWidth=screenwidth-adjmarginLeft-adjmarginRight;

      //gap unit
      
      const widthgap=innerWidth/100;

      const centerX=innerWidth/2;
      const centerY=innerHeight/2;
      const minf=20

      //PARSING DATA==============================
     
      const data_complete=data.map((d,i)=>{
         return {
        "order":JSON.parse(Object.values(d)[0]).Order,
        // "price":JSON.parse(Object.keys(d)[0].replace("coin\":","coin\":\"").replace(",","\"\,")).price,
        // "coin":JSON.parse(Object.keys(d)[0].replace("coin\":","coin\":\"").replace(",","\"\,")).coin,
        "price":JSON.parse(Object.keys(d)[0]).price,
        "coin":JSON.parse(Object.keys(d)[0]).coin,
        "volume":JSON.parse(Object.values(d)[0]).Volume, 
        "previous":JSON.parse(Object.values(d)[0]).Previous,
        "updatetime":JSON.parse(Object.values(d)[0]).updatetime
        }
      }).sort((a,b)=>a.order-b.order)
      

      
      //END PARSING DATA==============================
      
      //escala Y
      function coinfilter(cointext,coinverify){

        return cointext.coin==coinverify
      }
      
      const data_coin=datacount[ichart].coin
    
      
      let filtered_data_complete=data_complete.filter(d=>coinfilter(d,data_coin))
      
       //Defining latest update ==================================
       const latestd=Math.max.apply(null,filtered_data_complete.map(d=>Date.parse(d.updatetime)))
       const datet= latestd
       const latestprice=filtered_data_complete.filter(d=>{
        
        return Date.parse(d.updatetime)==datet
      })
       if (filtered_data_complete.length>50){                                
      
      
      
      const maxprice=Math.max.apply(null,filtered_data_complete.map(d=>d.price))
      const minprice=Math.min.apply(null,filtered_data_complete.map(d=>d.price))
      const arraylength=filtered_data_complete.length
      
      

      const priceorder_data=filtered_data_complete.map(d=>d).sort((a,b)=>a.price-b.price)
      const upper_data=priceorder_data.filter(d=>{
        
        return d.price>latestprice[0].price
      })
      const lower_data=priceorder_data.filter(d=>{
        
        return d.price<latestprice[0].price
      })

      const upper_length=upper_data.length
      const lower_length=lower_data.length
      let cutoff=25
      if(upper_length<25 || lower_length<25){
        cutoff=Math.min(upper_length,lower_length)
      }
      let final_upper=upper_data
      let final_lower=lower_data
      if (upper_length>=25){
        final_upper=upper_data.slice(0,50-cutoff)
      }

      if (lower_length>=25){
        final_lower=lower_data.slice(lower_length-50+cutoff,lower_length)
      }
      
      let final_data=[]
      
      final_data.push(...final_lower)
      final_data.push(...latestprice)
      final_data.push(...final_upper)
      final_data=final_data.map(d=>d).sort((a,b)=>a.order-b.order)

      filtered_data_complete=final_data

    }
     
      //=========================================================
     
      const data_string=filtered_data_complete.map(d=>(d.price).toString()).sort((a,b)=>b-a)
      
      const sizey=scaleBand()
      .domain(data_string)
      .range([innerHeight/15,innerHeight])

      const sizex=scaleLog()
      .domain(extent(filtered_data_complete,d=>(d.volume)))
      .range([0,innerWidth])

  
      //appeding once the g groups used for the animation
     
      tick_g.append('g')
      .attr('key',`tick_g${ichart}`)
      .attr("id",`tick_g${ichart}`)

        main_g.append('g')
        .attr('key',`g2${ichart}`)
        .attr("id",`bars${ichart}`)

        main_g.append('g')
        .attr('key',`g${ichart}`)
        .attr("id",`animation${ichart}`)

        main_g.append('g')
        .attr('key',`g1${ichart}`)
        .attr("id",`static${ichart}`)
      

      const g_tick=svg.select(`#tick_g${ichart}`)


      const g=svg.select(`#animation${ichart}`)

      const g1=svg.select(`#static${ichart}`)
      

      const g2=svg.select(`#bars${ichart}`)
      
      const f=format(".2f")  
      
      //coin tick
      
      g_tick.selectAll("text")
      .data([data_coin])
      .join(
      enter=>
      enter
      .append("text")
      .attr('text-anchor','middle')
      .attr('x', adjmarginLeft+innerWidth/2)
      .attr('y', innerHeight/15)
      .style('font-size',"1.2em")
      .attr('id', "price")
      .attr("fill-opacity",1)
      .style('fill',"#ffffff")
      .style('font-family', `${styles.baseText.fontFamily}`)
      .text(d=>d)
      ,
      update=>
      update
      .attr("fill-opacity",1)
      .text(d=>d)
      .transition()
      
      .text(d=>d)
  
      )
     
      

      

      //STATIC Price tick
      g1.selectAll("text")
        .data(filtered_data_complete)
        .join(
        enter=>
        enter
        .append("text")
        .attr('text-anchor','middle')
        .attr('x', adjmarginLeft+innerWidth/2)
        .attr('y', (d,i)=>sizey(d.price.toString()))
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .attr('id', "price")
        .attr("fill-opacity",1)
        .style('fill',d=>{
          let color="#00c7c7"
          if(d.price==latestprice[0].price){
            color="#ffffff"
          }
          return color
        })
        .style('font-family', `${styles.baseText.fontFamily}`)
        .text(d=>d.price.toString())
        .transition()
          .duration(5000)
          .attr("fill-opacity",opac)
        ,
        update=>
        update
        .transition()
        .text(d=>d.price.toString())
         .duration(5000)
         .attr("fill-opacity",opac)
         .style('fill',d=>{
          let color="#00c7c7"
          if(d.price==latestprice[0].price){
            color="#ffffff"
          }
          
          return color
        })
         .attr('y', (d,i)=>sizey(d.price.toString()))
         
         .attr('x', adjmarginLeft+innerWidth/2)
         .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        ) 
      
      //Dynamic Volume
      g.selectAll("text")
      .data(filtered_data_complete)
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
      .attr('x',adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price.toString()))
      .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
      .attr('id', "value")
      .attr("fill-opacity",0)
      .style('fill',"#08faff")
      .style('font-family', `${styles.baseText.fontFamily}`)
      .text(f(0))
          .transition()
          .duration(5000)
          .attr("fill-opacity",0)
          .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap)
          .attr('y', (d,i)=>sizey(d.price.toString()))
           .textTween((d) => (t) =>{
            
            const i=interpolateNumber(0,d.volume) 
            return `${f(i(t))}`
          })
          ,
      update=>
      update
        .transition()
        .duration(5000)
        .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap)
        .attr('y', (d,i)=>sizey(d.price.toString()))
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .textTween((d,k) => t =>{
          const volume_i=g.selectAll('text').nodes()[k].textContent/1000
          const i=interpolateNumber(volume_i,d.volume) 
          return `${f(i(t))}`
        })
        .attr("fill-opacity",0)
             
        
      )

      //Dynamic BARS
      g2.selectAll("rect")
      .data(filtered_data_complete)
      .join(
      enter=>{
      
      enter
      .append("rect")
      .attr('x', adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price.toString())-min([minf,sizey.bandwidth()])*3/4)
      .attr('rx',0)
      .attr('ry',0)
      .attr("id", (d,k)=>`rect_${k}_${ichart}`)
      .attr('width',0)
      .attr('height',min([minf,sizey.bandwidth()]))
      .attr('fill',"black")
      .attr("stroke","#08faff")
      .attr("stroke-width","0")
      .attr('stroke-dasharray',0)
      .attr("fill-opacity",opac)
      
      
          .transition()
          .duration(5000)
          .attr('fill',`url(#${gradType})`)
          .attr('y', (d,i)=>sizey(d.price.toString())-min([minf,sizey.bandwidth()])*3/4)
          .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
          .attr('width',(d,i)=>sizex(d.volume))
          .attr('height',min([minf,sizey.bandwidth()]))
          .attr('stroke-dasharray',(d,i)=>`0 ${sizex(d.volume)} ${min([minf,sizey.bandwidth()])} ${sizex(d.volume)} ${min([minf,sizey.bandwidth()])}`)
          .attr("stroke-width","3")
      
        
      enter._groups[0].map((d,k)=>{
        select(`#rect_${k}_${ichart}`)
        .append("title")
        .text((d) => `Preço: ${d.price}, Volume: ${d.volume} `)
      }
      
      )
        
        },
      
          
      update=>{
      update
        .transition()
        .duration(5000)
        .attr("fill-opacity",opac)
        .attr('y', (d,i)=>sizey(d.price.toString())-min([minf,sizey.bandwidth()])*3/4)
        .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
        .attr('fill',`url(#${gradType})`)
        .attr('width',(d,i)=>sizex(d.volume))
        .attr('height',min([minf,sizey.bandwidth()]))
        .attr('stroke-dasharray',(d,i)=>`0 ${sizex(d.volume)} ${min([minf,sizey.bandwidth()])} ${sizex(d.volume)} ${min([minf,sizey.bandwidth()])}`)
      
        update._groups[0].map((d,k)=>{
          select(`#rect_${k}_${ichart}`)
          .select("title")
          .text((d) => `Preço: ${d.price}, Volume: ${d.volume} `)
      })
    } 
      

              
      )
      
  
      },[data,datacount]);
 

  



return (
 
      <>
     
        
      </>
 
  

)

};  