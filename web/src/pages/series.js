import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';

import { GET_SERIES } from "../gql/query";

import MainContentWrapper from "../components/main/MainContentWrapper";
import Series from "../components/main/Series";

const SeriesPage = props => {

    let { id } = useParams();
    let kinopoiskId = Number(id);    

    const { data, loading, error } = useQuery(GET_SERIES, { variables: { kinopoiskId }});

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка!</p>

    return (
        <MainContentWrapper>
            <Series data={data} />
        </MainContentWrapper>
    )
};

export default SeriesPage;