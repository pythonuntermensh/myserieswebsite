import { gql } from '@apollo/client';

const NEW_SERIES = gql`
    mutation NewSeriesWithId($kinopoiskId: Int!) {
        newSeriesWithId(kinopoisk_id: $kinopoiskId) {
            name
        }
    }
`;

export {
    NEW_SERIES
};