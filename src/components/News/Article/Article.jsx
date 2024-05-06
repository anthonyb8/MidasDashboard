import React from 'react';
import './Article.css';
import { BsX } from "react-icons/bs";

const Article = ({ isOpen, close, content }) => {
    if (!isOpen) return null;

    const { html, title, date } = content;

    return (
        <div className="article-outer">
            <div className="article-inner">
                <button onClick={close} className="icon-close"><BsX /></button>
                <h1 className="article-title">{title}</h1>
                <div className="date-source">
                    <span>{new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric', 
                        hour: 'numeric', minute: '2-digit', hour12: true
                    })} - Source:&nbsp;</span>
                    <a href="https://www.benzinga.com" target="_blank" rel="noopener noreferrer" className="source-link">Benzinga</a>
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        </div>
    );
};

export default Article;
