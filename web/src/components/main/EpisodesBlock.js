import React from "react";

import "./style/EpisodesBlock.css";

const EpisodesBlock = props => {
    return (
        <ul className="series-list small-block-grid-2 medium-block-grid-3 large-block-grid-4">
            {[...props.episodes, //test data below!!! remove on prod suka...
                /*{
                    series: {
                        name: "TestData1"
                    },
                    description: "Test", 
                    url: "http://myseria.pro/anime/1916-my-dress-up-darling/1-season/5-episode.html",
                    picture_url: "http://myseria.pro/uploads/posts/2022-02/death-in-paradise-2-307114.webp",
                    translates: ["fasfsa", "gas", "gadss", "gdsd"],
                    season_number: 1,
                    episode_number: 1
                }*/
            ].map((s) => { return (
                <li key={(s.series.name + " " + s.description)}>
                    <div className="item">
                        <div className="serial-top">
                            <div className="field-img" 
                            style={{backgroundImage: "url(" + s.picture_url + ")"}}>
                                <a href={s.url} >
                                </a>
                            </div>
                            <div className="serial-translate">
                                <div className="translations-line" key={(s.series.name + " " + s.description)}>
                                    {s.translates.slice(0, 6).map((translation) => {return (
                                        <span key={translation}>
                                            <a href={s.url + "#player-" + translation}>
                                                {translation}
                                            </a>
                                        </span>
                                    );})}
                                </div>
                            </div>
                            <div className="icon-play" />
                        </div>
                        <div className="serial-bottom">
                            <div className="field-title">
                                <a href={s.url}>
                                    {s.series.name}
                                </a>
                                {/*<span>{s.date}</span>*/}
                            </div>
                            <div className="field-description">
                                <a href={s.url}>
                                    {s.description}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            );})}
        </ul>
    );
};

export default EpisodesBlock;