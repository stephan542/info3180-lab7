/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Uploadform = Vue.component("upload-form",{
   template: `
        <div>
            <div v-for="err in error" class="alert alert-danger">
                <h4 >{{err}}</h4>
            </div>
            <div v-for="res in response" class="alert alert-success" style="width:100%"> 
                <h4 >{{res}}</h4>
            </div>
                </table>
        <form id="uploadForm" method="POST" @submit.prevent="uploadPhoto" enctype="multipart/form-data" >
                <h4><label for="description">Description</label></h4>
                <textarea id="description" name="description"></textarea>
                <h4><label for="photo">Image</label></h4>
                <input id="photo" name="photo" type="file">
                <br><br>
                <button class="submit_btn">Submit</button>
                <br><br>
            </form>
        </div>
   `,
   data:{
       error:[],
       response:[]
   },
   methods:{
       uploadPhoto:function(){
           let uploadForm = document.getElementById('uploadForm')
           let form_data = new FormData(uploadForm);
           fetch("/api/upload",{
               method:'POST',
               body: form_data,
               headers:{
                   'X-CSRFToken':token
               },
               credentials: 'same-origin'
               
           }).then(function(response){
               return response.json();
           }).then(function (jsonResponse){
               console.log(jsonResponse);
               if(jsonResponse.error){
                   self.error = jsonResponse.error;
               }else{
                   self.response = ["Flle Upload Sucessfull"];
               }
               self.$router.push("/upload");
           }).catch(function(error){
               console.log(error);
           });
       }
   }
});
// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/upload", component: Uploadform  }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});