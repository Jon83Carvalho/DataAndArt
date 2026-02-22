import { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';

export const useMouseDrag = (scrollViewRef) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragStartTime = useRef(0);

  useEffect(() => {
    if (Platform.OS !== 'web' || !scrollViewRef?.current) return;

    const scrollView = scrollViewRef.current;
    let animationFrameId = null;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollView.offsetLeft);
      setScrollLeft(scrollView.scrollLeft);
      dragStartTime.current = Date.now();
      scrollView.style.cursor = 'grabbing';
      scrollView.style.userSelect = 'none';
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const x = e.pageX - scrollView.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed
        scrollView.scrollLeft = scrollLeft - walk;
      });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      
      const dragDuration = Date.now() - dragStartTime.current;
      const dragDistance = Math.abs(scrollView.scrollLeft - scrollLeft);
      
      // Check if it was a quick swipe (less than 300ms and some distance)
      if (dragDuration < 300 && dragDistance > 50) {
        const scrollWidth = scrollView.scrollWidth;
        const clientWidth = scrollView.clientWidth;
        const currentPage = Math.round(scrollView.scrollLeft / clientWidth);
        const maxPage = Math.floor(scrollWidth / clientWidth) - 1;
        
        let targetPage;
        if (scrollView.scrollLeft > scrollLeft) {
          // Swiped left - go to next page
          targetPage = Math.min(currentPage + 1, maxPage);
        } else {
          // Swiped right - go to previous page
          targetPage = Math.max(currentPage - 1, 0);
        }
        
        // Smooth scroll to the target page
        scrollView.scrollTo({
          left: targetPage * clientWidth,
          behavior: 'smooth'
        });
      }
      
      setIsDragging(false);
      scrollView.style.cursor = 'grab';
      scrollView.style.userSelect = 'auto';
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    // Add mouse event listeners
    scrollView.addEventListener('mousedown', handleMouseDown);
    scrollView.addEventListener('mousemove', handleMouseMove);
    scrollView.addEventListener('mouseup', handleMouseUp);
    scrollView.addEventListener('mouseleave', handleMouseLeave);
    
    // Set initial cursor style
    scrollView.style.cursor = 'grab';

    return () => {
      // Cleanup event listeners
      scrollView.removeEventListener('mousedown', handleMouseDown);
      scrollView.removeEventListener('mousemove', handleMouseMove);
      scrollView.removeEventListener('mouseup', handleMouseUp);
      scrollView.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging, startX, scrollLeft, scrollViewRef]);

  return {
    isDragging,
    dragProps: Platform.OS === 'web' ? {
      style: { cursor: isDragging ? 'grabbing' : 'grab' }
    } : {}
  };
};
