import { gql } from "@apollo/client";

const GET_EPISODES = gql`
    query Episodes {
        episodes {
            series {
                name
            }
            translates
            description
            picture_url
            url
            season_number
            episode_number
        }
    }
`;

const GET_SERIALS = gql`
    query Serials {
        serials {
            kinopoisk_id
            name
            original_name
            picture_url
            seasons_number
            episodes_number
        }
    }
`

const GET_SERIES = gql`
    query Series($kinopoiskId: Int!) {
        series(kinopoisk_id: $kinopoiskId) {
            name
            episodes {
                series {
                    name
                }
                season_number
                episode_number
                url
                picture_url
                translates
                description
            }
        }
    }
`

export {
    GET_EPISODES,
    GET_SERIALS,
    GET_SERIES
};