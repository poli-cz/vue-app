<template>
<div class = 'page_wrap'>
  <div class = 'main_component_container'>

    <div class = 'left'>
      <h1>Registered users </h1>
      <h3>Last 50 users</h3>
        <ul id="example-1">
          <table >
           <tr><li v-for="item in users" :key="item" id = "name">
             {{ item }}
           </li></tr>
          </table>
        </ul>
     </div>

    <div class = 'right'>
      <h1>Register now! </h1>
      <h3>Enter or generate username</h3>
      <div class = 'action_container'>
        <input type="text" name="username" placeholder="enter username to register" id='username' required> <br>
        <button v-on:click='register_user'> Register</button>
        <button v-on:click='get_rand_user'> Generate random username</button>
         <p id = "status_container"></p>
      </div>
    </div>
  </div>
  <div class='about_container'>
    <h1>How does all this work? <img  src="../assets/question.png" class='icon'></h1> 
    <p>This is a demonstration of simple vue.js usage. Aplication consists of two key parts</p>
    <h3>Server <a href="http://37.46.209.112:4000/" id='adr'>37.46.209.112:4000</a></h3>
    
    <p>The main purpose for server is handling requests,
       download data from 3rd party API, in this case <a href="https://randomuser.me/api/">https://randomuser.me/api/</a> 
      and storing users data.<br> In this example users data are stored in simple files.<br> Server got 3 simple endpoints:
    </p>
    <ul>
      <li><a href="http://37.46.209.112:4000/get_users">/get_users</a> returns list of all users</li>
      <li><a href="http://37.46.209.112:4000/register">/register</a> register new user by given name </li>
      <li><a href="http://37.46.209.112:4000/get_rand_user">/get_rand_user</a> API call, get random user</li>
    </ul>
    
    <h3>Frontend <a href="http://37.46.209.112:8080/" id='adr'>37.46.209.112:8080</a></h3>
    <p>Simple one page application with only one component. <br> Endpoint calls can be found in 
      <i>post_service.js</i> file in <i>src</i> directory.
    </p>

  </div>
</div>
</template>

<script>
import post_services from '../post_services'

export default {
  name: 'main_page',
  data() {
    return {
      users: [],
      error: ''
    }
  },
  async created(){
    try{
      this.users = await post_services.get_users()
    }catch(err){
      this.error = err.message
    }
  },
  methods: {
    async register_user(){
      let answer = undefined;
      let val = document.getElementById("username").value;

      if(val == ''){
        document.getElementById("status_container").innerHTML = "Enter some username"
        return 
      }

      try{
        answer = await post_services.register_user(val);
      }catch (err){
        this.error = err.message
      }
    

      if(answer == "Registered"){
        document.getElementById("status_container").innerHTML = `${answer}`;
        document.getElementById("status_container").style.color = 'green';
      }else{
        document.getElementById("status_container").innerHTML = `${answer} !`;
        document.getElementById("status_container").style.color = 'red';
      }

      this.users = await post_services.get_users()
      document.getElementById("username").value = '';
    },
    async get_rand_user(){
      let rand_user = undefined;
      try{
        rand_user = await post_services.get_random_username()
      }catch(err){
        this.error = err.message
      }
      
      document.getElementById("username").value = rand_user;
    }
  }
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#example-1{
  display: grid;
}

.main_component_container{
  column-count: 2;
  min-width: 500px;
}

.main_component_container .left{
  padding: 20px;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid;
}

.main_component_container .right{
  padding: 20px;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid;
}

input[type=text] {
    width: 60%;
    padding: 15px 22px;
    margin: 10px 5px;
    box-sizing: border-box;  
    margin-left: -1px;
    font-size: 17px;
    text-align: center;
}

button {
  background-color: #42b883; /* Green */
  border: none;
  color: white;
  padding: 15px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
}

.action_container{
  padding-top: 15px;
}

#status_container{
  color: red;
}

.about_container{
  max-width: 600px;
  margin: auto;
  padding-bottom: 50px;
}
.about_container li{
  line-height: 30px;
}

#name{
  margin: 7px;
}

.icon{
  height: 45px;
  margin-bottom: -10px;
  margin-left: 5px;
}

#adr{
  font-size: 15px;
}

@media only screen and (max-width: 980px) {
  .main_component_container{
    column-count: 1;
    width: 100%;  
  }
  .about_container{
     max-width: 90%
  }
}


</style>
