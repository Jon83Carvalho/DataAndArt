# Data and Art Gallery

An Expo React Native app showcasing interactive data visualizations as art pieces.

## Features

- **Start Screen**: Beautiful landing screen with navigation to gallery
- **Art Gallery**: Horizontal scrollable gallery with swipe navigation
- **Interactive Art Pieces**: D3.js powered visualizations
- **Easy to Extend**: Simple structure for adding new artworks

## Art Pieces

### Art1: Data Flow Visualization
- Force-directed graph with colorful nodes
- Interactive particle simulation
- Real-time physics animation

### Art2: Network Connections
- Network graph visualization
- Dynamic node positioning
- Connection mapping

### Art3: Color Harmonies
- Sequential data visualization
- Rainbow color gradients
- Line chart with data points

## Adding New Art Pieces

1. Create a new component file (e.g., `Art4.js`)
2. Implement your D3.js visualization
3. Add the artwork to the `artworks` array in `ArtGallery.js`
4. Import and register the new screen in `App.js`

## Getting Started

```bash
npm install
npm start
```

## Dependencies

- Expo
- React Native
- D3.js
- React Navigation
- React Native Safe Area Context
