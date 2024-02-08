// src/App.js
import React, { useState } from 'react';
import EntryPage from './components/entrypage';
import AppContent from './components/appcontent';
import './App.css'; // Make sure to import your CSS for styling

const App = () => {
    const [hasEntered, setHasEntered] = useState(false);

    const enterApp = () => {
        setHasEntered(true);
    };

    return (
        <div className="app">
            {!hasEntered ? <EntryPage onEnter={enterApp} /> : <AppContent />}
        </div>
    );
};

export default App;

