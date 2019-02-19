const initialValue = {
	item : {},
	data : [],
	isLoading : false,
	isError: false
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	    case 'GET_PRODUCTS_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'GET_PRODUCTS_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : action.payload.data
	    	}

	    case 'GET_PRODUCTS_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    case 'GET_PRODUCT_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'GET_PRODUCT_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		item : action.payload.data
	    	}

	    case 'GET_PRODUCT_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    		item : 'Error Network'
	    	}

	    default:
	    	return state;
	   
	}
}


