<script>
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      router: useRouter(),
      errorMsg: "",
      postData: [],
      show1: false,
      show2: true
    };
  },
  methods: {
    AddData() {
      const userInfo = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      axios
        .post("http://192.168.1.61:3000/user/register", userInfo)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.$refs.registerForm.reset();
            this.router.push("/login");
            AuthService;
          }
        })
        .catch((error) => {
          // this.errorMsg = error.response.data.data.message;
        });
    },
  },

};
</script>


  <!-- <div class="container"> -->
  <!-- <div class="row"> -->
  <!-- <div class="col-lg-4 col-md-1 col-sm-1"></div> -->
  <!-- <div class="col-lg-4 col-md-10 col-sm-12"> -->
  <!-- <form ref="registerForm" class="form-control bg-light p-5" @:submit.prevent="AddData"> -->
  <!-- <h4 class="text-center">Register</h4> -->
  <!-- <br /> -->
  <!-- <input type="text" class="form-control mb-4 text-center" placeholder="Enter Name" v-model="name" required /> -->
  <!-- <input type="email" class="form-control mb-4 text-center" placeholder="Enter Email" v-model="email" -->
  <!-- required /> -->
  <!-- <input type="password" name="" id="" class="form-control mb-4 text-center" placeholder="Enter password" -->
  <!-- v-model="password" required /> -->

  <!-- <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div> -->
  <!-- <br /> -->
  <!-- <div>Alreday have an Account? <router-link to="/login">Sign in</router-link></div> -->
  <!-- <div class="d-flex justify-content-center"> -->
  <!-- <button type="submit" class="btn btn-dark mt-4">Submit</button> -->
  <!-- </div> -->
  <!-- </form> -->
  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->
  <template>
  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10 rounded" @submit.prevent="AddData">
          <h3 class=" mb-4 pa-2 d-flex justify-content-center font-weight-black">Register</h3>
          <v-text-field 
            v-model="name" 
            label="Enter Name" 
            placeholder="Enter Your Name" 
            type="text" 
            variant="outlined"
            :rules="[() => !!name || 'This field is required', () => name.match(/^[a-zA-Z]+$/) || 'enter only alphabates']"
            class="mb-3"
            >
          </v-text-field>
          <v-text-field 
            v-model="email" 
            label="Enater Email"
            placeholder="Enter Your Email address" 
            type="email"
            variant="outlined"
            :rules="[() => !!email || 'This field is required']"
            class="mb-3">
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[() => !!password || 'This field is required', () => password.length>=6  || 'min 6 characters']"
            label="Enter Your Password"
            counter
            variant="outlined"
            placeholder="Enter Your Password"
            @click:append="show1 = !show1"
          ></v-text-field>  '
            <div class="mb-4">Alreday have an Account? <router-link to="/login" class=" font-weight-black">Sign in</router-link></div>
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="x-large" color="dark" class="text-white" type="submit">Submit</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  margin: 70px auto;
}
</style>
