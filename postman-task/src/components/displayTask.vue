<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      allTags: [],
      user: []
    };
  },
  mounted() {
    this.getTasks();
    this.getTags();
    this.getUser();
  },
  created() {
    this.getTasks();
    this.getTags();
    this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get("http://192.168.1.61:3000/user/get/")
        .then((res) => {
          this.user = res.data.data.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
          }, {});
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    },
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
            let user = task.stakeHolder.map((userId) => this.user[userId]).join(" , ");
            let obj = {
              id: task.id,
              name: task.name,
              description: task.description,
              createDate: task.createDate,
              tags: tags,
              stackHoldes: user,
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
  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="12">
        <v-table height="600px" fixed-header>
          <thead>
            <tr>
              <th class="text-center  text-h6">
                Task id
              </th>
              <th class="tex-center text-h6">
                Name
              </th>
              <th class="text-center text-h6">
                Description
              </th>
              <th class="tex-center text-h6">
                Create date
              </th>
              <th class="text-center text-h6">
                Tags
              </th>
              <th class="tex-center text-h6">
                Stack holders
              </th>
              <th class="tex-center text-h6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tags, index) in data">
              <td>{{ index + 1 }}</td>
              <td>{{ tags.name }}</td>
              <td>{{ tags.description }}</td>
              <td>{{ tags.createDate }}</td>
              <td>{{ tags.tags }}</td>
              <td>{{ tags.stackHoldes }}</td>
              <td>
                <v-btn elevation="4" rounded="lg" size="small" color="primary" class="text-white"
                  @click="edit(tags.id)">Update</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

</template>
<style scoped>
.container {
  margin-top: 60px;
}
</style>
