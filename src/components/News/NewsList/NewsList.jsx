import React, { useState } from 'react';
import './NewsList.css';
import Article from '../Article/Article.jsx';
import stock_image from '../../../assets/stock_image.png';  

const NewsList = ({ stories }) => {
    const initialItemsToShow = 10;
    const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const loadMoreItems = () => {
        setItemsToShow(itemsToShow + initialItemsToShow);
    };

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

    // Fitler out headline stories 
    const storiesArray = Object.values(stories).sort((a, b) => new Date(b.created) - new Date(a.created));
    const visibleStories = storiesArray.slice(2);

    // Get image URL or set to stock image if none
    const getImageUrl = (story) => {
        const Image = story.image?.find(image => image.size === 'small');
        return Image ? Image.url : stock_image; 
    };

    return (
            <div className="news-list-container">
                {visibleStories.slice(0, itemsToShow).map(story => (
                    <div className='article-teaser' key={story.id} onClick={() => openArticle(story)}>
                        <img src={getImageUrl(story)} alt={story.title} />
                        <div className="article-text">
                            <p>{new Date(story.created).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                                hour: 'numeric', minute: '2-digit', hour12: true
                            })}</p>
                            <h1>{story.title}</h1>
                            <p>{story.teaser}</p>
                        </div>
                    </div>
                ))}
                {itemsToShow < visibleStories.length && (
                    <button className="news-list-load-more" onClick={loadMoreItems}>LOAD MORE</button>
                )}
                {modalOpen && (
                    <Article isOpen={modalOpen} close={closeArticle} content={selectedArticle} />
                )}
            </div>
        );
};

export default NewsList;
