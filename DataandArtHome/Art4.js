import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as d3 from 'd3';
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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

// Network data - nodes and connections
const networkData = {
  nodes: [
    { id: "Brazil", group: 1, size: 25 },
    { id: "Argentina", group: 1, size: 22 },
    { id: "France", group: 1, size: 20 },
    { id: "England", group: 2, size: 18 },
    { id: "Netherlands", group: 2, size: 16 },
    { id: "Portugal", group: 2, size: 15 },
    { id: "Croatia", group: 2, size: 14 },
    { id: "Morocco", group: 2, size: 13 },
    { id: "Spain", group: 3, size: 12 },
    { id: "Germany", group: 3, size: 12 },
    { id: "Belgium", group: 3, size: 11 },
    { id: "Italy", group: 3, size: 10 },
    { id: "Uruguay", group: 1, size: 10 },
    { id: "Mexico", group: 1, size: 9 },
    { id: "USA", group: 3, size: 9 },
    { id: "Japan", group: 4, size: 8 },
    { id: "South Korea", group: 4, size: 7 },
    { id: "Australia", group: 4, size: 6 },
    { id: "Senegal", group: 5, size: 6 },
    { id: "Poland", group: 3, size: 7 },
    { id: "Switzerland", group: 3, size: 6 },
    { id: "Denmark", group: 3, size: 5 },
    { id: "Serbia", group: 3, size: 5 },
    { id: "Cameroon", group: 5, size: 4 },
    { id: "Ghana", group: 5, size: 4 },
    { id: "Canada", group: 3, size: 5 },
    { id: "Costa Rica", group: 1, size: 4 },
    { id: "Ecuador", group: 1, size: 5 },
    { id: "Saudi Arabia", group: 4, size: 4 },
    { id: "Tunisia", group: 5, size: 4 },
  ],
  links: [
    { source: "Brazil", target: "Argentina", strength: 0.9 },
    { source: "Brazil", target: "France", strength: 0.7 },
    { source: "Brazil", target: "England", strength: 0.6 },
    { source: "Argentina", target: "France", strength: 0.95 },
    { source: "Argentina", target: "Brazil", strength: 0.85 },
    { source: "Argentina", target: "Uruguay", strength: 0.8 },
    { source: "France", target: "England", strength: 0.7 },
    { source: "France", target: "Portugal", strength: 0.6 },
    { source: "England", target: "Netherlands", strength: 0.5 },
    { source: "England", target: "Portugal", strength: 0.5 },
    { source: "Netherlands", target: "Belgium", strength: 0.6 },
    { source: "Netherlands", target: "Germany", strength: 0.7 },
    { source: "Portugal", target: "Spain", strength: 0.8 },
    { source: "Croatia", target: "Serbia", strength: 0.6 },
    { source: "Morocco", target: "Tunisia", strength: 0.7 },
    { source: "Morocco", target: "Senegal", strength: 0.6 },
    { source: "Spain", target: "Portugal", strength: 0.75 },
    { source: "Spain", target: "Germany", strength: 0.5 },
    { source: "Germany", target: "Belgium", strength: 0.6 },
    { source: "Germany", target: "Netherlands", strength: 0.65 },
    { source: "Belgium", target: "Netherlands", strength: 0.7 },
    { source: "Italy", target: "Spain", strength: 0.5 },
    { source: "Italy", target: "Germany", strength: 0.6 },
    { source: "Uruguay", target: "Argentina", strength: 0.75 },
    { source: "Uruguay", target: "Brazil", strength: 0.7 },
    { source: "Mexico", target: "USA", strength: 0.6 },
    { source: "Mexico", target: "Costa Rica", strength: 0.5 },
    { source: "USA", target: "Canada", strength: 0.5 },
    { source: "Japan", target: "South Korea", strength: 0.7 },
    { source: "Japan", target: "Australia", strength: 0.5 },
    { source: "South Korea", target: "Australia", strength: 0.4 },
    { source: "Senegal", target: "Cameroon", strength: 0.6 },
    { source: "Senegal", target: "Ghana", strength: 0.5 },
    { source: "Poland", target: "Germany", strength: 0.4 },
    { source: "Switzerland", target: "Germany", strength: 0.5 },
    { source: "Switzerland", target: "Italy", strength: 0.5 },
    { source: "Denmark", target: "Germany", strength: 0.6 },
    { source: "Denmark", target: "Netherlands", strength: 0.5 },
    { source: "Serbia", target: "Croatia", strength: 0.65 },
    { source: "Ecuador", target: "Brazil", strength: 0.6 },
    { source: "Ecuador", target: "Argentina", strength: 0.5 },
    { source: "Saudi Arabia", target: "Japan", strength: 0.4 },
    { source: "Tunisia", target: "Morocco", strength: 0.65 },
    { source: "Cameroon", target: "Ghana", strength: 0.5 },
    { source: "Canada", target: "Mexico", strength: 0.5 },
    { source: "Canada", target: "USA", strength: 0.55 },
    { source: "Costa Rica", target: "Mexico", strength: 0.5 },
    { source: "Costa Rica", target: "USA", strength: 0.45 },
  ]
};

export default function Art4({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  // Add escape key functionality for web
  useEscapeKey(() => navigation.goBack());

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
      setDimensions({
        width: Math.min(screenWidth - 40, 1400),
        height: Math.min(screenHeight - 200, 900)
      });
    };

    updateDimensions();
    
    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', width).attr('height', height);

    // Color scheme
    const colors = {
      background: '#111',
      text: '#ffffff',
      accent: '#4ade80',
      group1: '#ef4444',
      group2: '#3b82f6',
      group3: '#f59e0b',
      group4: '#10b981',
      group5: '#8b5cf6',
      line: '#374151',
      lineStrong: '#6b7280'
    };

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .style('fill', colors.text)
      .text('Global Football Network');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 65)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', '#888')
      .text('International Team Connections & Rivalries');

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create force simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .force('collide', d3.forceCollide().radius(d => d.size + 5));

    // Prepare data
    const nodes = networkData.nodes.map(n => ({ ...n }));
    const links = networkData.links.map(l => ({ ...l }));

    // Add links
    const link = g.append('g')
      .attr('stroke', colors.line)
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.strength) * 3);

    // Add nodes
    const node = g.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.size)
      .attr('fill', d => {
        switch(d.group) {
          case 1: return colors.group1;
          case 2: return colors.group2;
          case 3: return colors.group3;
          case 4: return colors.group4;
          case 5: return colors.group5;
          default: return colors.accent;
        }
      })
      .attr('opacity', 0.8)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add labels
    const label = g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', colors.text)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id);

    // Add tooltip group
    const tooltip = g.append('g')
      .attr('display', 'none');

    tooltip.append('rect')
      .attr('fill', 'rgba(0, 0, 0, 0.8)')
      .attr('rx', 5)
      .attr('ry', 5);

    tooltip.append('text')
      .attr('fill', colors.text)
      .attr('font-size', '12px')
      .attr('dy', '0.3em');

    // Mouse interactions
    node.on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 1).attr('stroke', colors.text).attr('stroke-width', 3);
      
      // Show connected links
      link.attr('stroke-opacity', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 0.9 : 0.2
      );
      
      // Show tooltip
      tooltip.attr('display', 'block');
      tooltip.select('text').text(`${d.id} - ${d.size} connections`);
      
      const bbox = tooltip.select('text').node().getBBox();
      tooltip.select('rect')
        .attr('width', bbox.width + 10)
        .attr('height', bbox.height + 6)
        .attr('x', -bbox.width / 2 - 5)
        .attr('y', -bbox.height - 10);
    })
    .on('mousemove', function(event) {
      const [mouseX, mouseY] = d3.pointer(event);
      tooltip.attr('transform', `translate(${mouseX},${mouseY})`);
    })
    .on('mouseout', function() {
      d3.select(this).attr('opacity', 0.8).attr('stroke', '#fff').attr('stroke-width', 2);
      link.attr('stroke-opacity', 0.6);
      tooltip.attr('display', 'none');
    });

    // Update positions on tick
    simulation.nodes(nodes).on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y + d.size + 15);
        
      tooltip.attr('transform', d => `translate(${d.x},${d.y - d.size - 20})`);
    });

    simulation.force('link').links(links);

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Add legend
    const legend = g.append('g')
      .attr('transform', `translate(20, ${innerHeight - 100})`);

    const legendData = [
      { color: colors.group1, label: 'South America' },
      { color: colors.group2, label: 'Europe Top' },
      { color: colors.group3, label: 'Europe Mid' },
      { color: colors.group4, label: 'Asia/Oceania' },
      { color: colors.group5, label: 'Africa' }
    ];

    legendData.forEach((item, i) => {
      const lg = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);
      
      lg.append('circle')
        .attr('r', 6)
        .attr('fill', item.color);
      
      lg.append('text')
        .attr('x', 15)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', colors.text)
        .text(item.label);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Network Connections</Text>
      <Text style={styles.subtitle}>Interactive Force-Directed Graph</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery • Drag nodes to interact
        </Text>
      )}
      <View style={styles.svgContainer}>
        <svg width={dimensions.width} height={dimensions.height} ref={svgRef}></svg>
        <Image
          style={styles.icon}
          source={require("./assets/StartScreen.jpg")}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
