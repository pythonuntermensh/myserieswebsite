import React from "react";

import EpisodesBlock from "./EpisodesBlock";

const NewEpisodes = props => {

    let episodes = props.episodes;

    return (
        <EpisodesBlock episodes={props.episodes} />
    )
};

export default NewEpisodes;