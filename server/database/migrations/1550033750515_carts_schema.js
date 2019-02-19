'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartsSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.integer('prod_id').unsigned().references('id').inTable('products')
      table.integer('qty').notNullable()
      table.boolean('is_checkout').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartsSchema
