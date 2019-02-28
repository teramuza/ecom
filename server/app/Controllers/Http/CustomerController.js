'use strict'


const Customer = use('App/Models/Customer')

class CustomerController {

    async profile ({params}) {
        const {id} = params
        const user = await Customer.findBy('user_id', id)
        return user
    }
}

module.exports = CustomerController
