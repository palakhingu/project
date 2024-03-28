<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      description: "",
      createDate: "",
      stackholder: [],
      allTags: [],
      selectedTags: [],
      selectedStackholder: []

    };
  },
  // created() {
  //   this.getTags();
  //   this.getUser();
  //   this.fetchUserData();
  // },
  mounted() {
    this.getTags();
    this.getUser();
    this.fetchUserData();
  },

  methods: {
    AddTask() {
      let addTag = {
        name: this.name,
        description: this.description,
        createDate: this.createDate,
        stakeHolder: Object.values(this.selectedStackholder),
        tags: Object.values(this.selectedTags),
      };
      console.log(addTag);
      axios
        .post("http://192.168.1.61:3000/task/create", addTag)
        .then((res) => {
          console.log(res);
          this.name = "";
          this.description = "";
          this.createDate = "";
          this.selectedStackholder = [];
          this.$router.push("/displayTask");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemProps(item) {
      return {
        title: item.tag,
        value: item.id,
      }
    },
    itemProp(item) {
      return {
        title: item.name,
        value: item.id,
      }
    },
    getUser() {
      axios
        .get("http://192.168.1.61:3000/user/get/")
        .then((res) => {
          this.stackholder = res.data.data.map((user) => ({ id: user.id, name: user.name }));
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    },
    getTags() {
      axios
        .get("http://192.168.1.61:3000/tag/get")
        .then((res) => {
          this.allTags = res.data.data.map((tag) => ({ id: tag.id, tag: tag.tag }));
          console.log(this.allTags);
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    },

    fetchUserData() {
      const taskId = this.$route?.params?.id;
      if (taskId) {
        axios
          .get(`http://192.168.1.61:3000/task/get/${taskId}`)
          .then((response) => {
            const data = response.data.data;
            console.log(data);
            this.name = data.name;
            this.description = data.description;
            this.createDate = data.createDate;
            data.stakeHolder.forEach((id) => {
              this.stackholder.find((users) => {
                if (users.id == id) {
                  this.selectedStackholder.push(users);
                }
              })
            });
            data.tags.forEach((id) => {
              this.allTags.find((tags) => {
                if (tags.id == id) {
                  this.selectedTags.push(tags.id);
                }
              });
            });
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            this.errorMsg = "Failed to fetch user data. Please try again.";
          });
      }
    },
  },
};
</script>

<template>
  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="4" md="5" sm="8" xs="7" xl="5" xxl="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10 rounded" @submit.prevent="AddTask">
          <h3 class=" mb-4 pa-2 d-flex justify-content-center font-weight-black">Add Task</h3>
          <v-text-field v-model="name" label="Name" placeholder="Enter Your Name" type="text" variant="outlined"
            :rules="[() => !!name || 'This field is required']" class="mb-3" required>
          </v-text-field>
          <v-textarea label="Description" row-height="25" rows="3" variant="outlined" auto-grow shaped
            v-model="description" :rules="[() => !!description || 'This field is required']" required>
          </v-textarea>
          <v-text-field type="date" name="" id="" class="w-100 mb-4" label="create date" variant="outlined"
            v-model="createDate" required :rules="[() => !!createDate || 'This field is required']" />
          <v-select v-model="selectedStackholder" :item-props="itemProp" :items="stackholder" multiple
            label="select stackholders" variant="outlined" chips required
            :rules="[() => !!selectedStackholder || 'This field is required']"></v-select>
          <v-select v-model="selectedTags" :item-props="itemProps" :items="allTags" multiple label="select tags"
            variant="outlined" chips required :rules="[() => !!selectedTags || 'This field is required']"></v-select>

          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="large" color="dark" class="text-white" type="submit">Submit</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
.container {
  margin: 50px auto;
}
</style>
