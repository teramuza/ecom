import axios from 'axios'

import '../../../cfg'

export const getProducts = () => {
	return{
		type : 'GET_PRODUCTS',
		payload : axios.get(`${apiUrl}/products`)
	}
}

export const getProduct = (id) => {
	return{
		type : 'GET_PRODUCT',
		payload : axios.get(`${apiUrl}/product/${id}`)
	}
}