(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/int_index.csv';

  const useData=()=>{
    const [data,setData]=React$1.useState(null);
     React$1.useEffect(()=>{
      
      const row=d=>{
         return d;
      };
      d3.csv(csvUrl,row).then(setData);
      
    },[]);

   
  	return data
  };

  const csvUrl$1='https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/randarray.csv';

  const randArray=()=>{
    const [data,setData]=React$1.useState(null);
     React$1.useEffect(()=>{
      
      const row=d=>{
         return d;
      };
      d3.csv(csvUrl$1,row).then(setData);
      
    },[]);

   
  	return data
  };

  const f = d3.format(".1f");
  const Marks=({
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
    const maxc=Math.max.apply(Math, data.map(function(d) { return d.Corrup; }));
    const ming=Math.min.apply(Math, data.map(function(d) { return d.Gap; }));


    
    
    return (
          data.map(function(d,i){
             				  
    								const rad=((radialScale((maxc-xValue(d)+30)))/2.7);
                
            				return (
                React$1__default.createElement( React$1__default.Fragment, null,
                 React$1__default.createElement( 'g', { 
          				opacity: hoveredValue&&d!=hoveredValue?fadeOpacity:1, onMouseEnter: ()=>{onHover(d);}, onMouseOut: ()=>{onHover(null);} },
                  	React$1__default.createElement( 'circle', { 
                     className: "mark", cx: rad*Math.sin(Math.floor(100*larr[i+43]*360/180)/100)+centerX, cy: rad*Math.cos(Math.floor(100*larr[i+43]*360/180)/100)+centerY, r: rScale((yValue(d)-ming))/100*rfactor, opacity: "0.8", fill: colorScale(colorValue(d)) }
                     
                  )

                     ),

                  React$1__default.createElement( 'g', { opacity: hoveredValue&&d==hoveredValue?1:0 },
  								 React$1__default.createElement( 'rect', { rx: "20", ry: "20", width: "240", height: "120", opacity: 0.5, x: 50, y: 180, color: "black", fill: "white" }
                		
                    ), React$1__default.createElement( 'text', {
                   'font-size': "15", fill: "black", x: 70, y: 240, dy: ".32em" }, "Internet Gender Gap: ", f(d.Gap)),
                   React$1__default.createElement( 'text', {
                    'font-size': "15", fill: "black", x: 70, y: 270, dy: ".32em" }, "Corruption Perception: ", d.Corrup),
                  React$1__default.createElement( 'text', {
                    'font-size': "25", fill: "black", x: 70, y: 210, dy: ".32em" }, "Country: ", d.Country)
                   )
   
                )
                        );
                   })
            )

  };

  const ColorLegend=({data,innerWidth,tickTextOffset=30,colorScale,tickSpace=10,tickSize=10})=>{
    var k=0;
    
    
    
    return colorScale.domain().map((domainValue,i)=>{
    		

      if (i % 8 == 0) {
        k=k+1;
        return (
        
        React.createElement( 'g', { transform: `translate(${5-130*Math.cos(Math.PI/1.7+Math.PI/17*k)-100},${(i)*tickSpace/8.3})` },
        React.createElement( 'circle', { fill: colorScale((domainValue)*1.0), r: tickSize }),
          React.createElement( 'text', { 
            'font-size': "15", fill: "white", x: tickTextOffset, dy: ".32em" }, Math.floor(domainValue))
        )
        
      );
      
      
      }
    });
  };

  const SizeLegend=({rfactor,rScale,data,yValue,innerWidth,tickTextOffset=30,tickSpace=10,tickSize=10})=>{
   var k=0;
    const ming=Math.min.apply(Math, data.map(function(d) { return d.Gap; }));
  	
    const arrayn=d3.range(Math.floor(d3.extent(data.map(d=>+d.Gap))[0]),Math.floor(d3.extent(data.map(d=>+d.Gap))[1])+2.);

    return arrayn.map((domainValue,i)=>{
    		
        
   if (i%3==0 && domainValue>0) {
       k=k+1;
        return (
        
       React.createElement( 'g', { transform: `translate(${10-300*Math.cos(Math.PI/1.17+Math.PI/32*k)-290},${(tickSpace+50)*i*i/409.5*rfactor-10})` },
        React.createElement( 'circle', { fill: "white", r: rScale((domainValue-ming))/100*rfactor }),
          React.createElement( 'text', { 
            'font-size': "15", fill: "white", x: tickTextOffset, dy: ".32em" }, domainValue)
        )
        
     );
      
      
     }
    });
  };

  const Viz=({yAxislabelOffset,xAxislabelOffset,width,height,marginTop,marginRight,marginBottom,marginLeft})=>{
    const data=useData();
    const rand=randArray();
    const [hoveredValue,setHoveredValue]=React$1.useState(null);

    
     if(!data){
     
    	return React$1__default.createElement( 'pre', null, "...loading" );
    }  
      if(!rand){
     
    	return React$1__default.createElement( 'pre', null, "...loading" );
    }  
    
    const innerHeight=height-marginTop-marginBottom;
    const innerWidth=width-marginLeft-marginRight;
    const centerX=innerWidth/2;
    const centerY=innerHeight/2;
    
    
    const xValue=d=>d.Corrup;

   
    const yValue=d=>d.Gap;
    const fadeOpacity=0.2;
    const larr=[];

    rand.map((d,i)=>larr.push(Math.PI*rand[i].number));
    

    const xAxistickFormat=tickvalue=>siFormat(tickvalue).replace('G','Bi');
    
   
    const rScale = d3.scaleLinear()
  		.domain(d3.extent(data,yValue))
    	.range([0, innerHeight]);
    
    
    
   const radialScale = d3.scaleLinear()
  		.domain(d3.extent(data,xValue))
    	.range([0, innerHeight]);

    
    const xScale=d3.scaleLinear()
    	.domain(d3.extent(data,xValue))
    	.range([0,innerWidth]);
    
  	const yScale=d3.scaleLinear()
    .domain(d3.extent(data,yValue))
    .range([0, innerHeight]);
    
    const colorValue=d=>d.Corrup;
    
     const colorScale=d3.scaleOrdinal()
    	.domain(data.sort(function(a, b){return a.Corrup-b.Corrup}).map(d=>d.Corrup))
    	.range(["#23171b","#271a28","#2b1c33","#2f1e3f","#32204a","#362354","#39255f","#3b2768","#3e2a72","#402c7b","#422f83","#44318b","#453493","#46369b","#4839a2","#493ca8","#493eaf","#4a41b5","#4a44bb","#4b46c0","#4b49c5","#4b4cca","#4b4ecf","#4b51d3","#4a54d7","#4a56db","#4959de","#495ce2","#485fe5","#4761e7","#4664ea","#4567ec","#446aee","#446df0","#426ff2","#4172f3","#4075f5","#3f78f6","#3e7af7","#3d7df7","#3c80f8","#3a83f9","#3985f9","#3888f9","#378bf9","#368df9","#3590f8","#3393f8","#3295f7","#3198f7","#309bf6","#2f9df5","#2ea0f4","#2da2f3","#2ca5f1","#2ba7f0","#2aaaef","#2aaced","#29afec","#28b1ea","#28b4e8","#27b6e6","#27b8e5","#26bbe3","#26bde1","#26bfdf","#25c1dc","#25c3da","#25c6d8","#25c8d6","#25cad3","#25ccd1","#25cecf","#26d0cc","#26d2ca","#26d4c8","#27d6c5","#27d8c3","#28d9c0","#29dbbe","#29ddbb","#2adfb8","#2be0b6","#2ce2b3","#2de3b1","#2ee5ae","#30e6ac","#31e8a9","#32e9a6","#34eba4","#35eca1","#37ed9f","#39ef9c","#3af09a","#3cf197","#3ef295","#40f392","#42f490","#44f58d","#46f68b","#48f788","#4af786","#4df884","#4ff981","#51fa7f","#54fa7d","#56fb7a","#59fb78","#5cfc76","#5efc74","#61fd71","#64fd6f","#66fd6d","#69fd6b","#6cfd69","#6ffe67","#72fe65","#75fe63","#78fe61","#7bfe5f","#7efd5d","#81fd5c","#84fd5a","#87fd58","#8afc56","#8dfc55","#90fb53","#93fb51","#96fa50","#99fa4e","#9cf94d","#9ff84b","#a2f84a","#a6f748","#a9f647","#acf546","#aff444","#b2f343","#b5f242","#b8f141","#bbf03f","#beef3e","#c1ed3d","#c3ec3c","#c6eb3b","#c9e93a","#cce839","#cfe738","#d1e537","#d4e336","#d7e235","#d9e034","#dcdf33","#dedd32","#e0db32","#e3d931","#e5d730","#e7d52f","#e9d42f","#ecd22e","#eed02d","#f0ce2c","#f1cb2c","#f3c92b","#f5c72b","#f7c52a","#f8c329","#fac029","#fbbe28","#fdbc28","#feb927","#ffb727","#ffb526","#ffb226","#ffb025","#ffad25","#ffab24","#ffa824","#ffa623","#ffa323","#ffa022","#ff9e22","#ff9b21","#ff9921","#ff9621","#ff9320","#ff9020","#ff8e1f","#ff8b1f","#ff881e","#ff851e","#ff831d","#ff801d","#ff7d1d","#ff7a1c","#ff781c","#ff751b","#ff721b","#ff6f1a","#fd6c1a","#fc6a19","#fa6719","#f96418","#f76118","#f65f18","#f45c17","#f25916","#f05716","#ee5415","#ec5115","#ea4f14","#e84c14","#e64913","#e44713","#e24412","#df4212","#dd3f11","#da3d10","#d83a10","#d5380f","#d3360f","#d0330e","#ce310d","#cb2f0d","#c92d0c","#c62a0b","#c3280b","#c1260a","#be2409","#bb2309","#b92108","#b61f07","#b41d07","#b11b06","#af1a05","#ac1805","#aa1704","#a81604","#a51403","#a31302","#a11202","#9f1101","#9d1000","#9b0f00","#9a0e00","#980e00","#960d00","#950c00","#940c00","#930c00","#920c00","#910b00","#910c00","#900c00","#900c00","#900c00"]);
    
    const rfactor=1.7;
    
   
    
    return (
    React$1__default.createElement( 'svg', { width: width, height: height },

        React$1__default.createElement( 'g', { transform: `translate(${marginLeft},${marginTop})` },
          React$1__default.createElement( 'g', { transform: `translate(${innerWidth-250},70)` },
            
            React$1__default.createElement( 'text', { 
              x: -650, y: -20, className: "title" }, "Internet Gender Gap Vs ", React$1__default.createElement( 'tspan', { x: "-650", y: "15" }, "Corruption Perception")
            ),
            React$1__default.createElement( 'text', { 
              x: -650, y: 5, className: "axis-label-1" },
              React$1__default.createElement( 'tspan', { x: "-650", y: "40" }, "Roll over or click on the circles "),
              React$1__default.createElement( 'tspan', { x: "-650", y: "65" }, "to see countries details"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "80", 'font-size': "10" }, "Source:"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "93", 'font-size': "10" },
                React$1__default.createElement( 'a', { 
                  href: "https://research.facebook.com/data/#data-for-good", className: "axis-label-1", target: "_blank" }, "https://research.facebook.com/data/#data-for-good"))
              
            ),
            React$1__default.createElement( 'text', { 
              x: -650, y: 300, className: "axis-label-1" },
              React$1__default.createElement( 'tspan', { x: "-650", y: "260", 'font-size': "15" }, "Internet Gender Gap"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "280", 'font-size': "10" }, "This measures the gap between male"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "290", 'font-size': "10" }, "and female access to the Internet"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "300", 'font-size': "10" }, "(% male access - % female access / % male access). "),
              React$1__default.createElement( 'tspan', { x: "-650", y: "310", 'font-size': "10" }, "Positive values indicate that male access"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "320", 'font-size': "10" }, "exceeds female access. "),
              React$1__default.createElement( 'tspan', { x: "-650", y: "330", 'font-size': "10" }, "A smaller or negative gap indicates"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "340", 'font-size': "10" }, "greater female connectivity. ")
                          ),

            React$1__default.createElement( 'text', { 
              x: -650, y: 300, className: "axis-label-1" },
              React$1__default.createElement( 'tspan', { x: "-650", y: "360", 'font-size': "15" }, "Corruption Perception"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "375", 'font-size': "10" }, "Compiled by Transparency International, measures the perceived"),
              React$1__default.createElement( 'tspan', { x: "-650", y: "385", 'font-size': "10" }, "levels of public-sector corruption worldwide.")
              ),
            
            React$1__default.createElement( 'text', { 
              x: -35, y: -20, className: "axis-label" }, "Corruption Perception"),
            
            React$1__default.createElement( 'text', { 
              x: -290, y: 410, className: "axis-label" },
              React$1__default.createElement( 'tspan', { 'font-size': "12" }, "Created by Jonas Carvalho Feb. 19th 2022")
            ),
            React$1__default.createElement( 'text', { 
              x: 0, y: 5, className: "axis-label-1" }, "- More Corrupt"),
            React$1__default.createElement( 'text', { 
              x: -0, y: 355, className: "axis-label-1" }, "- Less Corrupt"),


            React$1__default.createElement( ColorLegend, {
            colorScale: colorScale, tickTextOffset: 20, tickSpace: 30, tickSize: 10, innerWidth: innerWidth, data: data })),
          React$1__default.createElement( 'g', { transform: `translate(${innerWidth-150},130)` },
            React$1__default.createElement( 'text', { 
              x: -35, y: -20, className: "axis-label" }, "Internet Gender Gap"),
            React$1__default.createElement( SizeLegend, {
        
            tickTextOffset: 30, tickSpace: 30, tickSize: 10, innerWidth: innerWidth, data: data, rScale: rScale, yValue: yValue, rfactor: rfactor })),
           React$1__default.createElement( Marks, { 
            data: data, xScale: xScale, yScale: yScale, rScale: rScale, radialScale: radialScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxistickFormat, centerX: centerX, centerY: centerY, colorValue: colorValue, colorScale: colorScale, onHover: setHoveredValue, hoveredValue: hoveredValue, fadeOpacity: fadeOpacity, larr: larr, rfactor: rfactor })



         )
        
    
   	)
    );
  };

  const array=d3.range(1);

  const width=960; 
  const height=500;
  const margin={
    top:0,
    right:0,
    bottom:0,
    left:0
  };
  const xAxislabelOffset=70;
  const yAxislabelOffset=50;



  const App=()=>array.map((i)=>{ 
    console.log(i);
    return( 
  React$1__default.createElement( React$1__default.Fragment, null,
    React$1__default.createElement( Viz, {
      width: width, height: height, marginTop: margin.top, marginRight: margin.right, marginBottom: margin.bottom, marginLeft: margin.left, xAxislabelOffset: xAxislabelOffset, yAxislabelOffset: yAxislabelOffset })
   
   

  )
  )});

  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ),rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJyYW5kQXJyYXkuanMiLCJNYXJrcy5qcyIsIkNvbG9yTGVnZW5kLmpzIiwiU2l6ZUxlZ2VuZC5qcyIsIlZpei5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7dXNlU3RhdGUsdXNlQ2FsbGJhY2ssdXNlRWZmZWN0fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NzdixkZXNjZW5kaW5nLG1heCxtaW59IGZyb20gJ2QzJztcblxuY29uc3QgY3N2VXJsPSdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vSm9uODNDYXJ2YWxoby9EYXRhQW5kQXJ0L21haW4vaW50X2luZGV4LmNzdic7XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhPSgpPT57XG4gIGNvbnN0IFtkYXRhLHNldERhdGFdPXVzZVN0YXRlKG51bGwpO1xuICAgdXNlRWZmZWN0KCgpPT57XG4gICAgXG4gICAgY29uc3Qgcm93PWQ9PntcbiAgICAgICByZXR1cm4gZDtcbiAgICB9O1xuICAgIGNzdihjc3ZVcmwscm93KS50aGVuKHNldERhdGEpO1xuICAgIFxuICB9LFtdKTtcblxuIFxuXHRyZXR1cm4gZGF0YVxufVxuIiwiaW1wb3J0IFJlYWN0LHt1c2VTdGF0ZSx1c2VDYWxsYmFjayx1c2VFZmZlY3R9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3N2LGRlc2NlbmRpbmcsbWF4LG1pbn0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmw9J2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Kb244M0NhcnZhbGhvL0RhdGFBbmRBcnQvbWFpbi9yYW5kYXJyYXkuY3N2JztcblxuZXhwb3J0IGNvbnN0IHJhbmRBcnJheT0oKT0+e1xuICBjb25zdCBbZGF0YSxzZXREYXRhXT11c2VTdGF0ZShudWxsKTtcbiAgIHVzZUVmZmVjdCgoKT0+e1xuICAgIFxuICAgIGNvbnN0IHJvdz1kPT57XG4gICAgICAgcmV0dXJuIGQ7XG4gICAgfTtcbiAgICBjc3YoY3N2VXJsLHJvdykudGhlbihzZXREYXRhKTtcbiAgICBcbiAgfSxbXSk7XG5cbiBcblx0cmV0dXJuIGRhdGFcbn0iLCJpbXBvcnQgUmVhY3Qse21lbW8sdXNlU3RhdGUsdXNlQ2FsbGJhY2t9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkMyc7XG5cbmNvbnN0IGYgPSBmb3JtYXQoXCIuMWZcIik7XG5leHBvcnQgY29uc3QgTWFya3M9KHtcbiAgY29sb3JTY2FsZSxcbiAgY29sb3JWYWx1ZSxcbiAgdG9vbHRpcEZvcm1hdCxcbiAgZGF0YSxcbiAgeVNjYWxlLFxuICB4U2NhbGUsXG4gIHlWYWx1ZSxcbiAgeFZhbHVlLFxuICBjaXJjbGVSYWRpdXMsXG4gIHJTY2FsZSxcbiAgcmFkaWFsU2NhbGUsXG4gIGNlbnRlclgsXG4gIGNlbnRlclksXG4gIG9uSG92ZXIsXG4gIGhvdmVyZWRWYWx1ZSxcbiAgZmFkZU9wYWNpdHksXG4gIGxhcnIsXG4gIHJjaXJjbGUsXG4gIGNvdW50cnlMZWdlbmQsXG4gIHJmYWN0b3Jcbn0pPT57XG5cdGNvbnN0IHRlbXBvID0gbmV3IERhdGUoKTtcbiAgbGV0IHNlY29uZHMgPSB0ZW1wby5nZXRTZWNvbmRzKCk7XHRcbiAgY29uc3QgbWF4Yz1NYXRoLm1heC5hcHBseShNYXRoLCBkYXRhLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLkNvcnJ1cDsgfSkpXG4gIGNvbnN0IG1pbmc9TWF0aC5taW4uYXBwbHkoTWF0aCwgZGF0YS5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5HYXA7IH0pKVxuXG5cbiAgXG4gIFxuICByZXR1cm4gKFxuICAgICAgICBkYXRhLm1hcChmdW5jdGlvbihkLGkpe1xuICAgICAgICAgICBcdFx0XHRcdCAgXG4gIFx0XHRcdFx0XHRcdFx0XHRjb25zdCByYWQ9KChyYWRpYWxTY2FsZSgobWF4Yy14VmFsdWUoZCkrMzApKSkvMi43KVxuICAgICAgICAgICAgICBcbiAgICAgICAgICBcdFx0XHRcdHJldHVybiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICA8ZyBcbiAgICAgICAgXHRcdFx0XHRvcGFjaXR5PXtob3ZlcmVkVmFsdWUmJmQhPWhvdmVyZWRWYWx1ZT9mYWRlT3BhY2l0eToxfVxuICAgICAgICBcdFx0XHRcdG9uTW91c2VFbnRlcj17KCk9PntvbkhvdmVyKGQpfX1cbiAgICAgICAgXHRcdFx0XHRvbk1vdXNlT3V0PXsoKT0+e29uSG92ZXIobnVsbCl9fVxuICAgICAgICBcdFx0XHRcdD5cbiAgICAgICAgICAgICAgICBcdDxjaXJjbGUgXG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFya1wiXG4gICAgICAgICAgICAgICAgICAgY3g9e3JhZCpNYXRoLnNpbihNYXRoLmZsb29yKDEwMCpsYXJyW2krNDNdKjM2MC8xODApLzEwMCkrY2VudGVyWH0gXG4gICAgICAgICAgICAgICAgICAgY3k9e3JhZCpNYXRoLmNvcyhNYXRoLmZsb29yKDEwMCpsYXJyW2krNDNdKjM2MC8xODApLzEwMCkrY2VudGVyWX0gXG4gICAgICAgICAgICAgICAgICAgcj17clNjYWxlKCh5VmFsdWUoZCktbWluZykpLzEwMCpyZmFjdG9yfVxuICAgICAgICAgICAgICAgICAgIG9wYWNpdHk9XCIwLjhcIlxuICAgICAgICAgICAgICAgICAgIGZpbGw9e2NvbG9yU2NhbGUoY29sb3JWYWx1ZShkKSl9XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2NpcmNsZT5cblxuICAgICAgICAgICAgICAgICAgIDwvZz5cblxuICAgICAgICAgICAgICAgIDxnIG9wYWNpdHk9e2hvdmVyZWRWYWx1ZSYmZD09aG92ZXJlZFZhbHVlPzE6MH0+XG5cdFx0XHRcdFx0XHRcdFx0IDxyZWN0IHJ4PVwiMjBcIiByeT1cIjIwXCIgd2lkdGg9XCIyNDBcIiBoZWlnaHQ9XCIxMjBcIlxuICAgICAgICAgICAgICAgICAgb3BhY2l0eT17MC41fVxuICAgICAgICAgICAgICAgICAgeD17NTB9XG4gICAgICAgICAgICAgICAgICB5PXsxODB9XG4gICAgICAgICAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgIGZpbGw9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgXHRcdFxuICAgICAgICAgICAgICAgICAgPC9yZWN0Pjx0ZXh0XG4gICAgICAgICAgICAgICAgIGZvbnQtc2l6ZT1cIjE1XCIgXG4gICAgICAgICAgICAgICAgICBmaWxsPVwiYmxhY2tcIiBcbiAgICAgICAgICAgICAgICAgIHg9ezcwfVxuICAgICAgICAgICAgICAgICAgeT17MjQwfVxuICAgICAgICAgICAgICAgICAgZHk9XCIuMzJlbVwiXG4gXHRcdFx0XHRcdFx0XHQgICA+SW50ZXJuZXQgR2VuZGVyIEdhcDoge2YoZC5HYXApfTwvdGV4dD5cbiAgICAgICAgICAgICAgICAgPHRleHRcbiAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZT1cIjE1XCIgXG4gICAgICAgICAgICAgICAgICBmaWxsPVwiYmxhY2tcIiBcbiAgICAgICAgICAgICAgICAgIHg9ezcwfVxuICAgICAgICAgICAgICAgICAgeT17MjcwfVxuICAgICAgICAgICAgICAgICAgZHk9XCIuMzJlbVwiXG4gXHRcdFx0XHRcdFx0XHQgICA+Q29ycnVwdGlvbiBQZXJjZXB0aW9uOiB7ZC5Db3JydXB9PC90ZXh0PlxuICAgICAgICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICAgICAgICBmb250LXNpemU9XCIyNVwiIFxuICAgICAgICAgICAgICAgICAgZmlsbD1cImJsYWNrXCIgXG4gICAgICAgICAgICAgICAgICB4PXs3MH1cbiAgICAgICAgICAgICAgICAgIHk9ezIxMH1cbiAgICAgICAgICAgICAgICAgIGR5PVwiLjMyZW1cIlxuIFx0XHRcdFx0XHRcdFx0ICAgPkNvdW50cnk6IHtkLkNvdW50cnl9PC90ZXh0PlxuICAgICAgICAgICAgICAgICA8L2c+XG4gXG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG59XG4iLCJcbmltcG9ydCB7cmFuZ2UsZXh0ZW50fSBmcm9tICdkMyc7XG5leHBvcnQgY29uc3QgQ29sb3JMZWdlbmQ9KHtkYXRhLGlubmVyV2lkdGgsdGlja1RleHRPZmZzZXQ9MzAsY29sb3JTY2FsZSx0aWNrU3BhY2U9MTAsdGlja1NpemU9MTB9KT0+e1xuICB2YXIgaz0wO1xuICBcbiAgXG4gIFxuICByZXR1cm4gY29sb3JTY2FsZS5kb21haW4oKS5tYXAoKGRvbWFpblZhbHVlLGkpPT57XG4gIFx0XHRcblxuICAgIGlmIChpICUgOCA9PSAwKSB7XG4gICAgICBrPWsrMVxuICAgICAgcmV0dXJuIChcbiAgICAgIFxuICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7NS0xMzAqTWF0aC5jb3MoTWF0aC5QSS8xLjcrTWF0aC5QSS8xNyprKS0xMDB9LCR7KGkpKnRpY2tTcGFjZS84LjN9KWB9PlxuICAgICAgPGNpcmNsZSBmaWxsPXtjb2xvclNjYWxlKChkb21haW5WYWx1ZSkqMS4wKX0gcj17dGlja1NpemV9Lz5cbiAgICAgICAgPHRleHQgXG4gICAgICAgICAgZm9udC1zaXplPVwiMTVcIiBcbiAgICAgICAgICBmaWxsPVwid2hpdGVcIiBcbiAgICAgICAgICB4PXt0aWNrVGV4dE9mZnNldH0gXG4gICAgICAgICAgZHk9XCIuMzJlbVwiPntNYXRoLmZsb29yKGRvbWFpblZhbHVlKX08L3RleHQ+XG4gICAgICA8L2c+XG4gICAgICBcbiAgICApO1xuICAgIFxuICAgIFxuICAgIH07XG5cbiAgfSk7XG59IiwiaW1wb3J0IHtyYW5nZSxleHRlbnR9IGZyb20gJ2QzJztcbmV4cG9ydCBjb25zdCBTaXplTGVnZW5kPSh7cmZhY3RvcixyU2NhbGUsZGF0YSx5VmFsdWUsaW5uZXJXaWR0aCx0aWNrVGV4dE9mZnNldD0zMCx0aWNrU3BhY2U9MTAsdGlja1NpemU9MTB9KT0+e1xuIHZhciBrPTA7XG4gIGNvbnN0IG1pbmc9TWF0aC5taW4uYXBwbHkoTWF0aCwgZGF0YS5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5HYXA7IH0pKVxuXHRcbiAgY29uc3QgYXJyYXluPXJhbmdlKE1hdGguZmxvb3IoZXh0ZW50KGRhdGEubWFwKGQ9PitkLkdhcCkpWzBdKSxNYXRoLmZsb29yKGV4dGVudChkYXRhLm1hcChkPT4rZC5HYXApKVsxXSkrMi4pXG5cbiAgcmV0dXJuIGFycmF5bi5tYXAoKGRvbWFpblZhbHVlLGkpPT57XG4gIFx0XHRcbiAgICAgIFxuIGlmIChpJTM9PTAgJiYgZG9tYWluVmFsdWU+MCkge1xuICAgICBrPWsrMVxuICAgICAgcmV0dXJuIChcbiAgICAgIFxuICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHsxMC0zMDAqTWF0aC5jb3MoTWF0aC5QSS8xLjE3K01hdGguUEkvMzIqayktMjkwfSwkeyh0aWNrU3BhY2UrNTApKmkqaS80MDkuNSpyZmFjdG9yLTEwfSlgfT5cbiAgICAgIDxjaXJjbGUgZmlsbD1cIndoaXRlXCIgcj17clNjYWxlKChkb21haW5WYWx1ZS1taW5nKSkvMTAwKnJmYWN0b3J9Lz5cbiAgICAgICAgPHRleHQgXG4gICAgICAgICAgZm9udC1zaXplPVwiMTVcIiBcbiAgICAgICAgICBmaWxsPVwid2hpdGVcIiBcbiAgICAgICAgICB4PXt0aWNrVGV4dE9mZnNldH0gXG4gICAgICAgICAgZHk9XCIuMzJlbVwiPntkb21haW5WYWx1ZX08L3RleHQ+XG4gICAgICA8L2c+XG4gICAgICBcbiAgICk7XG4gICAgXG4gICAgXG4gICB9O1xuXG4gIH0pO1xufSIsImltcG9ydCBSZWFjdCx7bWVtbyx1c2VTdGF0ZSx1c2VDYWxsYmFjayx1c2VFZmZlY3R9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQge3NjYWxlT3JkaW5hbCxleHRlbnQsZm9ybWF0LGNzdixzY2FsZUJhbmQsc2NhbGVMaW5lYXIsbWF4LGFzY2VuZGluZyxkZXNjZW5kaW5nLGNvcyxzaW4sbWlufSBmcm9tICdkMyc7XG5pbXBvcnQge3VzZURhdGF9IGZyb20gJy4vdXNlRGF0YSdcbmltcG9ydCB7cmFuZEFycmF5fSBmcm9tICcuL3JhbmRBcnJheSdcblxuXG5pbXBvcnQge01hcmtzfSBmcm9tICcuL01hcmtzJ1xuaW1wb3J0IHtDb2xvckxlZ2VuZH0gZnJvbSAnLi9Db2xvckxlZ2VuZCdcbmltcG9ydCB7U2l6ZUxlZ2VuZH0gZnJvbSAnLi9TaXplTGVnZW5kJ1xuXG5cbmV4cG9ydCBjb25zdCBWaXo9KHt5QXhpc2xhYmVsT2Zmc2V0LHhBeGlzbGFiZWxPZmZzZXQsd2lkdGgsaGVpZ2h0LG1hcmdpblRvcCxtYXJnaW5SaWdodCxtYXJnaW5Cb3R0b20sbWFyZ2luTGVmdH0pPT57XG4gIGNvbnN0IGRhdGE9dXNlRGF0YSgpO1xuICBjb25zdCByYW5kPXJhbmRBcnJheSgpO1xuICBjb25zdCBbaG92ZXJlZFZhbHVlLHNldEhvdmVyZWRWYWx1ZV09dXNlU3RhdGUobnVsbClcblxuICBcbiAgIGlmKCFkYXRhKXtcbiAgIFxuICBcdHJldHVybiA8cHJlPi4uLmxvYWRpbmc8L3ByZT47XG4gIH07XG4gIFxuICAgIGlmKCFyYW5kKXtcbiAgIFxuICBcdHJldHVybiA8cHJlPi4uLmxvYWRpbmc8L3ByZT47XG4gIH07XG4gIFxuICBcbiAgY29uc3QgaW5uZXJIZWlnaHQ9aGVpZ2h0LW1hcmdpblRvcC1tYXJnaW5Cb3R0b207XG4gIGNvbnN0IGlubmVyV2lkdGg9d2lkdGgtbWFyZ2luTGVmdC1tYXJnaW5SaWdodDtcbiAgY29uc3QgY2VudGVyWD1pbm5lcldpZHRoLzI7XG4gIGNvbnN0IGNlbnRlclk9aW5uZXJIZWlnaHQvMjtcbiAgXG4gIFxuICBjb25zdCB4VmFsdWU9ZD0+ZC5Db3JydXA7XG5cbiBcbiAgY29uc3QgeVZhbHVlPWQ9PmQuR2FwO1xuICBjb25zdCBmYWRlT3BhY2l0eT0wLjI7XG4gIGNvbnN0IGxhcnI9W107XG5cbiAgcmFuZC5tYXAoKGQsaSk9PmxhcnIucHVzaChNYXRoLlBJKnJhbmRbaV0ubnVtYmVyKSlcbiAgXG5cbiAgY29uc3QgeEF4aXN0aWNrRm9ybWF0PXRpY2t2YWx1ZT0+c2lGb3JtYXQodGlja3ZhbHVlKS5yZXBsYWNlKCdHJywnQmknKTtcbiAgXG4gXG4gIGNvbnN0IHJTY2FsZSA9IHNjYWxlTGluZWFyKClcblx0XHQuZG9tYWluKGV4dGVudChkYXRhLHlWYWx1ZSkpXG4gIFx0LnJhbmdlKFswLCBpbm5lckhlaWdodF0pO1xuICBcbiAgXG4gIFxuIGNvbnN0IHJhZGlhbFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuXHRcdC5kb21haW4oZXh0ZW50KGRhdGEseFZhbHVlKSlcbiAgXHQucmFuZ2UoWzAsIGlubmVySGVpZ2h0XSk7XG5cbiAgXG4gIGNvbnN0IHhTY2FsZT1zY2FsZUxpbmVhcigpXG4gIFx0LmRvbWFpbihleHRlbnQoZGF0YSx4VmFsdWUpKVxuICBcdC5yYW5nZShbMCxpbm5lcldpZHRoXSk7XG4gIFxuXHRjb25zdCB5U2NhbGU9c2NhbGVMaW5lYXIoKVxuICAuZG9tYWluKGV4dGVudChkYXRhLHlWYWx1ZSkpXG4gIC5yYW5nZShbMCwgaW5uZXJIZWlnaHRdKVxuICBcbiAgY29uc3QgY29sb3JWYWx1ZT1kPT5kLkNvcnJ1cDtcbiAgXG4gICBjb25zdCBjb2xvclNjYWxlPXNjYWxlT3JkaW5hbCgpXG4gIFx0LmRvbWFpbihkYXRhLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEuQ29ycnVwLWIuQ29ycnVwfSkubWFwKGQ9PmQuQ29ycnVwKSlcbiAgXHQucmFuZ2UoW1wiIzIzMTcxYlwiLFwiIzI3MWEyOFwiLFwiIzJiMWMzM1wiLFwiIzJmMWUzZlwiLFwiIzMyMjA0YVwiLFwiIzM2MjM1NFwiLFwiIzM5MjU1ZlwiLFwiIzNiMjc2OFwiLFwiIzNlMmE3MlwiLFwiIzQwMmM3YlwiLFwiIzQyMmY4M1wiLFwiIzQ0MzE4YlwiLFwiIzQ1MzQ5M1wiLFwiIzQ2MzY5YlwiLFwiIzQ4MzlhMlwiLFwiIzQ5M2NhOFwiLFwiIzQ5M2VhZlwiLFwiIzRhNDFiNVwiLFwiIzRhNDRiYlwiLFwiIzRiNDZjMFwiLFwiIzRiNDljNVwiLFwiIzRiNGNjYVwiLFwiIzRiNGVjZlwiLFwiIzRiNTFkM1wiLFwiIzRhNTRkN1wiLFwiIzRhNTZkYlwiLFwiIzQ5NTlkZVwiLFwiIzQ5NWNlMlwiLFwiIzQ4NWZlNVwiLFwiIzQ3NjFlN1wiLFwiIzQ2NjRlYVwiLFwiIzQ1NjdlY1wiLFwiIzQ0NmFlZVwiLFwiIzQ0NmRmMFwiLFwiIzQyNmZmMlwiLFwiIzQxNzJmM1wiLFwiIzQwNzVmNVwiLFwiIzNmNzhmNlwiLFwiIzNlN2FmN1wiLFwiIzNkN2RmN1wiLFwiIzNjODBmOFwiLFwiIzNhODNmOVwiLFwiIzM5ODVmOVwiLFwiIzM4ODhmOVwiLFwiIzM3OGJmOVwiLFwiIzM2OGRmOVwiLFwiIzM1OTBmOFwiLFwiIzMzOTNmOFwiLFwiIzMyOTVmN1wiLFwiIzMxOThmN1wiLFwiIzMwOWJmNlwiLFwiIzJmOWRmNVwiLFwiIzJlYTBmNFwiLFwiIzJkYTJmM1wiLFwiIzJjYTVmMVwiLFwiIzJiYTdmMFwiLFwiIzJhYWFlZlwiLFwiIzJhYWNlZFwiLFwiIzI5YWZlY1wiLFwiIzI4YjFlYVwiLFwiIzI4YjRlOFwiLFwiIzI3YjZlNlwiLFwiIzI3YjhlNVwiLFwiIzI2YmJlM1wiLFwiIzI2YmRlMVwiLFwiIzI2YmZkZlwiLFwiIzI1YzFkY1wiLFwiIzI1YzNkYVwiLFwiIzI1YzZkOFwiLFwiIzI1YzhkNlwiLFwiIzI1Y2FkM1wiLFwiIzI1Y2NkMVwiLFwiIzI1Y2VjZlwiLFwiIzI2ZDBjY1wiLFwiIzI2ZDJjYVwiLFwiIzI2ZDRjOFwiLFwiIzI3ZDZjNVwiLFwiIzI3ZDhjM1wiLFwiIzI4ZDljMFwiLFwiIzI5ZGJiZVwiLFwiIzI5ZGRiYlwiLFwiIzJhZGZiOFwiLFwiIzJiZTBiNlwiLFwiIzJjZTJiM1wiLFwiIzJkZTNiMVwiLFwiIzJlZTVhZVwiLFwiIzMwZTZhY1wiLFwiIzMxZThhOVwiLFwiIzMyZTlhNlwiLFwiIzM0ZWJhNFwiLFwiIzM1ZWNhMVwiLFwiIzM3ZWQ5ZlwiLFwiIzM5ZWY5Y1wiLFwiIzNhZjA5YVwiLFwiIzNjZjE5N1wiLFwiIzNlZjI5NVwiLFwiIzQwZjM5MlwiLFwiIzQyZjQ5MFwiLFwiIzQ0ZjU4ZFwiLFwiIzQ2ZjY4YlwiLFwiIzQ4Zjc4OFwiLFwiIzRhZjc4NlwiLFwiIzRkZjg4NFwiLFwiIzRmZjk4MVwiLFwiIzUxZmE3ZlwiLFwiIzU0ZmE3ZFwiLFwiIzU2ZmI3YVwiLFwiIzU5ZmI3OFwiLFwiIzVjZmM3NlwiLFwiIzVlZmM3NFwiLFwiIzYxZmQ3MVwiLFwiIzY0ZmQ2ZlwiLFwiIzY2ZmQ2ZFwiLFwiIzY5ZmQ2YlwiLFwiIzZjZmQ2OVwiLFwiIzZmZmU2N1wiLFwiIzcyZmU2NVwiLFwiIzc1ZmU2M1wiLFwiIzc4ZmU2MVwiLFwiIzdiZmU1ZlwiLFwiIzdlZmQ1ZFwiLFwiIzgxZmQ1Y1wiLFwiIzg0ZmQ1YVwiLFwiIzg3ZmQ1OFwiLFwiIzhhZmM1NlwiLFwiIzhkZmM1NVwiLFwiIzkwZmI1M1wiLFwiIzkzZmI1MVwiLFwiIzk2ZmE1MFwiLFwiIzk5ZmE0ZVwiLFwiIzljZjk0ZFwiLFwiIzlmZjg0YlwiLFwiI2EyZjg0YVwiLFwiI2E2Zjc0OFwiLFwiI2E5ZjY0N1wiLFwiI2FjZjU0NlwiLFwiI2FmZjQ0NFwiLFwiI2IyZjM0M1wiLFwiI2I1ZjI0MlwiLFwiI2I4ZjE0MVwiLFwiI2JiZjAzZlwiLFwiI2JlZWYzZVwiLFwiI2MxZWQzZFwiLFwiI2MzZWMzY1wiLFwiI2M2ZWIzYlwiLFwiI2M5ZTkzYVwiLFwiI2NjZTgzOVwiLFwiI2NmZTczOFwiLFwiI2QxZTUzN1wiLFwiI2Q0ZTMzNlwiLFwiI2Q3ZTIzNVwiLFwiI2Q5ZTAzNFwiLFwiI2RjZGYzM1wiLFwiI2RlZGQzMlwiLFwiI2UwZGIzMlwiLFwiI2UzZDkzMVwiLFwiI2U1ZDczMFwiLFwiI2U3ZDUyZlwiLFwiI2U5ZDQyZlwiLFwiI2VjZDIyZVwiLFwiI2VlZDAyZFwiLFwiI2YwY2UyY1wiLFwiI2YxY2IyY1wiLFwiI2YzYzkyYlwiLFwiI2Y1YzcyYlwiLFwiI2Y3YzUyYVwiLFwiI2Y4YzMyOVwiLFwiI2ZhYzAyOVwiLFwiI2ZiYmUyOFwiLFwiI2ZkYmMyOFwiLFwiI2ZlYjkyN1wiLFwiI2ZmYjcyN1wiLFwiI2ZmYjUyNlwiLFwiI2ZmYjIyNlwiLFwiI2ZmYjAyNVwiLFwiI2ZmYWQyNVwiLFwiI2ZmYWIyNFwiLFwiI2ZmYTgyNFwiLFwiI2ZmYTYyM1wiLFwiI2ZmYTMyM1wiLFwiI2ZmYTAyMlwiLFwiI2ZmOWUyMlwiLFwiI2ZmOWIyMVwiLFwiI2ZmOTkyMVwiLFwiI2ZmOTYyMVwiLFwiI2ZmOTMyMFwiLFwiI2ZmOTAyMFwiLFwiI2ZmOGUxZlwiLFwiI2ZmOGIxZlwiLFwiI2ZmODgxZVwiLFwiI2ZmODUxZVwiLFwiI2ZmODMxZFwiLFwiI2ZmODAxZFwiLFwiI2ZmN2QxZFwiLFwiI2ZmN2ExY1wiLFwiI2ZmNzgxY1wiLFwiI2ZmNzUxYlwiLFwiI2ZmNzIxYlwiLFwiI2ZmNmYxYVwiLFwiI2ZkNmMxYVwiLFwiI2ZjNmExOVwiLFwiI2ZhNjcxOVwiLFwiI2Y5NjQxOFwiLFwiI2Y3NjExOFwiLFwiI2Y2NWYxOFwiLFwiI2Y0NWMxN1wiLFwiI2YyNTkxNlwiLFwiI2YwNTcxNlwiLFwiI2VlNTQxNVwiLFwiI2VjNTExNVwiLFwiI2VhNGYxNFwiLFwiI2U4NGMxNFwiLFwiI2U2NDkxM1wiLFwiI2U0NDcxM1wiLFwiI2UyNDQxMlwiLFwiI2RmNDIxMlwiLFwiI2RkM2YxMVwiLFwiI2RhM2QxMFwiLFwiI2Q4M2ExMFwiLFwiI2Q1MzgwZlwiLFwiI2QzMzYwZlwiLFwiI2QwMzMwZVwiLFwiI2NlMzEwZFwiLFwiI2NiMmYwZFwiLFwiI2M5MmQwY1wiLFwiI2M2MmEwYlwiLFwiI2MzMjgwYlwiLFwiI2MxMjYwYVwiLFwiI2JlMjQwOVwiLFwiI2JiMjMwOVwiLFwiI2I5MjEwOFwiLFwiI2I2MWYwN1wiLFwiI2I0MWQwN1wiLFwiI2IxMWIwNlwiLFwiI2FmMWEwNVwiLFwiI2FjMTgwNVwiLFwiI2FhMTcwNFwiLFwiI2E4MTYwNFwiLFwiI2E1MTQwM1wiLFwiI2EzMTMwMlwiLFwiI2ExMTIwMlwiLFwiIzlmMTEwMVwiLFwiIzlkMTAwMFwiLFwiIzliMGYwMFwiLFwiIzlhMGUwMFwiLFwiIzk4MGUwMFwiLFwiIzk2MGQwMFwiLFwiIzk1MGMwMFwiLFwiIzk0MGMwMFwiLFwiIzkzMGMwMFwiLFwiIzkyMGMwMFwiLFwiIzkxMGIwMFwiLFwiIzkxMGMwMFwiLFwiIzkwMGMwMFwiLFwiIzkwMGMwMFwiLFwiIzkwMGMwMFwiXSk7XG4gIFxuICBjb25zdCByZmFjdG9yPTEuN1xuICBcbiBcbiAgXG4gIHJldHVybiAoXG4gIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG5cbiAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbkxlZnR9LCR7bWFyZ2luVG9wfSlgfT5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7aW5uZXJXaWR0aC0yNTB9LDcwKWB9PlxuICAgICAgICAgIFxuICAgICAgICAgIDx0ZXh0IFxuICAgICAgICAgICAgeD17LTY1MH1cbiAgICAgICAgICAgIHk9ey0yMH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpdGxlXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPlxuICAgICAgICAgIEludGVybmV0IEdlbmRlciBHYXAgVnMgXG4gICAgICAgICAgICA8dHNwYW4geD1cIi02NTBcIiB5PVwiMTVcIj5Db3JydXB0aW9uIFBlcmNlcHRpb248L3RzcGFuPlxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBcbiAgICAgICAgICAgIHg9ey02NTB9XG4gICAgICAgICAgICB5PXs1fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbC0xXCI+XG4gICAgICAgICAgICA8dHNwYW4geD1cIi02NTBcIiB5PVwiNDBcIj5Sb2xsIG92ZXIgb3IgY2xpY2sgb24gdGhlIGNpcmNsZXMgPC90c3Bhbj5cbiAgICAgICAgICAgIDx0c3BhbiB4PVwiLTY1MFwiIHk9XCI2NVwiPnRvIHNlZSBjb3VudHJpZXMgZGV0YWlsczwvdHNwYW4+XG4gICAgICAgICAgICA8dHNwYW4geD1cIi02NTBcIiB5PVwiODBcIiBmb250LXNpemU9XCIxMFwiPlNvdXJjZTo8L3RzcGFuPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjkzXCIgZm9udC1zaXplPVwiMTBcIj5cbiAgICAgICAgICAgICAgPGEgXG4gICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vcmVzZWFyY2guZmFjZWJvb2suY29tL2RhdGEvI2RhdGEtZm9yLWdvb2RcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWwtMVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgIGh0dHBzOi8vcmVzZWFyY2guZmFjZWJvb2suY29tL2RhdGEvI2RhdGEtZm9yLWdvb2RcbiAgICAgICAgICAgICAgPC9hPjwvdHNwYW4+XG4gICAgICAgICAgICBcbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgPHRleHQgXG4gICAgICAgICAgICB4PXstNjUwfVxuICAgICAgICAgICAgeT17MzAwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbC0xXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjI2MFwiIGZvbnQtc2l6ZT1cIjE1XCI+SW50ZXJuZXQgR2VuZGVyIEdhcDwvdHNwYW4+XG4gICAgICAgICAgICA8dHNwYW4geD1cIi02NTBcIiB5PVwiMjgwXCIgZm9udC1zaXplPVwiMTBcIj5UaGlzIG1lYXN1cmVzIHRoZSBnYXAgYmV0d2VlbiBtYWxlPC90c3Bhbj5cbiAgICAgICAgICAgIDx0c3BhbiB4PVwiLTY1MFwiIHk9XCIyOTBcIiBmb250LXNpemU9XCIxMFwiPmFuZCBmZW1hbGUgYWNjZXNzIHRvIHRoZSBJbnRlcm5ldDwvdHNwYW4+XG4gICAgICAgICAgICA8dHNwYW4geD1cIi02NTBcIiB5PVwiMzAwXCIgZm9udC1zaXplPVwiMTBcIj4oJSBtYWxlIGFjY2VzcyAtICUgZmVtYWxlIGFjY2VzcyAvICUgbWFsZSBhY2Nlc3MpLiA8L3RzcGFuPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjMxMFwiIGZvbnQtc2l6ZT1cIjEwXCI+UG9zaXRpdmUgdmFsdWVzIGluZGljYXRlIHRoYXQgbWFsZSBhY2Nlc3M8L3RzcGFuPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjMyMFwiIGZvbnQtc2l6ZT1cIjEwXCI+ZXhjZWVkcyBmZW1hbGUgYWNjZXNzLiA8L3RzcGFuPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjMzMFwiIGZvbnQtc2l6ZT1cIjEwXCI+QSBzbWFsbGVyIG9yIG5lZ2F0aXZlIGdhcCBpbmRpY2F0ZXM8L3RzcGFuPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjM0MFwiIGZvbnQtc2l6ZT1cIjEwXCI+Z3JlYXRlciBmZW1hbGUgY29ubmVjdGl2aXR5LiA8L3RzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuXG4gICAgICAgICAgPHRleHQgXG4gICAgICAgICAgICB4PXstNjUwfVxuICAgICAgICAgICAgeT17MzAwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbC0xXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRzcGFuIHg9XCItNjUwXCIgeT1cIjM2MFwiIGZvbnQtc2l6ZT1cIjE1XCI+Q29ycnVwdGlvbiBQZXJjZXB0aW9uPC90c3Bhbj5cbiAgICAgICAgICAgIDx0c3BhbiB4PVwiLTY1MFwiIHk9XCIzNzVcIiBmb250LXNpemU9XCIxMFwiPkNvbXBpbGVkIGJ5IFRyYW5zcGFyZW5jeSBJbnRlcm5hdGlvbmFsLCBtZWFzdXJlcyB0aGUgcGVyY2VpdmVkPC90c3Bhbj5cbiAgICAgICAgICAgIDx0c3BhbiB4PVwiLTY1MFwiIHk9XCIzODVcIiBmb250LXNpemU9XCIxMFwiPmxldmVscyBvZiBwdWJsaWMtc2VjdG9yIGNvcnJ1cHRpb24gd29ybGR3aWRlLjwvdHNwYW4+XG4gICAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgXG4gICAgICAgICAgPHRleHQgXG4gICAgICAgICAgICB4PXstMzV9XG4gICAgICAgICAgICB5PXstMjB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCI+Q29ycnVwdGlvbiBQZXJjZXB0aW9uXG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIFxuICAgICAgICAgIDx0ZXh0IFxuICAgICAgICAgICAgeD17LTI5MH1cbiAgICAgICAgICAgIHk9ezQxMH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIiA+XG4gICAgICAgICAgICA8dHNwYW4gZm9udC1zaXplPVwiMTJcIj5DcmVhdGVkIGJ5IEpvbmFzIENhcnZhbGhvIEZlYi4gMTl0aCAyMDIyPC90c3Bhbj5cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgPHRleHQgXG4gICAgICAgICAgICB4PXswfVxuICAgICAgICAgICAgeT17NX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWwtMVwiPi0gTW9yZSBDb3JydXB0XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IFxuICAgICAgICAgICAgeD17LTB9XG4gICAgICAgICAgICB5PXszNTV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsLTFcIj4tIExlc3MgQ29ycnVwdFxuICAgICAgICAgIDwvdGV4dD5cblxuXG4gICAgICAgICAgPENvbG9yTGVnZW5kXG4gICAgICAgICAgY29sb3JTY2FsZT17Y29sb3JTY2FsZX1cbiAgICAgICAgICB0aWNrVGV4dE9mZnNldD17MjB9XG4gICAgICAgICAgdGlja1NwYWNlPXszMH1cbiAgICAgICAgICB0aWNrU2l6ZT17MTB9XG4gICAgICAgICAgaW5uZXJXaWR0aD17aW5uZXJXaWR0aH1cbiAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgIC8+PC9nPlxuICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoLTE1MH0sMTMwKWB9PlxuICAgICAgICAgIDx0ZXh0IFxuICAgICAgICAgICAgeD17LTM1fVxuICAgICAgICAgICAgeT17LTIwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiPkludGVybmV0IEdlbmRlciBHYXA8L3RleHQ+XG4gICAgICAgICAgPFNpemVMZWdlbmRcbiAgICAgIFxuICAgICAgICAgIHRpY2tUZXh0T2Zmc2V0PXszMH1cbiAgICAgICAgICB0aWNrU3BhY2U9ezMwfVxuICAgICAgICAgIHRpY2tTaXplPXsxMH1cbiAgICAgICAgICBpbm5lcldpZHRoPXtpbm5lcldpZHRofVxuICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgIHJTY2FsZT17clNjYWxlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICByZmFjdG9yPXtyZmFjdG9yfVxuICAgICAgICAgIC8+PC9nPlxuICAgICAgICAgPE1hcmtzIFxuICAgICAgICAgIGRhdGE9e2RhdGF9IFxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfSBcbiAgICAgICAgICB5U2NhbGU9e3lTY2FsZX1cbiAgICAgICAgICByU2NhbGU9e3JTY2FsZX1cbiAgICAgICAgICByYWRpYWxTY2FsZT17cmFkaWFsU2NhbGV9XG4gICAgICAgICAgeFZhbHVlPXt4VmFsdWV9XG4gICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgdG9vbHRpcEZvcm1hdD17eEF4aXN0aWNrRm9ybWF0fVxuICAgICAgICAgIGNlbnRlclg9e2NlbnRlclh9XG4gICAgICAgICAgY2VudGVyWT17Y2VudGVyWX1cbiAgICAgICAgICBjb2xvclZhbHVlPXtjb2xvclZhbHVlfVxuICAgICAgICAgIGNvbG9yU2NhbGU9e2NvbG9yU2NhbGV9XG4gICAgICAgICAgb25Ib3Zlcj17c2V0SG92ZXJlZFZhbHVlfVxuICAgICAgICAgIGhvdmVyZWRWYWx1ZT17aG92ZXJlZFZhbHVlfVxuICAgICAgICAgIGZhZGVPcGFjaXR5PXtmYWRlT3BhY2l0eX1cbiAgICAgICAgICAgbGFycj17bGFycn1cbiAgICAgICAgICAgcmZhY3Rvcj17cmZhY3Rvcn1cbiAgICAgICAgLz5cblxuXG5cbiAgICAgICA8L2c+XG4gICAgICBcbiAgXG4gXHQ8L3N2Zz5cbiAgKTtcbn07ICBcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ2QzJztcblxuXG5pbXBvcnQge1Zpen0gZnJvbSAnLi9WaXonO1xuXG5cblxuY29uc3QgY2lyY2xlUmFkaXVzPTMwO1xuXG5jb25zdCBhcnJheT1yYW5nZSgxKTtcblxuY29uc3Qgd2lkdGg9OTYwOyBcbmNvbnN0IGhlaWdodD01MDA7XG5jb25zdCBtYXJnaW49e1xuICB0b3A6MCxcbiAgcmlnaHQ6MCxcbiAgYm90dG9tOjAsXG4gIGxlZnQ6MFxufTtcbmNvbnN0IHhBeGlzbGFiZWxPZmZzZXQ9NzA7XG5jb25zdCB5QXhpc2xhYmVsT2Zmc2V0PTUwO1xuXG5cblxuY29uc3QgQXBwPSgpPT5hcnJheS5tYXAoKGkpPT57IFxuICBjb25zb2xlLmxvZyhpKVxuICByZXR1cm4oIFxuPD5cbiAgPFZpelxuICAgIHdpZHRoPXt3aWR0aH1cbiAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICBtYXJnaW5Ub3A9e21hcmdpbi50b3B9XG4gICAgbWFyZ2luUmlnaHQ9e21hcmdpbi5yaWdodH1cbiAgICBtYXJnaW5Cb3R0b209e21hcmdpbi5ib3R0b219XG4gICAgbWFyZ2luTGVmdD17bWFyZ2luLmxlZnR9XG4gICAgeEF4aXNsYWJlbE9mZnNldD17eEF4aXNsYWJlbE9mZnNldH1cbiAgICB5QXhpc2xhYmVsT2Zmc2V0PXt5QXhpc2xhYmVsT2Zmc2V0fVxuICAgIFxuICAgIC8+XG4gXG4gXG5cbjwvPlxuKX0pO1xuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcC8+LHJvb3RFbGVtZW50KTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJjc3YiLCJjc3ZVcmwiLCJmb3JtYXQiLCJSZWFjdCIsInJhbmdlIiwiZXh0ZW50Iiwic2NhbGVMaW5lYXIiLCJzY2FsZU9yZGluYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUdBLE1BQU0sTUFBTSxDQUFDLCtFQUErRSxDQUFDO0FBQzdGO0VBQ08sTUFBTSxPQUFPLENBQUMsSUFBSTtFQUN6QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNBLGdCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdEMsR0FBR0MsaUJBQVMsQ0FBQyxJQUFJO0VBQ2pCO0VBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDakIsT0FBTyxPQUFPLENBQUMsQ0FBQztFQUNoQixLQUFLLENBQUM7RUFDTixJQUFJQyxNQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNsQztFQUNBLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNSO0VBQ0E7RUFDQSxDQUFDLE9BQU8sSUFBSTtFQUNaOztFQ2ZBLE1BQU1DLFFBQU0sQ0FBQywrRUFBK0UsQ0FBQztBQUM3RjtFQUNPLE1BQU0sU0FBUyxDQUFDLElBQUk7RUFDM0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDSCxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3RDLEdBQUdDLGlCQUFTLENBQUMsSUFBSTtFQUNqQjtFQUNBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxF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LE1BQU0sQ0FBQ0QsU0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUM5QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBQztFQUMxQjtFQUNBLEVBQUUsTUFBTSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7RUFDL0I7RUFDQSxHQUFHLE1BQU0sVUFBVSxDQUFDRSxlQUFZLEVBQUU7RUFDbEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDaEYsSUFBSSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNB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