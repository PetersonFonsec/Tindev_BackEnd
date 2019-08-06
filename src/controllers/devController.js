const axios = require('axios')
const Dev = require('../models/dev')

module.exports = {
    async store(req, res){
        const { username } = req.body

        const result =  await axios.get(`https://api.github.com/users/${ username }`)
        
        const { name, login, bio, avatar_url } = result.data

        await Dev.create({ 
            name,
            bio,
            user: login,
            avatar: avatar_url
         })      

        return res.json()
    }
}