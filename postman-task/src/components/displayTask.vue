<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      axios
        .get("http://192.168.1.61:3000/task/get")
        .then((res) => {
          for (let tags of res.data.data) {
            let obj = {
              id: tags.id,
              name: tags.name,
              description: tags.description,
              createDate: tags.createDate,
              tags: tags.tags,
              userId: tags.user.id,
              userName: tags.user.name,
            };
            this.data.unshift(obj);
          }
          console.log(this.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(id) {
      this.$router.push(`/addTask/${id}`);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-1 col-md-1 col-sm-1"></div>
      <div class="col-lg-10 col-md-12 col-sm-12">
        <table class="table table-striped">
          <thead>
            <tr class="table-dark">
              <th scope="col">Task id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Create Date</th>
              <th scope="col">Tags</th>
              <th scope="col">User Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tags, index) in data">
              <td>{{ index + 1 }}</td>
              <td>{{ tags.name }}</td>
              <td>{{ tags.description }}</td>
              <td>{{ tags.createDate }}</td>
              <td>{{ String(tags.tags) }}</td>
              <td>{{ tags.userId }}</td>
              <td>{{ tags.userName }}</td>
              <td>
                <button class="btn btn-primary" @click="edit(tags.id)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 100px;
}
</style>
