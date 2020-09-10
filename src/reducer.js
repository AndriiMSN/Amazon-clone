export const initialState = {
  ids: [],
  basket: [],
  subtotal: 0,
  items: 0
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_TO_BASKET':
      if (state.ids.indexOf(action.item.id) === -1) {
        return {
          ids: [...state.ids, action.item.id],
          basket: [...state.basket, action.item],
          subtotal: state.subtotal + action.amount,
          items: state.items + 1
        }
      }
      else {
        if (state.basket.length > 0) {
          // state.basket[state.basket.length - 1].quantity += 1
          const basketsShallowCopy = [...state.basket];
          const basketToUpdate = basketsShallowCopy.pop();
          const updatedBasked = {
            ...basketToUpdate,
            quantity: basketToUpdate.quantity + 1,
          };

          basketsShallowCopy.push(updatedBasked);
          return {
            ...state,
            basket: basketsShallowCopy,
            subtotal: state.subtotal + action.amount,
            items: state.items + 1
          };
        }

      }
      return state
    // }
    //

    case 'REMOVE_FROM_BASKET':
      const index = state.ids.findIndex((el) => el.id == action.id)
      state.ids.splice(index, 1)
      state.subtotal -= action.price * action.quantity
      return {
        ...state,
        basket: state.basket.filter(el => el.id !== action.id),
        items: state.items - action.quantity
      }
    default:
      return state;
  }
}

export default reducer