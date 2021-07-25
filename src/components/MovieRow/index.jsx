import React, { useState } from 'react';
import './index.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function MovieRow({ title, items }) {
    const [scrollX, setScrollX] = useState(-400);

    function handleLeftArrow() {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0;
        }
        
        setScrollX(x);
    }
    
    function handleRightArrow() {
        let x = scrollX - Math.round(window.innerWidth / 2);
        const listW = items.results.length * 150;

        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{ marginLeft: scrollX, width: items.results.length * 150 }}>
                    {
                        items.results.length > 0 && items.results.map((i, k) => (
                            <div key={k} className="movieRow--item">
                                <img src={i.poster_path !== null ? `https://image.tmdb.org/t/p/w300${i.poster_path}` : 'https://i.ibb.co/bPHcC1M/error.png'} alt={i.original_title} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}