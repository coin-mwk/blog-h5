import {GET_ARticle_LIST} from '../actionTypes'
const initState = {}
export default function article (state = initState, { type, payload }) {
    switch (type) {
        case GET_ARticle_LIST:
            return payload
        default:
            return state
    }
}