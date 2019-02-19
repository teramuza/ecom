const initialValue = {
	data : [],
	isLoading : false,
	isError: false
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	    case 'GET_CARTS_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'GET_CARTS_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : action.payload.data
	    	}

	    case 'GET_CARTS_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    case 'POST_CART_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'POST_CART_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false
	    	}

	    case 'POST_CART_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    		item : 'Error Network'
	    	}

	    case 'DEL_CART_PENDING':
	    	return{
	    		...state,
	    		isLoading : true,
	    		isError : false
	    	}

	    case 'DEL_CART_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : false
	    	}

	    case 'DEL_CART_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true
	    	}

	    default:
	    	return state;
	   
	}
}


