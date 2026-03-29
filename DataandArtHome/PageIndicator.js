import { View, StyleSheet, Platform } from 'react-native';

const PageIndicator = ({ currentPage, totalPages }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    transition: 'all 0.3s ease',
  },
  activeDot: {
    backgroundColor: '#fff',
    transform: [{ scale: 1.2 }],
  },
  inactiveDot: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
});

export default PageIndicator;
