const axios = require('axios')
const Dev = require('../models/dev')

module.exports = {
    async index(req, res){
        const { user } =  req.headers

        const loggedUser = await Dev.findById(user)

        const result = await Dev.find({
            $and: [                
                { _id: { $ne: user } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.deslikes} },
            ]
        })

        return res.json(result)
    },
    async store(req, res){
        const { username:user } = req.body
        
        const userExist = await Dev.findOne( { user } )

        if( userExist ) return res.json(userExist)        

        const result =  await axios.get(`https://api.github.com/users/${ user }`)
        
        const { name, bio, avatar_url:avatar } = result.data
        
        const dev = await Dev.create( { name, bio, avatar, user } )      

        return res.json(dev)
    }
}