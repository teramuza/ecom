'use strict'

const Cart = use('App/Models/Cart')
const Database = use('Database')

class CartController {
	async index(){
		const carts = await Database
		.select('carts.id', 'carts.prod_id', 'products.title', 'products.image', 'products.price', 'carts.qty')
		.from('products')
		.innerJoin('carts', 'products.id', 'carts.prod_id' )
		return carts
	}

	async byKey({ params }){
		const {key,val} = params
		const cart = await Cart.findBy(key, val)
		return cart
	}

	async byId({ params }){
		const {id} = params
		const cart = await Cart.find(id)
		return cart
	}

	async countRow(){
		const rows = await Cart.getCount()
		return rows
	}

	async input({ request }){
		await Cart.create(request.post())
		return request.post()
	}

	async qtyCtrl({ params }){
		const {id, qty} = params
		await Cart
		.query()
		.where('id', id)
		.update({qty})
	}

	async delete({ params }){
		const {id} = params
		const cart = await Cart.find(id)
		
		await cart.delete()
	}

	async dropAll(){
		const carts = await Cart.truncate()
		return carts
	}
}

module.exports = CartController
