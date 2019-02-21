'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 50).notNullable()
      table.string('category', 50).notNullable()
      table.string('image').notNullable()
      table.string('image2')
      table.string('image3')
      table.string('seller', 50).notNullable()
      table.double('price', 20).notNullable()
      table.double('oldPrice', 20)
      table.integer('discount', 2)
      table.text('detail')
      table.integer('stock', 3).notNullable()
      table.boolean('is_favorite').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
