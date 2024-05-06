import React, { useMemo } from 'react';
import "./NewsPage.css";
import { useNews } from './Hooks/useNews';
import NewsList from './NewsList/NewsList';
import FilterBar from './FilterBar/FilterBar';
import Headlines from './Headlines/Headlines';

const NewsPage = () => {
    const { isLoading, error, filters, currentFilter, setCurrentFilter, filteredNews } = useNews();

    // Memoize filteredNews to avoid recalculating it unless necessary
    const memoizedFilteredNews = useMemo(() => filteredNews, [filteredNews]);

    const handleFilterChange = (newFilter) => {
        setCurrentFilter(newFilter);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className='FilterBar'>
                <FilterBar filters={filters} onFilterChange={handleFilterChange}/>
            </div>
            <div className='HeaderBar'>
                <Headlines stories={memoizedFilteredNews} />
            </div>
            <div className='NewsList'>
                <NewsList stories={memoizedFilteredNews} />
            </div>
        </div>
    );
};

export default NewsPage;
