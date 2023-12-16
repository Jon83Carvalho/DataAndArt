export function firstGradient (bar,def) {



bar = def.append('linearGradient')
.attr('id', 'barsGrad')
.attr('x1', '0%')
.attr('x2', "100%")
.attr("y1", "0%")
.attr("y2","0%")


// Create the stops of the main gradient. Each stop will be assigned
// a class to style the stop using CSS.
bar.append('stop')
.attr("class", "start")
.attr("offset", "0%")
.attr("stop-color", "#08faff")
.attr("stop-opacity", 0.5);

bar.append('stop')
.attr("class", "start")
.attr("offset", "1%")
.attr("stop-color", "#08faff")
.attr("stop-opacity", 0.5);

bar.append('stop')
.attr("class", "midle")
.attr("offset", "1.5%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 1);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "5%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 1);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "30%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 0.75);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "50%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 0.2);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "70%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 0.75);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "95%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 1);

bar.append('stop')
.attr("class", "midle")
.attr("offset", "98%")
.attr("stop-color", "#006a6c")
.attr("stop-opacity", 1);


bar.append('stop')
.attr("class", "midle")
.attr("offset", "99.5%")
.attr("stop-color", "#08faff")
.attr("stop-opacity", 0.5);




bar.append('stop')
.attr("class", "midle")
.attr("offset", "100%")
.attr("stop-color", "#08faff")
.attr("stop-opacity", 0.5);




}


export function secondGradient (bar,def) {



    bar = def.append('linearGradient')
    .attr('id', 'barsGrad-2')
    .attr('x1', '0%')
    .attr('x2', "100%")
    .attr("y1", "0%")
    .attr("y2","0%")
    
    
    // Create the stops of the main gradient. Each stop will be assigned
    // a class to style the stop using CSS.
    bar.append('stop')
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "purple")
    .attr("stop-opacity", 1);
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "5%")
    .attr("stop-color", "purple")
    .attr("stop-opacity", 0.95);
    
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "30%")
    .attr("stop-color", "black")
    .attr("stop-opacity", 0.6);
    
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "50%")
    .attr("stop-color", "black")
    .attr("stop-opacity", 0.2);
    
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "70%")
    .attr("stop-color", "black")
    .attr("stop-opacity", 0.6);
    
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "95%")
    .attr("stop-color", "purple")
    .attr("stop-opacity", 0.95);
    
    
    
    bar.append('stop')
    .attr("class", "midle")
    .attr("offset", "100%")
    .attr("stop-color", "purple")
    .attr("stop-opacity", 1);
    
    
    
    
    }