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
  rScale,
  rValue,
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
             
          				return (
              <>
                	<circle 
                   className="mark"
                   cx={isNaN(xScale(Math.log10(xValue(d))))?0:xScale(Math.log10(xValue(d)))} 
                   cy={yScale(yValue(d))} 
                   r={isNaN(rScale(Math.log10(rValue(d))))?0:rScale(Math.log10(rValue(d)))*0.02}
                   opacity="0.8"
                   fill={colorScale(colorValue(d))}
                     
                  >
                   
                </circle>

             

               
              </>
                      );
                 })
          )

}
