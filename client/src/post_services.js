
// backend url //
const url = "http://37.46.209.112:4000/";

class post_services{

    static async get_users(){
        let raw_data = undefined;
      try{
         raw_data = await fetch(`${url}get_users`).then(res => res.json())
         let last_users = raw_data['users'].slice(Math.max(raw_data['users'].length - 50, 0))
         return last_users;

      }catch(error){
        console.log(error)
        return false
      }
    }

    static async register_user(input_username){
      try{
        let res = await fetch(`${url}register`,
        {
        headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username: `${input_username}`})
        }).then(res => res.json())

        return res['status']
        
      }catch(error){
        console.log(error)
        return false
      }
    }

    static async get_random_username(){
      try{
        let raw_data = await fetch(`${url}get_rand_user`).then(res => res.json())
        return raw_data['rand_name']
      }catch(error){
        console.log(error)
        return false
      }
    }
}

export default post_services 
