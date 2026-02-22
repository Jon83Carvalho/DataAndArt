import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export const useKeyboardNavigation = (scrollViewRef, totalPages) => {
  const currentPageRef = useRef(0);

  useEffect(() => {
    if (Platform.OS !== 'web' || !scrollViewRef?.current) return;

    const scrollView = scrollViewRef.current;

    const handleKeyDown = (e) => {
      const clientWidth = scrollView.clientWidth;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (currentPageRef.current > 0) {
            currentPageRef.current--;
            scrollView.scrollTo({
              left: currentPageRef.current * clientWidth,
              behavior: 'smooth'
            });
          }
          break;
        
        case 'ArrowRight':
          e.preventDefault();
          if (currentPageRef.current < totalPages - 1) {
            currentPageRef.current++;
            scrollView.scrollTo({
              left: currentPageRef.current * clientWidth,
              behavior: 'smooth'
            });
          }
          break;
        
        case 'Home':
          e.preventDefault();
          currentPageRef.current = 0;
          scrollView.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
          break;
        
        case 'End':
          e.preventDefault();
          currentPageRef.current = totalPages - 1;
          scrollView.scrollTo({
            left: (totalPages - 1) * clientWidth,
            behavior: 'smooth'
          });
          break;
      }
    };

    const updateCurrentPage = () => {
      const clientWidth = scrollView.clientWidth;
      currentPageRef.current = Math.round(scrollView.scrollLeft / clientWidth);
    };

    // Update current page on scroll
    scrollView.addEventListener('scroll', updateCurrentPage);
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      scrollView.removeEventListener('scroll', updateCurrentPage);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollViewRef, totalPages]);

  return {
    keyboardHint: Platform.OS === 'web' 
      ? 'Use arrow keys to navigate • Home/End for first/last page' 
      : null
  };
};
