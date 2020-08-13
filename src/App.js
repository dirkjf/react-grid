import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {

    const [width, setWidth] = useState(60);
    const [height, setHeight] = useState(50);
    const [aliveProbability, setAliveProbability] = useState(40); // Percentage

    const renderGridRow = () => {
        let gridRow = [];
        for (let i = 0; i < width; i++) {
            gridRow[i] = <Cell key={i} aliveProbability={aliveProbability} />;
        }
        return gridRow;
    }

    const renderGrid = () => {
        let gridRows = [];
        for (let i = 0; i < height; i++) {
            gridRows[i] = <Row key={i}>{renderGridRow(i)}</Row>;
        }
        return (gridRows);
    }

    return (
        <div className="grid">
            {renderGrid()}
        </div>
    );
}

function Cell(props) {

    const [alive, setAlive] = useState(Math.random() < props.aliveProbability/100);

    useEffect(() => {
        const interval = setInterval(() => setAlive(Math.random() < props.aliveProbability/100), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"cell " + (alive ? 'alive' : '') }>
            {props.children}
        </div>
    );


}

function Row(props) {
    return (
        <div className="row">
            {props.children}
        </div>
    );
}

export default App;
