export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((
      cartItem //returns a new array so components rerender. If property change only component does not rerender
    ) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]; //quanity property gets attached the first item is added to cart
};

export const removeItemFromCart = (cartItems, cartItemRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
