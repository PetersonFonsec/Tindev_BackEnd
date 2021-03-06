const Dev = require("../models/dev")

module.exports = {
    async store(req, res){

        const { user } = req.headers
        const { devId } = req.params

        const LoggedDev = await Dev.findById( user ).catch( console.log )            

        const targetDev = await Dev.findById( devId ).catch( console.log )            
                
        if( !targetDev ) {
            return res.status(400).json({ error: "Dev not exist" })
        }

        if(targetDev.likes.includes(LoggedDev._id)){
            const LoggedSocket = req.userConnected[user]
            const targeSocket = req.userConnected[devId]
            
            console.log(targeSocket)

            if(LoggedSocket)
                req.io.to(LoggedSocket).emit('match', targetDev)
            
            if(targeSocket)
                req.io.to(targeSocket).emit('match', LoggedDev)
            
        }             
        
        if(!LoggedDev.likes.includes(devId))
            LoggedDev.likes.push(devId)

        await LoggedDev.save()

        return  res.json(LoggedDev)
    }
}