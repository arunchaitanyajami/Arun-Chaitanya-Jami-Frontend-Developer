import React from 'react';

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
        }}>
            <h1 style={{ fontSize: '5rem' }}>404</h1>
            <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                Oops! The page you requested could not be found.
            </p>
        </div>
    );
};

export default NotFound;
