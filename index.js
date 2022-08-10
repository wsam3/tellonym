const axios = require('axios')
class Client{
  constructor(token){
    this.token = token
  }
 async ready(readyStatus=String ){
   if(!this.token) throw new Error('Token Is Invaild')
   console.log(`${readyStatus}`)
 } 
  
  async getQuestions(limit=Number){
       if(!this.token) throw new Error('Token Is Invaild')

    if(!limit || isNaN(limit)) limit = 10
    let data = await axios.get(`https://api.tellonym.me/tells?limit=${limit}`,{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    })
    return data.data.tells
  }
  async sendAnswer(answer=String,id=Number){
    let data = await axios.post('https://api.tellonym.me/answers/create',{
  answer:answer,
  tellId:id,
  limit:13
    },{
  headers : {
        "authorization" :`Bearer ${this.token}`
      }
    })
    return data.data
  }



  async getUser(username=String , max=Number){
       if(!this.token) throw new Error('Token Is Invaild')
    if(!max || isNaN(max)) max = 25
    let data = await axios.get(`https://api.tellonym.me/search/users?searchString=${username}&term=test&limit=${max}`,{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    })
    return data.data
  }



  async getFeed(max=Number){
    if(!this.token) throw new Error('Token Is Invaild')
 if(!max || isNaN(max)) max = 25
 let data = await axios.get(`https://api.tellonym.me/check/updates?limit=${max}`,{
   headers: {
     "authorization" : `Bearer ${this.token}`
   }
 })
 return data.data
}

}




module.exports.login = Client; 
