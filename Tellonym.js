const axios = require('axios')
class Client{
  constructor(token=String){
    this.token = token
  }
 async ready(readyStatus=String ){
   
   if(!this.token) throw new Error('Token Is Invaild')
   console.log(`${readyStatus}`)
   
 } 
  async myself(){
   if(!this.token) throw new Error('Token Is Invaild')
   let data = await axios.get(`https://api.tellonym.me/accounts/myself?limit=25`,{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    })
    return data.data
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
  async answer(answer=String,id=Number){
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


async ask(userId=Number , message=String){
       if(!this.token) throw new Error('Token Is Invaild')
    if(!message || !userId) throw new Error('Please Full All Values')
    let data = await axios.get(`https://api.tellonym.me/tells/new`,{
      tell: message,
      userId: userId},{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    }
                              )
  return data.data
    }
    async follow(userId=Number , anonymous=Boolen ){
       if(!this.token) throw new Error('Token Is Invaild')
    if(!anonymous||!userId) throw new Error('Please Full All Values')
    let data = await axios.get(`https://api.tellonym.me/followings/create`,{
      isFollowingAnonymous: anonymous,
      userId: userId
    },{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    }
                              )
  return data.data
    }

  async unFollow(userId=Number){
       if(!this.token) throw new Error('Token Is Invaild')
    if(!userId) throw new Error('Please Full All Values')
    let data = await axios.get(`https://api.tellonym.me/followings/destroy`,{
      userId: userId
    },{
      headers: {
        "authorization" : `Bearer ${this.token}`
      }
    }
                              )
  return data.data
    }
  }

module.exports.login = Client; 
