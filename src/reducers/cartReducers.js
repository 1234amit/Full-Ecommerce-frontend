import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    // shipping reducer
    CART_SAVE_SHIPPING_ADDRESS,
    // PAYMENT REDUCER
    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,

} from '../constants/cartConstants'


export const cartReducer = (state = {cartItems: [], shippingAddress:{}}, action) =>{
    switch(action.type){

        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }

            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        // shipping reducer code start here
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload,
            }


        // payment method code start here
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload,
            }


        //to clear the cart items form the local storage when we are place order
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems:[]
            }



        default:
            return state 
    }
}