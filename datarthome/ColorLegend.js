
import {range,extent} from 'd3';
const styles = {
  baseText: {
    fill: "#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"20"
  }
}
export const ColorLegend=({data,innerWidth,tickTextOffset=30,colorScale,tickSpace=10,tickSize=10})=>{
  var k=0;
  
  
  
  return (colorScale.domain().map(function(domainValue,i){
  		

    if (i % 8 == 0) {
      k=k+1
      console.log(domainValue)
      return (
      
      <g transform={`translate(${5-130*Math.cos(Math.PI/1.7+Math.PI/17*k)-100},${(i)*tickSpace/8.3})`}>
      <circle fill={colorScale((domainValue)*1.0)} r={tickSize}/>
        <text 
           style={{fontSize:styles.baseText.fontSize,fontFamily: styles.baseText.fontFamily}}
          fill="white" 
          x={tickTextOffset} 
          dy=".32em">{Math.floor(domainValue)}</text>
      </g>
      
    );
    
    
    };

  })
  );
}