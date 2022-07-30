import React,{memo,useState,useCallback} from 'react';
import {format} from 'd3';

const f = format(".1f");
const styles = {
  baseText: {
    fill: "black",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"20"
  }
}
export const StockMarks=({
  colorScale,
  colorValue,
  tooltipFormat,
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  circleRadius,
  centerX,
  centerY,
  onHover,
  hoveredValue,
  fadeOpacity,
  larr,
  rcircle,
  countryLegend,
  rfactor
})=>{
	const tempo = new Date();
  let seconds = tempo.getSeconds();	
  const maxc=Math.max.apply(Math, data.map(function(d) { return d.price; }))
  const ming=Math.min.apply(Math, data.map(function(d) { return d.price; }))


  
  
  return (
        data.map(function(d,i){
           //	console.log(colorScale(colorValue(d)))
           
             
          				return (
              <>
                	<circle 
                   className="mark"
                   cx={xScale(xValue(d))} 
                   cy={yScale(yValue(d))} 
                   r={xScale(2)}
                   opacity="0.8"
                   fill={colorScale(colorValue(d))}
                     
                  >
                   
                </circle>

             

               
              </>
                      );
                 })
          )

}
