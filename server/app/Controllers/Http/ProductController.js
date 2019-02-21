'use strict'

const Product = use('App/Models/Product')


class ProductController {

	async index(){
		const products = await Product.all()
		return products
	}

	async byId({ params }){
		const {id} = params
		const product = await Product.find(id)
		return product
	}

	async input({ request }){
		await Product.create(request.post())
	}

}

module.exports = ProductController