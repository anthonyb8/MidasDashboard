import React, { useState } from 'react';
import './Headlines.css';
import Article from '../Article/Article.jsx';
import stock_image from '../../../assets/stock_image.png'

const Headlines = ({ stories }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openArticle = (article) => {
        setSelectedArticle({
            html: article.body,
            title: article.title,
            date: article.created
        });
        setModalOpen(true);
    };

    const closeArticle = () => {
        setModalOpen(false);
    };

    // Pull the most recent articles for headline
    const newestKeys = Object.keys(stories).sort((a, b) => b - a).slice(0, 2);
    const story1 = stories ? stories[newestKeys[0]] : {};
    const story2 = stories ? stories[newestKeys[1]] : {};

    // Reformat date of article
    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', 
            hour: 'numeric', minute: '2-digit', hour12: true
        }) : '';
    };
    const createdDate1 = formatDate(story1.created);
    const createdDate2 = formatDate(story2.created);
    
    // Get large image for better resolution
    const getImageUrl = (story) => {
        const largeImage = story.image?.find(image => image.size === 'large');
        return largeImage ? largeImage.url : stock_image;
    };

    return (
        <div className="headlines-bar">
            {story1.id && (
                <div className="story-container" onClick={() => openArticle(story1)}>
                    <img src={getImageUrl(story1)} alt={story1.title} />
                    <div className="story-overlay">
                        <h1>{story1.title}</h1>
                        <p>{createdDate1}</p>
                    </div>
                </div>
            )}
            {story2.id && (
                <div className="story-container" onClick={() => openArticle(story2)}>
                    <img src={getImageUrl(story2)} alt={story2.title} />
                    <div className="story-overlay">
                        <h1>{story2.title}</h1>
                        <p>{createdDate2}</p>
                    </div>
                </div>
            )}
            <Article isOpen={modalOpen} close={closeArticle} content={selectedArticle} />
        </div>
    );
};

export default Headlines;
