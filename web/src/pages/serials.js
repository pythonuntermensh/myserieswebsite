import React from "react";
import { useQuery } from "@apollo/client";

import MainContentWrapper from "../components/main/MainContentWrapper.js";
import SerialsBlock from "../components/main/SerialsBlock.js";

import { GET_SERIALS } from "../gql/query.js";

const SerialsPage = () => {

    const { data, loading, error } = useQuery(GET_SERIALS);

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка!</p>

    return (
        <MainContentWrapper>
            <SerialsBlock data={data} />
        </MainContentWrapper>
    );

};

export default SerialsPage;