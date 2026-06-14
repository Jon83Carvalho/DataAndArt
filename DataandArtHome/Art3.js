import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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

// 2022 World Cup knockout stage data
const worldCup2022Data = {
  name: "2022 FIFA World Cup",
  children: [
    {
      name: "Round of 16",
      round: 1,
      matches: [
        {
          home: "Netherlands",
          away: "United States", 
          score: "3-1",
          winner: "Netherlands"
        },
        {
          home: "Argentina",
          away: "Australia",
          score: "2-1", 
          winner: "Argentina"
        },
        {
          home: "France",
          away: "Poland",
          score: "3-1",
          winner: "France"
        },
        {
          home: "England", 
          away: "Senegal",
          score: "3-0",
          winner: "England"
        },
        {
          home: "Japan",
          away: "Croatia",
          score: "1-1 (3-4p)",
          winner: "Croatia"
        },
        {
          home: "Brazil",
          away: "South Korea", 
          score: "4-1",
          winner: "Brazil"
        },
        {
          home: "Morocco",
          away: "Spain",
          score: "0-0 (3-0p)",
          winner: "Morocco"
        },
        {
          home: "Portugal",
          away: "Switzerland",
          score: "6-1",
          winner: "Portugal"
        }
      ]
    },
    {
      name: "Quarter-finals",
      round: 2,
      matches: [
        {
          home: "Croatia",
          away: "Brazil",
          score: "1-1 (4-2p)",
          winner: "Croatia"
        },
        {
          home: "Netherlands",
          away: "Argentina", 
          score: "2-2 (3-4p)",
          winner: "Argentina"
        },
        {
          home: "Morocco",
          away: "Portugal",
          score: "1-0",
          winner: "Morocco"
        },
        {
          home: "England",
          away: "France",
          score: "1-2", 
          winner: "France"
        }
      ]
    },
    {
      name: "Semi-finals",
      round: 3,
      matches: [
        {
          home: "Argentina",
          away: "Croatia",
          score: "3-0",
          winner: "Argentina"
        },
        {
          home: "France",
          away: "Morocco",
          score: "2-0",
          winner: "France"
        }
      ]
    },
    {
      name: "Final",
      round: 4,
      matches: [
        {
          home: "Argentina",
          away: "France",
          score: "3-3 (4-2p)",
          winner: "Argentina"
        }
      ]
    }
  ]
};

export default function Art3({ navigation }) {
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

  // Transform World Cup data to complete elimination phase tree
function createCompleteEliminationTree(worldCupData) {
  const treeData = {
    name: "2022 FIFA World Cup",
    round: "Final",
    match: "Argentina vs France",
    score: "3-3 (4-2p)",
    winner: "Argentina",
    children: []
  };

  // Semi-finals
  const semiFinals = [
    {
      name: "Semi-final 1",
      round: "Semi-finals", 
      match: "Argentina vs Croatia",
      score: "3-0",
      winner: "Argentina",
      children: []
    },
    {
      name: "Semi-final 2",
      round: "Semi-finals",
      match: "France vs Morocco", 
      score: "2-0",
      winner: "France",
      children: []
    }
  ];

  // Quarter-finals
  const quarterFinals = [
    {
      name: "Quarter-final 1",
      round: "Quarter-finals",
      match: "Croatia vs Brazil",
      score: "1-1 (4-2p)", 
      winner: "Croatia",
      children: []
    },
    {
      name: "Quarter-final 2",
      round: "Quarter-finals",
      match: "Netherlands vs Argentina",
      score: "2-2 (3-4p)",
      winner: "Argentina", 
      children: []
    },
    {
      name: "Quarter-final 3",
      round: "Quarter-finals",
      match: "Morocco vs Portugal",
      score: "1-0",
      winner: "Morocco",
      children: []
    },
    {
      name: "Quarter-final 4", 
      round: "Quarter-finals",
      match: "England vs France",
      score: "1-2",
      winner: "France",
      children: []
    }
  ];

  // Round of 16
  const roundOf16 = [
    {
      name: "Round of 16 - 1",
      round: "Round of 16",
      match: "Netherlands vs United States",
      score: "3-1",
      winner: "Netherlands",
      children: []
    },
    {
      name: "Round of 16 - 2",
      round: "Round of 16", 
      match: "Argentina vs Australia",
      score: "2-1",
      winner: "Argentina",
      children: []
    },
    {
      name: "Round of 16 - 3",
      round: "Round of 16",
      match: "France vs Poland", 
      score: "3-1",
      winner: "France",
      children: []
    },
    {
      name: "Round of 16 - 4",
      round: "Round of 16",
      match: "England vs Senegal",
      score: "3-0", 
      winner: "England",
      children: []
    },
    {
      name: "Round of 16 - 5",
      round: "Round of 16",
      match: "Japan vs Croatia",
      score: "1-1 (3-4p)",
      winner: "Croatia",
      children: []
    },
    {
      name: "Round of 16 - 6",
      round: "Round of 16",
      match: "Brazil vs South Korea",
      score: "4-1",
      winner: "Brazil", 
      children: []
    },
    {
      name: "Round of 16 - 7",
      round: "Round of 16",
      match: "Morocco vs Spain",
      score: "0-0 (3-0p)",
      winner: "Morocco",
      children: []
    },
    {
      name: "Round of 16 - 8",
      round: "Round of 16",
      match: "Portugal vs Switzerland",
      score: "6-1",
      winner: "Portugal",
      children: []
    }
  ];

  // Build the tree structure
  // Connect Round of 16 to Quarter-finals
  quarterFinals[0].children = [roundOf16[4], roundOf16[5]]; // Croatia beat Japan, Brazil beat SK
  quarterFinals[1].children = [roundOf16[0], roundOf16[1]]; // Argentina beat Aus, Netherlands beat US
  quarterFinals[2].children = [roundOf16[6], roundOf16[7]]; // Morocco beat Spain, Portugal beat Swiss
  quarterFinals[3].children = [roundOf16[2], roundOf16[3]]; // France beat Poland, England beat Senegal

  // Connect Quarter-finals to Semi-finals
  semiFinals[0].children = [quarterFinals[0], quarterFinals[1]]; // Argentina beat Croatia
  semiFinals[1].children = [quarterFinals[2], quarterFinals[3]]; // France beat Morocco

  // Connect Semi-finals to Final
  treeData.children = semiFinals;

  return treeData;
}

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', width).attr('height', height);

    // Transform World Cup data to complete elimination phase tree
    const treeData = createCompleteEliminationTree(worldCup2022Data);

    // Specify the chart’s dimensions for radial layout
    const width = dimensions.width;
    const height = dimensions.height;
    const cx = width / 2; // Center X
    const cy = height / 2; // Center Y
    const radius = Math.min(width, height) * 0.4; // Ajuste para garantir espaço suficiente

    // Ajuste para garantir que a árvore seja exibida corretamente dentro do SVG
    const width = dimensions.width;
    const height = dimensions.height;
    const cx = width / 2; // Centro X
    const cy = height / 2; // Centro Y
    const maxRadius = Math.min(width, height) * 0.35; // Reduzido para evitar cortes

    // Criação do layout radial
    const tree = d3.tree()
      .size([2 * Math.PI, maxRadius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Transforma os dados em hierarquia e aplica o layout
    const root = tree(d3.hierarchy(treeData).sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    // Ajusta as dimensões do SVG para garantir que toda a árvore seja exibida
    svg.attr('width', width).attr('height', height).attr('viewBox', [-cx, -cy, width, height]);

    // Cria o grupo principal para o layout radial
    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

    // Color scheme
    const colors = {
      background: '#0a0a0a',
      text: '#ffffff',
      accent: '#4ade80',
      winner: '#fbbf24',
      finalist: '#94a3b8',
      line: '#374151',
      box: '#1f2937'
    };

    // Add title
    // Adiciona títulos fora da área da árvore radial
    svg.append('text')
      .attr('x', cx)
      .attr('y', -cy + 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', colors.text)
      .text('2022 FIFA World Cup');

    svg.append('text')
      .attr('x', cx)
      .attr('y', -cy + 60)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#888')
      .text('Radial Elimination Phase Tree');

    // Create links for radial layout
    const link = g.append('g')
      .attr('fill', 'none')
      .attr('stroke', colors.line)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

    // Create nodes for radial layout
    const node = g.append('g')
      .selectAll()
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    // Add circles for nodes
    node.append('circle')
      .attr('fill', d => {
        if (d.data.round === "Final") return colors.winner;
        if (d.data.round === "Semi-finals") return colors.finalist;
        return d.children ? colors.accent : '#999';
      })
      .attr('r', 2.5);

    // Add match names (labels for radial layout)
    node.append('text')
      .attr('transform', d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '0.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .style('font-size', '10px')
      .style('font-weight', d => d.data.round === "Final" ? 'bold' : 'normal')
      .style('fill', colors.text)
      .text(d => d.data.name || d.data.match);

    // Add score details (smaller text)
    node.append('text')
      .attr('transform', d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '1.3em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .style('font-size', '8px')
      .style('fill', colors.accent)
      .text(d => d.data.score || '');

    // Add round labels (smaller and closer to nodes)
    node.append('text')
      .attr('dy', '-0.8em')
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '8px')
      .style('fill', '#888')
      .style('font-style', 'italic')
      .text(d => d.data.round || '');

    // Add champion crown for the final match
    const championNode = node.filter(d => d.data.round === "Final");
    championNode.append('text')
      .attr('dy', '-1.5em')
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('👑');

  }, [dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>World Cup 2022</Text>
      <Text style={styles.subtitle}>Tournament Bracket Visualization</Text>
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
    </View>
  );
}
