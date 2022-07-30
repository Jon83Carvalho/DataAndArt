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
  rScale,
  radialScale,
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
  const maxc=Math.max.apply(Math, data.map(function(d) { return d.Corrup; }))
  const ming=Math.min.apply(Math, data.map(function(d) { return d.Gap; }))


  
  
  return (
        data.map(function(d,i){
           				  
  								const rad=((radialScale((maxc-xValue(d)+30)))/2.7)
              
          				return (
              <>
               <g 
        				opacity={hoveredValue&&d!=hoveredValue?fadeOpacity:1}
        				onMouseEnter={()=>{onHover(d)}}
        				onMouseOut={()=>{onHover(null)}}
        				>
                	<circle 
                   className="mark"
                   cx={rad*Math.sin(Math.floor(100*larr[i+43]*360/180)/100)+centerX} 
                   cy={rad*Math.cos(Math.floor(100*larr[i+43]*360/180)/100)+centerY} 
                   r={rScale((yValue(d)-ming))/100*rfactor}
                   opacity="0.8"
                   fill={colorScale(colorValue(d))}
                     
                  >
                   
                </circle>

                   </g>

                <g opacity={hoveredValue&&d==hoveredValue?1:0}>
								 <rect rx="20" ry="20" width="240" height="120"
                  opacity={0.5}
                  x={50}
                  y={180}
                  color="black"
                  fill="white"
                  
                  >
              		
                  </rect><text
                  
                  fill="black" 
                  x={70}
                  y={240}
                  dy=".32em"
                  style={{
                    fontSize:styles.baseText.fontSize,
                    fill:styles.baseText.fill,
                    fontFamily: styles.baseText.fontFamily}}
 							   >Internet Gender Gap: {f(d.Gap)}</text>
                 <text
                  style={{
                    fontSize:styles.baseText.fontSize,
                    fill:styles.baseText.fill,
                    fontFamily: styles.baseText.fontFamily}}
                  x={70}
                  y={270}
                  dy=".32em"
 							   >Corruption Perception: {d.Corrup}</text>
                <text
                  style={{
                    fontSize:styles.baseText.fontSize,
                    fill:styles.baseText.fill,
                    fontFamily: styles.baseText.fontFamily}}
                  fill="black" 
                  x={70}
                  y={210}
                  dy=".32em"
 							   >Country: {d.Country}</text>
                 </g>
 
              </>
                      );
                 })
          )

}
