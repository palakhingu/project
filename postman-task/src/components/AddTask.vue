<template>
  <!-- <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" @submit.prevent="AddTask">
          <h4 class="text-center">Add Task</h4>
          <br />
          <div class="text-center fs-5 text-danger" v-if="errorMessage">{{ errorMessage }}</div>
          <br />
          <h6 class="form-label text-center">Name</h6>
          <input type="text" class="form-control mb-4 text-center" placeholder="enter name" v-model="name" required />
          <h6 class="form-label text-center">Description</h6>
          <textarea class="form-control mb-4 text-center" placeholder="enter description" v-model="description" required></textarea>
          <h6 class="form-label text-center">Create Date</h6>
          <input type="date" name="" id="" class="form-control mb-4 text-center" placeholder="Enter password" v-model="createDate" required />
          <h6 class="form-label text-center">Select tag</h6>
          <MultiSelect v-model="selectedTags" :options="allTags" optionLabel="tag" optionValue="id" display="chip" class="w-full" placeholder="select tags" />
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-dark mt-4">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div> -->


  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10 rounded" @submit.prevent="AddTask">
          <h3 class=" mb-4 pa-2 d-flex justify-content-center font-weight-black">Add Task</h3>
          <v-text-field 
            v-model="name" 
            label="Name" 
            placeholder="Enter Your Name" 
            type="text" 
            variant="outlined"
            :rules="[() => !!name || 'This field is required']"
            class="mb-3"
            >
          </v-text-field>
          <v-textarea
          label="Description"
          row-height="25"
          rows="3"
          variant="outlined"
          auto-grow
          shaped
          v-model="description"
          :rules="[() => !!description || 'This field is required']"
        >
      </v-textarea>
         <v-text-field type="date" name="" id="" class="w-100 mb-4"  label="create date" variant="outlined"  v-model="createDate" required />
         <v-select
              v-model="selectedTags"
              :items="items.map(item => item.tags)"
              item-value="id"
              item-text="tags"
              label="Select tags"
              chips
              multiple
              variant="outlined"
            ></v-select>
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="x-large" color="dark" class="text-white" type="submit">Submit</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

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
      errorMessage: "",
      // items: ['foo', 'bar', 'fizz', 'buzz'],
      items: [
  { id: 1, tags: "palak" },
  { id: 2, tags: "spinach" }
]
    };
  },
  created() {
    this.getTags();
    this.getUser();
    this.fetchUserData();
  },

  methods: {
    AddTask() {
      console.log("this.stackholder", this.stackholder);
      let addTag = {
        name: this.name,
        description: this.description,
        createDate: this.createDate,
        stakeHolder: Object.values(this.stackholder),
        tags: Object.values(this.selectedTags),
      };
      axios
        .post("http://192.168.1.61:3000/task/create", addTag)
        .then((res) => {
          console.log(res);
          this.name = "";
          this.description = "";
          this.createDate = "";
          this.selectedTags = [];
          this.$router.push("/displayTask");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.stackholder.push(user.id);
      } else {
        this.errorMessage = "user is not logged in, Please log in to add Task";
      }
    },
    getTags() {
      axios
        .get("http://192.168.1.61:3000/tag/get")
        .then((res) => {
          this.allTags = res.data.data.map((tag) => ({ id: tag.id, tag: tag.tag }));
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
            this.name = data.name;
            this.description = data.description;
            this.createDate = data.createDate;
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

<style scoped>
.container {
  margin: 70px auto;
}
</style>
