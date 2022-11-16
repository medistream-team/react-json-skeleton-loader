import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SkeletonLoader from './SkeletonLoader'

ReactDOM.render(
  <React.StrictMode>
    <SkeletonLoader />
  </React.StrictMode>,
  document.getElementById('root')
);