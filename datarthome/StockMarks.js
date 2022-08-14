import React,{memo,useState,useCallback, useEffect,useRef} from 'react';
import {select,format} from 'd3';


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
  rfactor,
  svgRef
})=>{

  
  return (<></>)
  
}
