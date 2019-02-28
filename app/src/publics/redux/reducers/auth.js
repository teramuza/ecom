const initialValue = {
	data : {
		token : '',
		userId : '',
		tokenType : '',
		message : '',
		refreshToken : '',
	},
	isLoading : false,
	isError: false
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	    case 'POST_LOGIN_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'POST_LOGIN_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : {
	    			token : action.payload.data.token,
	    			userId : action.payload.data.id,
	    			tokenType : action.payload.data.type,
	    			message : action.payload.data.message,
	    			refreshToken : action.payload.data.refreshToken
	    		}
	    	}

	    case 'POST_LOGIN_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    case 'POST_REGIST_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'POST_REGIST_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : {
	    			token : action.payload.data.token,
	    			userId : action.payload.data.id,
	    			tokenType : action.payload.data.type,
	    			message : action.payload.data.message,
	    			refreshToken : action.payload.data.refreshToken
	    		}
	    	}

	    case 'POST_REGIST_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    default:
	    	return state;
	   
	}
}


