//scr/components/entrypage.js
import React from 'react';

const EntryPage = ({ onEnter }) => {
    return (
        <div className="entry-page">
            <h1>Welcome to RltyChk</h1>
            <h2>Finding the best place to live since 2024</h2>
            <button onClick={onEnter}>Enter</button>
        </div>
    );
};

export default EntryPage;
