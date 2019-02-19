import axios from 'axios';

import '../../../cfg';

export const getCarts = () => {
	return{
		type : 'GET_CARTS',
		payload : axios.get(`${apiUrl}/orders`)
	}
}

export const addCart = (body) => {
	return{
		type : 'POST_CART',
		payload : axios.post(`${apiUrl}/order`, body)
	}
}

export const patchQty = (id,newQty) => {
	return {
		type : 'PATCH_QTY',
		payload : axios.patch(`${apiUrl}/order/${id}/${newQty}`)
	}
}

export const delCart = (id) => {
	return {
		type : 'DEL_CART',
		payload : axios.delete(`${apiUrl}/order/${id}`)
	}
}
