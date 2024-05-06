import React from 'react';
import './FilterBar.css'; 

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="news-filter-bar">
      {filters.map((item, index) => (
        <React.Fragment key={item}>
          <button className='news-filter-bar-buttons' 
                  onClick={() => onFilterChange(item)}>
            {item}
          </button>
          {/* Render the separator unless it's the last item */}
          {index !== filters.length - 1 && <span className="news-separator"> | </span>}
        </React.Fragment>
      ))}
    </div>
  );
};
export default FilterBar;
