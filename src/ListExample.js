import React, { useState, useEffect } from "react";

import "../styles/ListExample.css";

const useKeyPress = function(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};

const items = [
    { id: 1, name: "Site1" },
    { id: 2, name: "Site2" },
    { id: 3, name: "Site3" },
    { id: 4, name: "Site4" },
    { id: 5, name: "Site5" }
];

const ListItem = ({ item, active, setSelected, setHovered }) => (
    <div
        className={`item ${active ? "active" : ""}`}
        onClick={() => setSelected(item)}
        onMouseEnter={() => setHovered(item)}
        onMouseLeave={() => setHovered(undefined)}
    >
        {item.name}
    </div>
);

const ListExample = () => {
    const [selected, setSelected] = useState(undefined);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    useEffect(() => {
        if (items.length && downPress) {
            setCursor(prevState =>
                prevState < items.length - 1 ? prevState + 1 : prevState
            );
        }
    }, [downPress]);
    useEffect(() => {
        if (items.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [upPress]);
    useEffect(() => {
        if (items.length && enterPress) {
            setSelected(items[cursor]);
        }
    }, [cursor, enterPress]);
    useEffect(() => {
        if (items.length && hovered) {
            setCursor(items.indexOf(hovered));
        }
    }, [hovered]);

    return (
        <div>
            <p>
                <small>
                    Sites >
                </small>
            </p>
            {items.map((item, i) => (
                <ListItem
                    key={item.id}
                    active={i === cursor}
                    item={item}
                    setSelected={setSelected}
                    setHovered={setHovered}
                />
            ))}
            <br/>
            <span> Selected: {selected ? selected.name : "none"}</span>
        </div>
    );
};

export default ListExample