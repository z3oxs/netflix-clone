import React, { useEffect, useState } from 'react';
import './index.css';
import Tmdb from '../../tmdb';
import MovieRow from '../MovieRow';
import FeaturedMovie from '../FeaturedMovies';
import Header from '../Header';

export default function App() {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(async () => {
        const list = await Tmdb.getHomeList();
        const originals = list.filter(i => i.slug === 'originals');
        const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        const chosen = originals[0].items.results[randomChosen];
        const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        
        setMovieList(list);
        setFeaturedData(chosenInfo);
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener(scrollListener);
    }, []);

    return (
        <div className="page">
            <Header black={blackHeader}/>
            {
                featuredData && 
                    <FeaturedMovie item={featuredData}/>
            }
            <section className="lists">
                {
                    movieList.map((i, k) => (
                        <MovieRow key={k} title={i.title} items={i.items}/>
                    ))
                }
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">❤️</span> por z3ox1s com <a href="https://www.youtube.com/watch?v=tBweoUiMsDg">Bonieky Lacerda</a><br />
                Direitos reservados à Netflix<br />
                Dados por TheMovieDB
            </footer>
            
            {
                movieList.length <= 0 &&
                    <div className="loading">
                        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
                    </div>
            }
        </div>
    );
}