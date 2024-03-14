<script>
import axios from "axios";
export default {
  data() {
    return {
      postData: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      axios.get("https://fir-auth-15721-default-rtdb.firebaseio.com/user.json").then((res) => {
        this.postData = Object.values(res.data);
        console.log(this.postData);
      });
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">name</th>
              <th scope="col">Email</th>
              <th scope="col">birthdate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in postData" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.name }}</td>
              <td>{{ post.email }}</td>
              <td>{{ post.dob }}</td>
              <td>
                <button class="btn btn-primary" @click="$router.push({ params: { id: post.id } })">Edit</button>
                <button class="btn btn-danger" @click="$router.push({ params: { id: post.id } })">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<!-- Today's Update:
 Learning Project: ( @RAVI GAUD sir )
 => vue.js:
    - created users record using axios POST request
    - fetched users record using axios GET request
    - performed firebase Email/password authentication
 Tomorrow's task:
 => vue.js task continue -->