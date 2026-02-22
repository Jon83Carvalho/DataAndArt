import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
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
});

export default function Art3({ navigation }) {
  const svgRef = useRef(null);
  
  // Add escape key functionality for web
  useEscapeKey(() => navigation.goBack());

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    
    svg.attr('width', width).attr('height', height);

    const data = Array.from({ length: 100 }, () => ({
      value: Math.random() * 100,
      category: Math.floor(Math.random() * 5)
    }));

    const colorScale = d3.scaleSequential(d3.interpolateRainbow)
      .domain([0, 100]);

    const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([50, width - 50]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - 50, 50]);

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.value))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', d => colorScale(50))
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', d => colorScale(d.value))
      .attr('opacity', 0.8);

    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale).ticks(10))
      .selectAll('text')
      .attr('fill', '#fff');

    svg.append('g')
      .attr('transform', `translate(50, 0)`)
      .call(d3.axisLeft(yScale).ticks(10))
      .selectAll('text')
      .attr('fill', '#fff');

  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Color Harmonies</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery
        </Text>
      )}
      <View style={styles.svgContainer}>
        <svg ref={svgRef}></svg>
      </View>
    </View>
  );
}
