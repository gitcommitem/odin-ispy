import '../styles/Cursor.css';
import { useEffect } from 'react';

const Cursor = ({ isGameStart, isGameEnd }) => {
  useEffect(() => {
    if (isGameStart === true && isGameEnd === false) {
      addEventListeners();
      return () => removeEventListeners();
    }
  }, [isGameStart, isGameEnd]);

  const addEventListeners = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.removeEventListener('mouseenter', handleMouseEnter);
    document.body.removeEventListener('mouseleave', handleMouseLeave);
  };

  const handleMouseMove = event => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  };

  const handleMouseDown = event => {
    const cursor = document.querySelector('.cursor');
    cursor.style.background = 'white';
    cursor.style.opacity = 0.5;
  };

  const handleMouseUp = event => {
    const cursor = document.querySelector('.cursor');
    cursor.style.background = '';
    cursor.style.opacity = 1;
  };

  const handleMouseLeave = event => {
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = '0';
  };

  const handleMouseEnter = event => {
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = '1';
  };

  return (
    <div className={isGameStart && !isGameEnd ? 'cursor' : 'hidden'}></div>
  );
};

export default Cursor;
