import React from 'react';
import '../loadingCircle.css'; // Import CSS for styling loading circle

function LoadingCircle() {
  return (
    <div className="loading-circle-container">
      <div className="loading-circle"></div>
    </div>
  );
}

export default LoadingCircle;