import React from "react";

import "./style/SerialsBlock.css";

const SerialsBlock = props => {
    return (
        <ul className="series-list small-block-grid-2 medium-block-grid-3 large-block-grid-4">
            {props.data.serials.map(series => { return (
                <li key={series.kinopoisk_id}>
                    <div className="item">
                        <a href={"/series/" + series.kinopoisk_id} className="field-img">
                            <img src={series.picture_url} alt="img"/>
                        </a>
                        <div className="serial-bottom">
                            <div className="field-title">
                                <a href={"/series/" + series.kinopoisk_id}>
                                {series.name + " \"" + series.original_name + "\""}
                                </a>
                            </div>
                            <div className="field-description">
                                <a href={"/series/" + series.kinopoisk_id}>
                                    {series.seasons_number} сезонов {series.episodes_number} серий
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            )})}
        </ul>
    );
};

export default SerialsBlock;