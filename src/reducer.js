export const initialState = {
  ids: [],
  basket: [],
  subtotal: 0
}
const ids = []
const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'ADD_TO_BASKET':
      if (state.ids.indexOf(action.item.id) === -1) {
        state.ids.push(action.item.id)
        return {
          ...state,
          basket: [...state.basket, action.item],
          subtotal: state.subtotal + action.amount
        }
      }
      if (state.ids.indexOf(action.item.id) !== -1) {
        ++state.basket.find((el) => el.id.match(action.item.id)).quantity;
        state.subtotal += action.amount
      }
    default:
      return state;
  }
}

export default reducer