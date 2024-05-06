import log from 'loglevel';
import { useState, useContext, useEffect } from 'react';
import { NewsContext } from '../../../contexts/NewsContext';

export const useNews = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredNews, setFilteredNews] = useState({});
    const [currentFilter, setCurrentFilter] = useState("News");
    const { loading, error, news, initialDownloadFlag } = useContext(NewsContext);
    const filters = ['News', 'Markets', 'Economics','Commodities','Cryptocurrency','Options', 'Equities', 'Events', 'Politics'];

    // Function to filter news based on the selected filter
    const filterNews = (filter) => {
        const lowerCaseFilter = filter.toLowerCase();
        const filtered = Object.keys(news).reduce((acc, key) => {
            const item = news[key];
            const matchesFilter = (field) => 
                item[field] && item[field].some(f => 
                    f.name && f.name.toLowerCase().includes(lowerCaseFilter));

            if (matchesFilter('channels') || matchesFilter('tags')) {
                acc[key] = item;
            }

            return acc;
        }, {});

        setFilteredNews(filtered);
    };

    useEffect(() => {
        setIsLoading(loading);
        if (!loading) {
            log.info(`Starting to filter news based on current filter: ${currentFilter}`);
            try {
                filterNews(currentFilter);
            } catch (error) {
                log.error(`Error filtering news: ${error}`);
            }
        }
    }, [currentFilter, initialDownloadFlag]);

    return {
        isLoading, 
        error,
        filters,
        currentFilter,
        setCurrentFilter,
        filteredNews
    };
};
