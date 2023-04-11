import React,{useState,useEffect} from 'react';


import {min,interpolateNumber,extent,scaleBand,scaleLinear,select,selectAll,format} from 'd3';


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



export const Viz4=({ichart,yAxislabelOffset,xAxislabelOffset,width,height,marginTop,marginRight,marginBottom,marginLeft,data})=>{
  //START - Variable declarations====================
  
  
  const [hoveredValue,setHoveredValue]=useState(null)

  const svg=select("svg")
  var svgDefs=svg.append("defs")
  var barsGradient = svgDefs.append('linearGradient')
  .attr('id', 'barsGrad')
  .attr('x1', '0%')
  .attr('x2', "100%")
  .attr("y1", "0%")
  .attr("y2","100%");

// Create the stops of the main gradient. Each stop will be assigned
// a class to style the stop using CSS.
barsGradient.append('stop')
.attr("class", "start")
.attr("offset", "0%")
.attr("stop-color", "red")
.attr("stop-opacity", 1);

barsGradient.append('stop')
.attr("class", "end")
.attr("offset", "100%")
.attr("stop-color", "blue")
.attr("stop-opacity", 1);
  
useEffect(
    ()=>{
      

///////////////////////////////////////Gradient

const svg=select("svg")

var svgDefs=svg.append("defs")
var barsGradient = svgDefs.append('linearGradient')
.attr('id', 'barsGrad')
.attr('x1', '0%')
.attr('x2', "100%")
.attr("y1", "0%")
.attr("y2","0%")


// Create the stops of the main gradient. Each stop will be assigned
// a class to style the stop using CSS.
barsGradient.append('stop')
.attr("class", "start")
.attr("offset", "0%")
.attr("stop-color", "red")
.attr("stop-opacity", 1);

barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "5%")
.attr("stop-color", "red")
.attr("stop-opacity", 0.95);


barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "30%")
.attr("stop-color", "blue")
.attr("stop-opacity", 0.6);


barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "50%")
.attr("stop-color", "blue")
.attr("stop-opacity", 0.2);


barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "70%")
.attr("stop-color", "blue")
.attr("stop-opacity", 0.6);


barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "95%")
.attr("stop-color", "red")
.attr("stop-opacity", 0.95);



barsGradient.append('stop')
.attr("class", "midle")
.attr("offset", "100%")
.attr("stop-color", "red")
.attr("stop-opacity", 1);




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
      .domain(extent(data_complete,d=>(d.volume)))
      .range([10,innerWidth])
  

      const g=select(`#animation${ichart}`);
      const g1=select(`#static${ichart}`);
      const g2=select(`#bars${ichart}`);

      

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
        .style('fill',"black")
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .attr('id', "price")
        .attr("fill-opacity",0)
        .style('font-family', `${styles.baseText.fontFamily}`)
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
         .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
          
      
      //Dynamic Volume
      g.selectAll("text")
      .data(data_complete)
      .join(
      enter=>
      enter
      .append("text")
      .attr('class', "value")
    //  .attr('x', (d,i)=>200+sizex(d.volume))
      .attr('x',adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price_str))
      .attr('id', "value")
      .style('fill',"black")
      .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
      .style('font-family', `${styles.baseText.fontFamily}`)
      .attr("fill-opacity",0)
      .text(f(0))
          .transition()
          .attr("fill-opacity",1)
          .duration(5000)
          .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap*7)
          .attr('y', (d,i)=>sizey(d.price_str))
          .textTween((d) => (t) =>{
            
            const i=interpolateNumber(0,d.volume) 
            return `${f(i(t)*1000)}`
          }),
      update=>
      update
        .transition()
        .attr("fill-oppacity","1")
        .duration(5000)
        .attr('x', (d,i)=>sizex(d.volume)/2+adjmarginLeft+innerWidth/2+widthgap*7)
        .attr('y', (d,i)=>sizey(d.price_str))
        .style('font-size',`${min([minf,sizey.bandwidth()])}px`)
        .textTween((d,k) => t =>{
          const volume_i=g.selectAll('text').nodes()[k].textContent/1000
          //console.log(volume_i.nodes()[k].textContent)
          
          const i=interpolateNumber(volume_i,d.volume) 
          return `${f(i(t)*1000)}`
        })
             
        
      )

      //Dynamic BARS
      g2.selectAll("rect")
      .data(data_complete)
      .join(
      enter=>
      enter
      .append("rect")
      
    //  .classed('barsGrad', true)
    //  .attr('x', (d,i)=>200+sizex(d.volume))
      .attr('x', adjmarginLeft+innerWidth/2)
      .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
      .attr('rx',5)
      .attr('ry',5)
      .attr('width',0)
      .attr('height',min([minf,sizey.bandwidth()]))
      .attr('fill',"url(#barsGrad)")
      //.attr("fill-opacity",0)
      .text(f(0))
          .transition()
        //  .attr("fill-opacity",1)
          .duration(5000)
          .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
          .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
          .attr('width',(d,i)=>sizex(d.volume))
          .attr('height',min([minf,sizey.bandwidth()])),
          
      update=>
      update
        .transition()
        .attr("fill-oppacity","1")
        .duration(5000)
        .attr('y', (d,i)=>sizey(d.price_str)-min([minf,sizey.bandwidth()])*3/4)
        .attr('x', (d,i)=>adjmarginLeft+innerWidth/2-sizex(d.volume)/2)
        .attr('width',(d,i)=>sizex(d.volume))
        .attr('height',min([minf,sizey.bandwidth()])),
              
      )
      
  
      },[data]);
 

      let svg_main
      let g_bars
      let g_static
      let g_volume

  if(ichart==0){svg_main=<svg width={width} height={height} style={{backgroundColor:"#66679G"}} id="svg_main"><text>Teste {ichart}</text></svg>}
  else {svg_main=""}
      console.log(svg_main)
g_bars=<g transform={`translate(0,70)`} id={`bars${ichart}`}></g>
g_static=<g id={`static${ichart}`} transform={`translate(0,70)`}></g>
g_volume=<g transform={`translate(0,70)`} id={`animation${ichart}`}></g>




return (
 // <svg width={width} height={height} style={{backgroundColor:"#66679G"}}>
    
     // <g transform={`translate(${marginLeft},${marginTop})`}>
 
      <>
        {svg_main}
        {g_bars}
        {g_static}  
        {g_volume}
        
      </>
 
  

      // </g>
      
        
 	//</svg>
)

};  
