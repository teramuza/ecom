'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// Route.get('/', 'ProductController.index')


//Product Routes
Route.get('api/v1/products', 'ProductController.index')
Route.get('api/v1/product/:id', 'ProductController.byId')

//Cart Routes
Route.get('api/v1/orders', 'CartController.index')
Route.get('api/v1/orders/count','CartController.countRow')
Route.get('api/v1/order/:id', 'CartController.byId')
Route.post('api/v1/order', 'CartController.input')
Route.patch('api/v1/order/:id/:qty', 'CartController.qtyCtrl')
Route.delete('api/v1/order/:id', 'CartController.delete')

//costom (Count order)
Route.get('api/v1/cartBy/:key/:val', 'CartController.byKey')
