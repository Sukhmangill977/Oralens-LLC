import React from 'react';

const StatusIndicator = ({ status }) => {
  const color = status === 'green' ? 'green' : 'red';
  return <span style={{ color, marginLeft: '10px' }}>●</span>;
};

export default StatusIndicator;
