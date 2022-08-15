import React from "react";

import EpisodesBlock from "./EpisodesBlock";

import "./style/Series.css";

const Series = props => {
    
    let seasons = {};
    props.data.series.episodes.forEach(episode => {
        if (Object.keys(seasons).includes(String(episode.season_number))) {
            seasons[String(episode.season_number)].push(episode);
        } else {
            seasons[String(episode.season_number)] = [episode];
        }
    });

    return (
        <div className="page-content">
            {Object.entries(seasons).map(entry => {
                let episodes = entry[1];
                episodes.sort((a,b) => (a.episode_number > b.episode_number) ? 1 : ((b.episode_number > a.episode_number) ? -1 : 0)) ;return (
                <div className="episode-group" key={entry[0]}>
                    <div className="episode-group-name">
                        <span>{entry[0]} сезон</span>
                    </div>
                    <EpisodesBlock episodes={episodes} />
                </div>
            );})}
        </div>
    );
};

export default Series;