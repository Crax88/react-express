const initialState = {}

export default function(state = initialState, action) {
    const {type, payload} = action
    swith (type) {
        default:
            return state
    }
}