import React,{useState,useEffect} from 'react';


import {min,interpolateNumber,extent,scaleBand,select,selectAll,format} from 'd3';
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
}
export const Viz4_top=({opac,width,height,marginTop,marginRight,marginBottom,marginLeft,datacount})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)


  
useEffect(
    ()=>{
      

///////////////////////////////////////Gradient

const main_root=select('#top_list')

try {
 let test_svg=select('#main_svg').style("width")
}
catch {
  main_root.append("svg") 
  
    .attr("id",'main_svg')  
    .attr("width",width)
    .attr("height",height)
  
  main_root.select('#main_svg')
    .append('g')
    .attr("id",'main_g')

}
  
  


const screenheight=select('#main_svg').style("height").slice(0,-2)
const screenwidth=select('#main_svg').style("width").slice(0,-2)

//console.log("altura dabarra",select(`#main_svg_${root_div}`).style("height"),root_div)


const main_g=select('#main_g')
      .attr("transform",`translate(${marginLeft},${marginTop})`)
      

const svg=main_root.select('#main_svg')


    //  //Creating addustable margins according to screen size
    //   let adjmarginTop;
    //   let adjmarginBottom;
    //   let adjmarginLeft;
    //   let adjmarginRight;
      
    //   if(screenheight<=screenwidth) {
        
    //     adjmarginTop=marginTop;
    //     adjmarginBottom=marginBottom;
    //     adjmarginLeft=marginLeft;
    //     adjmarginRight=marginRight;
        
    //   } else {
    //     adjmarginTop=marginTop;
    //     adjmarginBottom=marginBottom;
    //     adjmarginLeft=marginLeft;
    //     adjmarginRight=marginRight;
        

    //   }

      const innerHeight=screenheight-marginTop-marginBottom;
      const innerWidth=screenwidth-marginLeft-marginRight;

     
      //escala Y
      function coinfilter(cointext,coinverify){

        return cointext.coin==coinverify
      }
      
      
      const posx=scaleBand()
      .domain([1,2,3,4,5,6,7,8,9,10])
      .range([0,innerWidth])



      
  
      //appeding once the g groups used for the animation
     
        main_g.append('g')
        .attr('key','g_coin')
        .attr("id",'coins')

     

      

      const g=svg.select('#coins')

   //  console.log(datacount) 
   //  console.log(`${parseInt(select(`#main_svg`).style("height").slice(0,-2))/2}px`)
     //STATIC coin name
      g.selectAll("text")
        .data(datacount)
        .join(
        enter=>
        enter
        .append("text")
        .attr('text-anchor','left')
        .attr('x', (d,i)=>posx(d.rank))
        .attr('y', `${parseInt(select(`#main_svg`).style("height").slice(0,-2))/5}px`)
        
        .style('font-size','1em')
        .attr('id', "coin")
        .attr("fill-opacity",(d,i)=>{
          let res = 1;
          if (d.rank>10){
            res =0
          }
          return res 
        })
        .style('fill',"#00c7c7")
        .style('font-family', `${styles.baseText.fontFamily}`)
        .text(d=>Object.keys(d)[0])
        .transition()
          .duration(5000)
          .attr("fill-opacity",(d,i)=>{
            let res = opac;
            if (d.rank>10){
              res =0
            }
            return res 
          })
          .attr('x', (d,i)=>posx(d.rank))
        ,
        update=>
        update
        .transition()
        .text(d=>Object.keys(d)[0])
         .duration(5000)
         .attr("fill-opacity",(d,i)=>{
          let res = opac;
          if (d.rank>10){
            res =0
          }
          return res 
        })
         .attr('x', (d,i)=>posx(d.rank))
         
        ) 
      
  
      },[datacount]);
 

  



return (
 
      <>
     
        
      </>
 
  

)

};  
