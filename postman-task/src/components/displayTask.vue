<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      allTags: [],
      selectedTags: [],
      uniqTags: [],
      tags: [],
    };
  },
  mounted() {
    this.getTasks();
    this.getTags();
  },
  methods: {
    getTags() {
      axios
        .get("http://192.168.1.61:3000/tag/get")
        .then((res) => {
          this.allTags = res.data.data.reduce((acc, tag) => {
            acc[tag.id] = tag.tag;
            return acc;
          }, {});
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    },

    getTasks() {
      axios
        .get("http://192.168.1.61:3000/task/get")
        .then((res) => {
          for (let task of res.data.data) {
            let tags = task.tags.map((tagId) => this.allTags[tagId]).join(" , ");
            let obj = {
              id: task.id,
              name: task.name,
              description: task.description,
              createDate: task.createDate,
              tags: tags,
              userId: task.user.id,
              userName: task.user.name,
            };
            this.data.unshift(obj);
          }
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
              <td>{{ tags.tags }}</td>
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
