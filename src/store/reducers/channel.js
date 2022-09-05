import {GET_CHANNEL_STATE} from '../actionTypes'
const initState = []
export default function channel (state = initState, { type, payload }) {
    switch (type) {
        case GET_CHANNEL_STATE:
            return payload
        default:
            return state
    }
}