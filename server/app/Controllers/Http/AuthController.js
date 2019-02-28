'use strict'

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Customer = use('App/Models/Customer');
const Database = use('Database')

class AuthController {

    async register({request}){
      await User.create(request.all())
    }

      // async register({request, auth, response}) {
      
      // const trx = await Database.beginTransaction()

      //   let { username, email, password } = request.post()
      //   let { name, avatar, phone } = request.post()

      //   let checkRow = await User.findBy('email', email)

      //   if(checkRow){
      //     return response.json({message: 'Email sudah terdaftar', status : 'registered'})

      //   }else{

      //     let user = await User.create({username,email,password})
      //     if(user){
            
      //       let userRole = await User.findBy('email', email)
            
      //       await Customer.create({ user_id : userRole.id, name, avatar, phone })

      //       try {
      //         let check = await auth
      //           .authenticator('jwt')
      //           .withRefreshToken()
      //           .attempt(email,password)

      //         if (check) {
      //             Object.assign(userRole, check)

      //             return response.json(userRole)
      //           }
      //       }
      //       catch (e){
      //         console.log(e)
      //       return response.json({message: 'Anda gagal login', status : 'error'})
      //       }
      //     }
      //   }
      // }
      // 
      
      async newLogin({request, auth}){
        const {email, password } = request.all()
        return await auth.attempt(email, password)
      }

      async login({request, auth, response}) {

        let {email, password} = request.all();

        try {
          let check = await auth
            .authenticator('jwt')
            .withRefreshToken()
            .attempt(email,password)

          if (check) {
            let user = await User.findBy('email', email)

            Object.assign(user, check)

            return response.json(user)
          }


        }
        catch (e) {
          console.log(e)
          return response.json({message: 'Email/Password salah atau tidak terdaftar'})
        }
      }
      
      async revokeUserToken ({ request, auth }) {
        const user = auth.current.user
        const { refreshToken } = request.all()

        await auth
          .authenticator('jwt')
          .revokeTokens([refreshToken])

      }
}

module.exports = AuthController
