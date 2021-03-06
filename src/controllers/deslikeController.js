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
        
        if(!LoggedDev.deslikes.includes(devId))
            LoggedDev.deslikes.push(devId)

        await LoggedDev.save()

        return  res.json(LoggedDev)
    }
}