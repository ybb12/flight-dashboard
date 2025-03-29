// components/NumberDisplay.tsx
import React from 'react';

interface NumberDisplayProps {
  numbers: number[];
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ numbers }) => {
  return (
    <div className="flex justify-center space-x-8">
      {numbers.map((number, index) => (
        <div 
          key={index} 
          className="flex items-center justify-center w-20 h-20 text-3xl font-bold bg-gray-200 rounded-full"
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default NumberDisplay;