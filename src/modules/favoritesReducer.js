import Actions from './actions'

export default (state = {items: []}, action) => {
    switch (action.type) {
        case Actions.Types.CREATE_FAVORITE:
            return {
                items:
                    [
                        ...state.items,
                        {
                            id: state.items.length === 0 ? 0 :  state.items[state.items.length - 1].id + 1,
                            name: action.payload
                        }
                    ]
            };
        case Actions.Types.DELETE_FAVORITE:
            return {
                items: state.items.filter((value, index, arr) => (value.id !== action.payload))
            };
        default:
            return state;
    }
}
