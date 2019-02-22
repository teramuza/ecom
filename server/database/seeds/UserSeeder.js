'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const dump0 = new User()
    dump0.username = 'UserDump'
    dump0.password = 'password'
    dump0.email = 'user@mail.com'
    await dump0.save()

    const dump1 = new User()
    dump1.username = 'UserDump1'
    dump1.password = 'password'
    dump1.email = 'user1@mail.com'
    await dump1.save()
  }
}

module.exports = UserSeeder