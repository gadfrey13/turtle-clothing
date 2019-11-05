import { createSelector } from "reselect";
//doing this prevents the item count being rerendered each time the application is called
const selectCart = state => state.cart;
//prevent rerender of component of change state not associated with this component
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);
