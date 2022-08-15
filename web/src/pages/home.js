import React from "react";
import { useQuery } from "@apollo/client";

import MainContentWrapper from "../components/main/MainContentWrapper.js";
import NewSeriesForm from "../components/admin/NewSeriesForm.js";
import NewEpisodes from "../components/main/NewEpisodes.js";

import { GET_EPISODES } from "../gql/query.js";

const HomePage = () => {
    
    const { data, loading, error } = useQuery(GET_EPISODES);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка!</p>

    return (
        <MainContentWrapper>
            <NewSeriesForm />
            <NewEpisodes episodes={data.episodes} />
            <div style={{textAlign: "center", padding: "20px 0px 0px 0px"}}>Здесь могла быть ваша реклама</div>
        </MainContentWrapper>
    );
};

export default HomePage;