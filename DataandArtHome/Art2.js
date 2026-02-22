import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import * as d3 from 'd3';
import { Image } from 'react-native';
import { useEscapeKey } from './useEscapeKey';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.7,
    zIndex: 5,
    top: 20,
    right: 20,
  },
});

export default function Art2({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tooltipData, setTooltipData] = useState(null);
  
  // Add escape key functionality for web
  useEscapeKey(() => navigation.goBack());

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
      setDimensions({
        width: screenWidth - 40, // Account for padding
        height: screenHeight - 200 // Account for header, title, and navigation hints
      });
    };

    updateDimensions();
    
    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  // Fetch CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Jon83Carvalho/DataAndArt/main/int_index.csv');
        const csvText = await response.text();
        
        // Parse CSV data
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            Country: values[0],
            Corrup: parseFloat(values[1]),
            Gap: parseFloat(values[2])
          };
        });
        
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create visualization
  useEffect(() => {
    if (!svgRef.current || !data || loading) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    
    svg.attr('width', width).attr('height', height);

    // Sort data alphabetically by country name
    const sortedData = [...data].sort((a, b) => a.Country.localeCompare(b.Country));
    
    // Create scales
    const radiusScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Corrup))
      .range([50, Math.min(width, height) / 2 - 50]);

    const gapScale = d3.scaleLinear()
      .domain(d3.extent(data, d => Math.abs(d.Gap)))
      .range([5, 45]); // Angle span in degrees (much larger range)

    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain(d3.extent(data, d => d.Corrup));

    // Center coordinates
    const centerX = width / 2;
    const centerY = height / 2;

    // Add eye image in background
    
    // Add circular grid lines
    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      const radius = (radiusScale.range()[1] / gridLevels) * i;
      svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', '#444')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.5);
    }

    // Add radial lines
    const radialLines = 12;
    for (let i = 0; i < radialLines; i++) {
      const angle = (i / radialLines) * 2 * Math.PI;
      const x = centerX + Math.cos(angle) * radiusScale.range()[1];
      const y = centerY + Math.sin(angle) * radiusScale.range()[1];
      
      svg.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#444')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.5);
    }

    // Create polar sectors for each country
    const sectors = svg.selectAll('path.sector')
      .data(sortedData)
      .enter()
      .append('path')
      .attr('class', 'sector')
      .attr('transform', `translate(${centerX}, ${centerY})`)
      .attr('d', (d, i) => {
        // Calculate angle span proportional to gender gap
        const angleSpan = gapScale(Math.abs(d.Gap)) * (Math.PI / 180); // Convert to radians
        
        // Calculate polar position proportional to alphabetical order
        const totalCountries = sortedData.length;
        const anglePosition = (i / totalCountries) * 2 * Math.PI; // Full 360 degrees
        const startAngle = anglePosition - angleSpan / 2; // Center on alphabetical position
        const endAngle = anglePosition + angleSpan / 2;
        
        // Radius based on corruption perception (radial translation)
        const innerRadius = radiusScale(d.Corrup) * 0.8; // Inner radius based on corruption (increased spread)
        const outerRadius = innerRadius + 40; // Fixed thickness (40px)
        
        // Create arc path
        const arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(startAngle)
          .endAngle(endAngle);
        
        return arc();
      })
      .attr('fill', d => colorScale(d.Corrup))
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.8)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('stroke-width', 2);
        setTooltipData(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.8)
          .attr('stroke-width', 0.5);
        setTooltipData(null);
      });

    // Add center circle
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 5)
      .attr('fill', '#fff')
      .attr('opacity', 0.8);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Sunburst: Internet Gender Gap vs Corruption Perception');

    // Add legend
    const legendX = width / 2 + radiusScale.range()[1] + 20; // Just outside outer radius
    const legendY = 40;
    
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('fill', '#fff')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Corruption Level');

    // Color legend
    const legendColorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, 100]);
    
    for (let i = 0; i <= 10; i++) {
      const value = i * 10;
      svg.append('rect')
        .attr('x', legendX)
        .attr('y', legendY + 10 + i * 15)
        .attr('width', 15)
        .attr('height', 12)
        .attr('fill', legendColorScale(value));
      
      svg.append('text')
        .attr('x', legendX + 20)
        .attr('y', legendY + 20 + i * 15)
        .attr('fill', '#fff')
        .style('font-size', '10px')
        .text(value);
    }

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 180)
      .attr('fill', '#fff')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Gender Gap');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 195)
      .attr('fill', '#fff')
      .style('font-size', '10px')
      .text('(Sector width)');

    // Add explanatory text
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 215)
      .attr('fill', '#aaa')
      .style('font-size', '9px')
      .text('Wider sectors =');
    
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 227)
      .attr('fill', '#aaa')
      .style('font-size', '9px')
      .text('larger gap');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 243)
      .attr('fill', '#aaa')
      .style('font-size', '9px')
      .text('Distance from');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + 255)
      .attr('fill', '#aaa')
      .style('font-size', '9px')
      .text('center = corruption');

    return () => {
    // Tooltip cleanup removed - using React state instead
  };
  }, [data, dimensions, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Gallery</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Network Connections</Text>
        <Text style={{color: '#fff', fontSize: 16}}>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Internet Gender Gap Analysis</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery
        </Text>
      )}
     
      <View style={styles.svgContainer}>
        {tooltipData && (
          <View style={{
            position: 'absolute',
            left: '50%', // Perfect horizontal center
            top: '50%', // Perfect vertical center
            marginLeft: -40, // Offset by half the width
            marginTop: -40, // Offset by half the height
            width: 80,
            height: 80,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 40, // Makes it a circle
            zIndex: 9999,
            borderWidth: 2,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Gap text above country name */}
            <Text style={{ 
              position: 'absolute',
              color: '#fff', 
              fontSize: 8, 
              textAlign: 'center',
              width: 70,
              left: 5,
              top: 22, // Positioned above centered country name
            }}>
              Gap: {tooltipData.Gap}%
            </Text>
            
            {/* Country name in perfect center */}
            <Text style={{ 
              position: 'absolute',
              color: '#fff', 
              fontSize: 10, 
              fontWeight: 'bold', 
              textAlign: 'center',
              width: 70,
              left: 5,
              top: 35, // Perfect center of 80px circle (40 - 10/2 = 35)
            }}>
              {tooltipData.Country}
            </Text>
            
            {/* Corruption text below country name */}
            <Text style={{ 
              position: 'absolute',
              color: '#fff', 
              fontSize: 8, 
              textAlign: 'center',
              width: 70,
              left: 5,
              top: 48, // Positioned below centered country name
            }}>
              Corruption: {tooltipData.Corrup}
            </Text>
          </View>
        )}
        <Image
          style={styles.icon}
          source={require("./assets/StartScreen.jpg")}
          resizeMode="cover"
        />
        
        <svg width={dimensions.width} height={dimensions.height} ref={svgRef} style={{zIndex: 3}}></svg>
         <Image
          style={{
            position: 'absolute',
            width: dimensions.width,
            height: dimensions.height,
            opacity: 0.4,
            zIndex: 2
          }}
          source={require("./assets/eye.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
