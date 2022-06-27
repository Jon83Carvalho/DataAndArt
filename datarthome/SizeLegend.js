import {range,extent} from 'd3';

const styles = {
  baseText: {
    color: "#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"20"
  }
}
export const SizeLegend=({rfactor,rScale,data,yValue,innerWidth,tickTextOffset=30,tickSpace=10,tickSize=10})=>{
 var k=0;
  const ming=Math.min.apply(Math, data.map(function(d) { return d.Gap; }))
	
  const arrayn=range(Math.floor(extent(data.map(d=>+d.Gap))[0]),Math.floor(extent(data.map(d=>+d.Gap))[1])+2.)

  return arrayn.map((domainValue,i)=>{
  		
      
 if (i%3==0 && domainValue>0) {
     k=k+1
      return (
      
     <g transform={`translate(${10-300*Math.cos(Math.PI/1.17+Math.PI/32*k)-290},${(tickSpace+50)*i*i/409.5*rfactor-10})`}>
      <circle fill="white" r={rScale((domainValue-ming))/100*rfactor}/>
        <text 
          style={{
            fill:styles.baseText.fill,
            fontFamily: styles.baseText.fontFamily,
            fontSize:styles.baseText.fontSize
          }}
          fill="white" 
          x={tickTextOffset} 
          dy=".32em">{domainValue}</text>
      </g>
      
   );
    
    
   };

  });
}