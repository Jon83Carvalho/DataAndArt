import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c14',
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
  tooltip: {
    position: 'absolute',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 200,
  },
  tooltipName: {
    fontSize: 18,
    color: '#f39c12',
    fontWeight: 'bold',
  },
  tooltipPop: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  tooltipRegion: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 3,
  },
});

// Region colors
const regionColors = {
  Africa: ['#f39c12', '#e67e22'],
  Americas: ['#3498db', '#2980b9'],
  Asia: ['#e74c3c', '#c0392b'],
  Europe: ['#9b59b6', '#8e44ad'],
  Oceania: ['#1abc9c', '#16a085'],
};

export default function Art4({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  
  useEscapeKey(() => navigation.goBack());

  // Fetch country data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,subregion');
        const data = await response.json();
        
        const filtered = data
          .filter(c => c.population && c.name?.common)
          .sort((a, b) => b.population - a.population)
          .slice(0, 50);
        
        setCountries(filtered);
      } catch (e) {
        console.error('Failed to fetch countries:', e);
      }
    };

    fetchData();
  }, []);

  // Update dimensions
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

  // Draw visualization
  useEffect(() => {
    if (!countries.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', width).attr('height', height);

    // Create gradients
    const defs = svg.append('defs');
    Object.entries(regionColors).forEach(([region, colors]) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${region}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', colors[0]);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', colors[1]);
    });

    // Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#0c0c14');

    // Spiral layout
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(innerWidth, innerHeight) / 2 - 40;

    const spiralData = countries.map((country, i) => {
      const t = i * 0.3;
      const r = (t / (countries.length * 0.3)) * maxRadius;
      const angle = t * 2;
      return {
        ...country,
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
        radius: Math.sqrt(country.population) * 0.002 + 5,
      };
    });

    // Draw spiral path
    const lineGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.5));

    svg.append('path')
      .datum(spiralData)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('d', lineGenerator);

    // Create bubbles
    const bubbleGroup = svg.append('g').attr('class', 'bubbles');

    spiralData.forEach((country, i) => {
      const region = country.region || 'Unknown';
      const gradientId = regionColors[region] ? `gradient-${region}` : null;

      const group = bubbleGroup.append('g')
        .attr('transform', `translate(${country.x},${country.y})`);

      // Outer ring
      group.append('circle')
        .attr('r', country.radius + 3)
        .attr('fill', 'none')
        .attr('stroke', gradientId ? `url(#gradient-${region})` : '#fff')
        .attr('stroke-width', 2)
        .attr('opacity', 0.8);

      // Main bubble
      group.append('circle')
        .attr('r', country.radius)
        .attr('fill', gradientId ? `url(#gradient-${region})` : '#666')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.9);

      // Pulse for top 10
      if (i < 10) {
        const pulseRing = group.append('circle')
          .attr('r', country.radius)
          .attr('fill', 'none')
          .attr('stroke', gradientId ? `url(#gradient-${region})` : '#fff')
          .attr('stroke-width', 2)
          .attr('opacity', 0.6);

        pulseRing.transition()
          .duration(1500)
          .attr('r', country.radius * 2)
          .attr('opacity', 0)
          .on('end', function repeat() {
            d3.select(this)
              .attr('r', country.radius)
              .attr('opacity', 0.6)
              .transition()
              .duration(1500)
              .attr('r', country.radius * 2)
              .attr('opacity', 0)
              .on('end', repeat);
          });
      }
    });

    // Legend
    const legendGroup = svg.append('g')
      .attr('transform', `translate(${margin.left + 20},${margin.top + 20})`);

    Object.entries(regionColors).forEach(([region, colors], i) => {
      const y = i * 25;
      legendGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', y + 5)
        .attr('r', 6)
        .attr('fill', `url(#gradient-${region})`);

      legendGroup.append('text')
        .attr('x', 15)
        .attr('y', y + 9)
        .attr('fill', '#fff')
        .attr('font-size', '11px')
        .text(region);
    });

    // Title
    svg.append('text')
      .attr('x', width - margin.right - 20)
      .attr('y', margin.top + 30)
      .attr('text-anchor', 'end')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Top 50 Countries by Population');

  }, [countries, dimensions]);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Population Galaxy</Text>
      <Text style={styles.subtitle}>Countries sized by population • Spiral through civilization</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery
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
      
      {hoveredCountry && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipName}>{hoveredCountry.name.common}</Text>
          <Text style={styles.tooltipPop}>👥 {formatNumber(hoveredCountry.population)} people</Text>
          <Text style={styles.tooltipRegion}>{hoveredCountry.subregion || hoveredCountry.region}</Text>
        </View>
      )}
    </View>
  );
}
