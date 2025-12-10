'use client';

import { forwardRef } from 'react';

const CountyCard = forwardRef(({ county, onSelect }, ref) => {
  return (
    <div 
      ref={ref}
      className="bg-card-base rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all cursor-pointer group"
      onClick={(e) => onSelect(e.currentTarget)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-brand-blue group-hover:text-brand-blue/80 transition-colors">
            {county.title}
          </h3>
          {county.summary && (
            <p className="text-text-medium mt-2 line-clamp-2">
              {county.summary}
            </p>
          )}
        </div>
        <svg 
          className="w-5 h-5 text-neutral-400 group-hover:text-brand-blue transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      
      {county.statsJson && (
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <div className="flex flex-wrap gap-3">
            {county.statsJson.population && (
              <div className="text-sm">
                <span className="font-medium text-text-dark">Population:</span> {county.statsJson.population.toLocaleString()}
              </div>
            )}
            {county.statsJson.agencies && (
              <div className="text-sm">
                <span className="font-medium text-text-dark">Agencies:</span> {county.statsJson.agencies}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

CountyCard.displayName = 'CountyCard';

export default CountyCard;