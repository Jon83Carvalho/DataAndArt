import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useMouseDrag } from './useMouseDrag';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import PageIndicator from './PageIndicator';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  artContainer: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  artDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
    maxWidth: 600,
  },
  navigationHint: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
  },
  topIndicator: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
});

export default function ArtGallery({ navigation }) {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { isDragging, dragProps } = useMouseDrag(scrollViewRef);
  const { keyboardHint } = useKeyboardNavigation(scrollViewRef, 3); // 3 artworks
  
  // Track current page based on scroll position
  useEffect(() => {
    if (Platform.OS !== 'web' || !scrollViewRef?.current) return;
    
    const scrollView = scrollViewRef.current;
    
    const handleScroll = () => {
      const clientWidth = scrollView.clientWidth;
      const newPage = Math.round(scrollView.scrollLeft / clientWidth);
      setCurrentPage(newPage);
    };
    
    scrollView.addEventListener('scroll', handleScroll);
    return () => scrollView.removeEventListener('scroll', handleScroll);
  }, []);
  
  const artworks = [
    {
      id: 1,
      title: "Data Flow Visualization",
      description: "Interactive D3.js visualization showing data flow patterns",
      component: "Art1"
    },
    {
      id: 2,
      title: "Internet Gender Gap",
      description: "A visual exploration of the internet gender gap associated with corruption index from different countries of the world.",
      component: "Art2"
    },
    {
      id: 3,
      title: "Color Harmonies",
      description: "Generative art based on color theory and data relationships",
      component: "Art3"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topIndicator}>
        <PageIndicator currentPage={currentPage} totalPages={3} />
      </View>
      <ScrollView 
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView, dragProps.style]}
        {...dragProps}
      >
        {artworks.map((artwork) => (
          <View key={artwork.id} style={styles.artContainer}>
            <Text style={styles.artTitle}>{artwork.title}</Text>
            <Text style={styles.artDescription}>{artwork.description}</Text>
            <TouchableOpacity 
              style={{ marginTop: 30, padding: 15, backgroundColor: '#333', borderRadius: 10 }}
              onPress={() => navigation.navigate(artwork.component)}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>View Artwork</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View>
        <Text style={styles.navigationHint}>
          {Platform.OS === 'web' 
            ? 'Click and drag to swipe between artworks' 
            : 'Swipe to navigate between artworks'
          }
        </Text>
        {keyboardHint && (
          <Text style={[styles.navigationHint, { bottom: 30, fontSize: 12 }]}>
            {keyboardHint}
          </Text>
        )}
      </View>
    </View>
  );
}
