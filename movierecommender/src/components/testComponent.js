import React, { useEffect } from 'react';

function TestComponent() {
    useEffect(() => {
        console.log('useEffect called in TestComponent');
    }, []);

    return <h1>TestComponent</h1>;
}

export default TestComponent;