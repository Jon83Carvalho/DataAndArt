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
}
export const Viz4_top=({opac,width,height,marginTop,marginRight,marginBottom,marginLeft,datacount})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)


  
useEffect(
    ()=>{
      

///////////////////////////////////////Gradient

const main_root=select('#top_list')

try {
 let test_svg=select('#main_svg_top').style("width")
}
catch {
  main_root.append("svg") 
  
    .attr("id",'main_svg_top')  
    .attr("width",width)
    .attr("height",height)
  
  main_root.select('#main_svg_top')
    .append('g')
    .attr("id",'main_g_top')

}
  
  


const screenheight=select('#main_svg_top').style("height").slice(0,-2)
const screenwidth=select('#main_svg_top').style("width").slice(0,-2)

//console.log("altura dabarra",select(`#main_svg_${root_div}`).style("height"),root_div)


const main_g=select('#main_g_top')
      .attr("transform",`translate(${marginLeft},${marginTop})`)
      

const svg=main_root.select('#main_svg_top')


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
        main_g.append('g')
        .attr('key','g_coin_count')
        .attr("id",'coins_count')

     

      

      const g=svg.select('#coins')
      const g_count=svg.select('#coins_count')
      const f=format(".0f") 

   
  
    const datacount_order=datacount
    .map(d=>d)
      .sort((a,b)=>
        JSON.parse(
          a[Object.keys(a)[0]]
          ).order-
        JSON.parse(
          b[Object.keys(b)[0]]
          ).order)
 
     //coin name
      g.selectAll("text")
        .data(datacount_order)
        .join(
        enter=>
        enter
        .append("text")
        .attr('text-anchor','left')
        .attr('x', (d,i)=>{
          let res = posx(d.rank);
          if (d.rank>10){
            res =screenwidth*1.5
          }
          return res 
        })
        .attr('y', `${parseInt(select(`#main_svg_top`).style("height").slice(0,-2))/10}px`)
        
        .style('font-size','1.5em')
        .attr('id', "coin")
        .attr("fill-opacity",0)
        .style('fill',(d,i)=>{
          let res = "#ffffff";
          if (d.rank>5){
            res ="#00c7c7"
          }
          return res 
        }))
        .style('font-family', (d,i)=>{
          let res = `${styles.titText.fontFamily}`;
          if (d.rank>5){
            res =`${styles.baseText.fontFamily}`
          }
          return res 
        })
        .text(d=>Object.keys(d)[0])
       
        .transition()
              .style('fill',(d,i)=>{
                let res = "#ffffff";
                if (d.rank>5){
                  res ="#00c7c7"
                }
                return res 
              })
              .style('font-family', (d,i)=>{
                let res = `${styles.titText.fontFamily}`;
                if (d.rank>5){
                  res =`${styles.baseText.fontFamily}`
                }
                return res 
                 })
                .duration(5000)
                .attr("fill-opacity",(d,i)=>{
                  let res = opac;
                  if (d.rank>10){
                    res =0
                  }
                  return res 
                })
                .attr('x', (d,i)=>{
                  let res = posx(d.rank);
                  if (d.rank>10){
                    res =screenwidth*1.5
                  }
                  return res 
                })
                .attr('y', `${parseInt(select(`#main_svg_top`).style("height").slice(0,-2))/5}px`)
        
        ,
        update=>
        update
        .style('font-family', (d,i)=>{
          let res = `${styles.titText.fontFamily}`;
          if (d.rank>5){
            res =`${styles.baseText.fontFamily}`
          }
          return res 
        })
        .style('fill',(d,i)=>{
          let res = "#ffffff";
          if (d.rank>5){
            res ="#00c7c7"
          }
          return res 
        })
        .transition()
         .duration(5000)
         .attr("fill-opacity",(d,i)=>{
          let res = opac;
          if (d.rank>10){
            res =0
          }
          return res 
        })
               .attr('x', (d,i)=>{
            let res = posx(d.rank);
            if (d.rank>10){
              res =screenwidth*1.5
            }
            return res 
          })
        
     ///Coin count
  
     g_count.selectAll("text")
     .data(datacount_order)
     .join(
     enter=>
     enter
     .append("text")
     .attr('text-anchor','left')
     .attr('x', (d,i)=>{
       let res = posx(d.rank);
       if (d.rank>10){
         res =screenwidth*1.5
       }
       return res 
     })
     .attr('y', `${parseInt(select(`#main_svg_top`).style("height").slice(0,-2))/10}px`)
     
     .style('font-size','0.8em')
     .attr('id', "coin")
     .attr("fill-opacity",0)
     .style('fill',(d,i)=>{
       let res = "#ffffff";
       if (d.rank>5){
         res ="#00c7c7"
       }
       return res 
     })

     .style('font-family', (d,i)=>{
       let res = `${styles.titText.fontFamily}`;
       if (d.rank>5){
         res =`${styles.baseText.fontFamily}`
       }
       return res 
     })
     .text(d=>JSON.parse(d[Object.keys(d)[0]]).Count)
    
     .transition()
           .style('fill',(d,i)=>{
             let res = "#ffffff";
             if (d.rank>5){
               res ="#00c7c7"
             }
             return res 
           })
           .style('font-family', (d,i)=>{
             let res = `${styles.titText.fontFamily}`;
             if (d.rank>5){
               res =`${styles.baseText.fontFamily}`
             }
             return res 
              })
             .duration(5000)
             .attr("fill-opacity",(d,i)=>{
               let res = opac;
               if (d.rank>10){
                 res =0
               }
               return res 
             })
             .attr('x', (d,i)=>{
               let res = posx(d.rank);
               if (d.rank>10){
                 res =screenwidth*1.5
               }
               return res 
             })
             .attr('y', `${parseInt(select(`#main_svg_top`).style("height").slice(0,-2))*1.5/5}px`)

             
     
     ,
     update=>
    
     update
     .style('font-family', (d,i)=>{
       let res = `${styles.titText.fontFamily}`;
       if (d.rank>5){
         res =`${styles.baseText.fontFamily}`
       }
       return res 
     })
     .style('fill',(d,i)=>{
       let res = "#ffffff";
       if (d.rank>5){
         res ="#00c7c7"
       }
       return res 
     })
     .text(d=>JSON.parse(d[Object.keys(d)[0]]).Count)
     .transition()
      .duration(5000)
      .attr("fill-opacity",(d,i)=>{
       let res = opac;
       if (d.rank>10){
         res =0
       }
       return res 
     })
            .attr('x', (d,i)=>{
         let res = posx(d.rank);
         if (d.rank>10){
           res =screenwidth*1.5
         }
         return res 
       })
     
     )
    
      
  
      },[datacount]);
 

  



return (
 
      <>
     
        
      </>
 
  

)

};  
