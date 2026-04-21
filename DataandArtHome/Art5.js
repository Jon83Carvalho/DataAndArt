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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});

const cities = [
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
];

export default function Art5({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [timeData, setTimeData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEscapeKey(() => navigation.goBack());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch sunrise/sunset data
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const today = new Date().toISOString().split('T')[0];
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=sunrise,sunset&timezone=auto&forecast_days=1`
            );
            const data = await response.json();
            
            const sunrise = data.daily?.sunrise?.[0];
            const sunset = data.daily?.sunset?.[0];
            
            return {
              ...city,
              sunrise: sunrise ? new Date(sunrise) : null,
              sunset: sunset ? new Date(sunset) : null,
            };
          } catch (e) {
            const now = new Date();
            const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 30);
            const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30);
            return { ...city, sunrise, sunset };
          }
        })
      );
      setTimeData(results);
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
    if (!timeData.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr('width', width).attr('height', height);

    const defs = svg.append('defs');

    // Time-based gradients
    const gradients = [
      { id: 'dawn', colors: ['#1a1a2e', '#4a69bd', '#f6e58d'] },
      { id: 'day', colors: ['#74b9ff', '#0984e3', '#fdcb6e'] },
      { id: 'dusk', colors: ['#fd79a8', '#e84393', '#2d3436'] },
      { id: 'night', colors: ['#0c0c14', '#1e272e', '#000000'] },
    ];

    gradients.forEach(g => {
      const gradient = defs.append('linearGradient')
        .attr('id', g.id)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      g.colors.forEach((color, i) => {
        gradient.append('stop')
          .attr('offset', `${(i / (g.colors.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });
    });

    // Sun gradient
    const sunGradient = defs.append('radialGradient')
      .attr('id', 'sunGradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    sunGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffeaa7');
    sunGradient.append('stop').attr('offset', '100%').attr('stop-color', '#fdcb6e');

    // Background based on current time
    const hour = currentTime.getHours();
    let bgGradient;
    if (hour >= 5 && hour < 8) bgGradient = 'dawn';
    else if (hour >= 8 && hour < 17) bgGradient = 'day';
    else if (hour >= 17 && hour < 20) bgGradient = 'dusk';
    else bgGradient = 'night';

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', `url(#${bgGradient})`);

    // 24-hour circle
    const circleRadius = Math.min(width, height) / 3;

    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', circleRadius)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 2);

    // Hour markers
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
      const x1 = centerX + (circleRadius - 10) * Math.cos(angle);
      const y1 = centerY + (circleRadius - 10) * Math.sin(angle);
      const x2 = centerX + (circleRadius + 10) * Math.cos(angle);
      const y2 = centerY + (circleRadius + 10) * Math.sin(angle);

      const isDay = i >= 6 && i < 18;
      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', isDay ? '#fdcb6e' : '#74b9ff')
        .attr('stroke-width', i % 6 === 0 ? 2 : 1)
        .attr('opacity', i % 6 === 0 ? 0.8 : 0.4);

      if (i % 3 === 0) {
        const labelX = centerX + (circleRadius + 25) * Math.cos(angle);
        const labelY = centerY + (circleRadius + 25) * Math.sin(angle);
        svg.append('text')
          .attr('x', labelX)
          .attr('y', labelY)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', '#fff')
          .attr('font-size', '10px')
          .attr('opacity', 0.7)
          .text(i);
      }
    }

    // Current time indicator
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
    const currentAngle = (currentHour / 24) * Math.PI * 2 - Math.PI / 2;
    const currentX = centerX + circleRadius * Math.cos(currentAngle);
    const currentY = centerY + circleRadius * Math.sin(currentAngle);

    svg.append('circle')
      .attr('cx', currentX)
      .attr('cy', currentY)
      .attr('r', 8)
      .attr('fill', '#e74c3c')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    svg.append('line')
      .attr('x1', centerX)
      .attr('y1', centerY)
      .attr('x2', currentX)
      .attr('y2', currentY)
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round');

    // City arcs
    const arcGroup = svg.append('g').attr('class', 'city-arcs');

    cities.forEach((city, i) => {
      const cityData = timeData.find(c => c.name === city.name);
      if (!cityData?.sunrise || !cityData?.sunset) return;

      const sunriseHour = cityData.sunrise.getHours() + cityData.sunrise.getMinutes() / 60;
      const sunsetHour = cityData.sunset.getHours() + cityData.sunset.getMinutes() / 60;

      const startAngle = (sunriseHour / 24) * Math.PI * 2 - Math.PI / 2;
      const endAngle = (sunsetHour / 24) * Math.PI * 2 - Math.PI / 2;

      const arcRadius = circleRadius - 30 - i * 8;

      const arc = d3.arc()
        .innerRadius(arcRadius)
        .outerRadius(arcRadius + 4)
        .startAngle(startAngle)
        .endAngle(endAngle);

      arcGroup.append('path')
        .attr('d', arc)
        .attr('transform', `translate(${centerX},${centerY})`)
        .attr('fill', 'none')
        .attr('stroke', `hsl(${i * 45}, 70%, 60%)`)
        .attr('stroke-width', 4)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0.7);

      // Sunrise marker
      const sunriseX = centerX + arcRadius * Math.cos(startAngle);
      const sunriseY = centerY + arcRadius * Math.sin(startAngle);
      arcGroup.append('circle')
        .attr('cx', sunriseX)
        .attr('cy', sunriseY)
        .attr('r', 4)
        .attr('fill', '#f39c12');

      // Sunset marker
      const sunsetX = centerX + arcRadius * Math.cos(endAngle);
      const sunsetY = centerY + arcRadius * Math.sin(endAngle);
      arcGroup.append('circle')
        .attr('cx', sunsetX)
        .attr('cy', sunsetY)
        .attr('r', 4)
        .attr('fill', '#e74c3c');
    });

    // Center clock
    const centerGroup = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    centerGroup.append('circle')
      .attr('r', 50)
      .attr('fill', 'rgba(0,0,0,0.3)')
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('stroke-width', 1);

    const timeString = currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false,
    });

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('dy', '5')
      .attr('font-family', 'monospace')
      .text(timeString);

  }, [timeData, currentTime, dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Circadian Rhythms</Text>
      <Text style={styles.subtitle}>Sunrise & sunset patterns • Red dot shows current hour</Text>
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
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={{ width: 12, height: 4, borderRadius: 2, backgroundColor: '#f39c12' }} />
          <Text style={styles.legendText}>Sunrise</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={{ width: 12, height: 4, borderRadius: 2, backgroundColor: '#e74c3c' }} />
          <Text style={styles.legendText}>Sunset</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#e74c3c', borderWidth: 2, borderColor: '#fff' }} />
          <Text style={styles.legendText}>Current Time</Text>
        </View>
      </View>
    </View>
  );
}
