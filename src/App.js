import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
    const [width, setWidth] = useState(40);
    const [height, setHeight] = useState(30);
    const [aliveProbability, setAliveProbability] = useState(40); // Percentage
    const [aliveArray, setAliveArray] = useState(new Array(width * height));

    useEffect(() => {
        const interval = setInterval(() => {
            setAliveArray((oldArray) => {
                const newArray = [...oldArray];
                for (let i = 0; i < newArray.length; i++) {
                    newArray[i] = Math.random() < aliveProbability / 100;
                }
                return newArray;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [aliveProbability]);

    const renderGridRow = (rowNum) => {
        let gridRow = [];
        for (let i = 0; i < width; i++) {
            gridRow[i] = <Cell key={i} alive={aliveArray[rowNum * height + i]} />;
        }
        return gridRow;
    };

    const renderGrid = () => {
        let gridRows = [];
        for (let i = 0; i < height; i++) {
            gridRows[i] = (
                <Row key={i} rowNum={i}>
                    {renderGridRow(i)}
                </Row>
            );
        }
        return gridRows;
    };

    return <div className="grid">{renderGrid()}</div>;
}

function Cell(props) {
    return (
        <div className={"cell " + (props.alive ? "alive" : "")}>
            {props.children}
        </div>
    );
}

function Row(props) {
    return <div className="row">{props.children}</div>;
}

export default App;
