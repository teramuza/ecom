const initialValue = {
	data : {
		name : 'Guest',
		avatar : 'https://png.pngtree.com/svg/20170920/ico_avatar_1189275.png',
		terapoint : 0
	},
	isLoading : false,
	isError: false
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	    case 'GET_PROFILE_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'GET_PROFILE_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : action.payload.data
	    	}

	    case 'GET_PROFILE_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    default:
	    	return state;
	   
	}
}


