import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
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
    color: '#e94560',
    fontWeight: 'bold',
  },
  tooltipWeather: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
});

const cities = [
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
];

export default function Art6({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [data, setData] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);
  
  useEscapeKey(() => navigation.goBack());

  // Fetch weather data
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
            );
            const weather = await response.json();
            return {
              ...city,
              temp: weather.current_weather?.temperature || 0,
              windspeed: weather.current_weather?.windspeed || 0,
              winddirection: weather.current_weather?.winddirection || 0,
            };
          } catch (e) {
            return { ...city, temp: 20, windspeed: 10, winddirection: 0 };
          }
        })
      );
      setData(results);
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
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr('width', width).attr('height', height);

    // Temperature gradient
    const defs = svg.append('defs');
    const tempGradient = defs.append('linearGradient')
      .attr('id', 'tempGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    tempGradient.append('stop').attr('offset', '0%').attr('stop-color', '#1a1a2e');
    tempGradient.append('stop').attr('offset', '50%').attr('stop-color', '#16213e');
    tempGradient.append('stop').attr('offset', '100%').attr('stop-color', '#0f3460');

    // Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#tempGradient)');

    // Create flowing particles
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const particleGroup = svg.append('g').attr('class', 'particles');

    particles.forEach((p, i) => {
      particleGroup.append('circle')
        .attr('class', `particle-${i}`)
        .attr('cx', p.x)
        .attr('cy', p.y)
        .attr('r', p.size)
        .attr('fill', '#e94560')
        .attr('opacity', p.opacity);
    });

    // Animate particles
    let time = 0;
    const animate = () => {
      time += 0.02;
      particles.forEach((p, i) => {
        p.x += p.vx + Math.sin(time + i) * 0.5;
        p.y += p.vy + Math.cos(time + i) * 0.5;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        svg.select(`.particle-${i}`)
          .attr('cx', p.x)
          .attr('cy', p.y);
      });
      requestAnimationFrame(animate);
    };
    animate();

    // Position cities in circular layout
    const radius = Math.min(width, height) / 3;

    // Temperature color scale
    const tempColor = d3.scaleLinear()
      .domain([-10, 40])
      .range(['#3498db', '#e74c3c'])
      .clamp(true);

    data.forEach((city, i) => {
      const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const cityGroup = svg.append('g')
        .attr('class', 'city-group')
        .attr('transform', `translate(${x},${y})`)
        .on('mouseover', function(event) {
          setHoveredCity(city);
        })
        .on('mouseout', function() {
          setHoveredCity(null);
        });

      // Glow ring
      const glowRing = cityGroup.append('circle')
        .attr('class', 'glow-ring')
        .attr('r', 30)
        .attr('fill', 'none')
        .attr('stroke', tempColor(city.temp))
        .attr('stroke-width', 2)
        .attr('opacity', 0.6);

      // Animate glow
      glowRing.transition()
        .duration(2000)
        .attr('r', 40)
        .attr('opacity', 0)
        .on('end', function repeat() {
          d3.select(this)
            .attr('r', 30)
            .attr('opacity', 0.6)
            .transition()
            .duration(2000)
            .attr('r', 40)
            .attr('opacity', 0)
            .on('end', repeat);
        });

      // City circle
      cityGroup.append('circle')
        .attr('class', 'city-circle')
        .attr('r', 20)
        .attr('fill', tempColor(city.temp))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');

      // Wind indicator
      cityGroup.append('line')
        .attr('class', 'wind-indicator')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -25)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')
        .attr('transform', `rotate(${city.winddirection})`);

      // City name
      cityGroup.append('text')
        .attr('y', 45)
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text(city.name);

      // Connection line to center
      svg.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', tempColor(city.temp))
        .attr('stroke-width', 1)
        .attr('opacity', 0.3);
    });

    // Center average temperature
    const avgTemp = data.reduce((sum, c) => sum + c.temp, 0) / data.length;
    const centerGroup = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    centerGroup.append('circle')
      .attr('r', 60)
      .attr('fill', 'rgba(255,255,255,0.05)')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 1);

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '32px')
      .attr('font-weight', 'bold')
      .attr('dy', '-10')
      .text(`${avgTemp.toFixed(1)}°C`);

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255,255,255,0.7)')
      .attr('font-size', '12px')
      .attr('dy', '15')
      .text('Global Average');

  }, [data, dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Global Weather Symphony</Text>
      <Text style={styles.subtitle}>Real-time temperatures worldwide</Text>
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
      
      {hoveredCity && (
        <View style={[styles.tooltip, { top: '55%', left: '50%', marginLeft: -100 }]}>
          <Text style={styles.tooltipName}>{hoveredCity.name}</Text>
          <Text style={styles.tooltipWeather}>🌡️ {hoveredCity.temp}°C • 💨 {hoveredCity.windspeed} km/h</Text>
        </View>
      )}
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3498db' }} />
          <Text style={styles.legendText}>Colder</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#e74c3c' }} />
          <Text style={styles.legendText}>Warmer</Text>
        </View>
      </View>
    </View>
  );
}
