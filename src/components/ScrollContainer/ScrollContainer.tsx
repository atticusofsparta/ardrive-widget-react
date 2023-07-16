import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import './styles.css';

function ScrollContainer({
  children,
  wrapperStyle,
  contentStyle,
  scrollBarContainerStyle,
  scrollBarStyle,
  scrollBarContainerHeight = 250,
}: {
  children: ReactNode;
  wrapperStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  scrollBarContainerStyle?: CSSProperties;
  scrollBarStyle?: CSSProperties;
  scrollBarContainerHeight?: number;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [scrollbarSize, setScrollbarSize] = useState(0);
  const [scrollbarPosition, setScrollbarPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      const scrollBar = scrollBarRef.current;

      if (scrollContainer && scrollBar) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollableHeight = scrollHeight - clientHeight;
        const containerHeight = scrollBarContainerHeight  -  (clientHeight / scrollBarContainerHeight)

        // Calculate the scrollbar size and position
        const size = (containerHeight / scrollHeight) * containerHeight;
        let position = (scrollTop / scrollableHeight) * (containerHeight - (size));

        // Prevent scrollbar from going past the bottom
        position = Math.min(position, clientHeight - size);

        setScrollbarSize(size);
        setScrollbarPosition(position);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    handleScroll(); // Calculate scrollbar size and position on initial render

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollbarStyle: CSSProperties = {
    ...scrollBarStyle,
    height: scrollbarSize,
    transform: `translateY(${scrollbarPosition}px)`,
  };

  return (
    <div className="scroll-container" style={wrapperStyle} ref={scrollContainerRef}>
      <div className="scrollbar-container" style={{...scrollBarContainerStyle, height: `${scrollBarContainerHeight}px`}}>
        <div className="scrollbar" style={scrollbarStyle} ref={scrollBarRef}></div>
      </div>
      <div className="scroll-container-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

export default ScrollContainer;
