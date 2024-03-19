<script>
import axios from "axios";
// import Multiselect from "@vueform/multiselect";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  // components: {
  //   Multiselect,
  // },
  components: { Treeselect },
  data() {
    return {
      name: "",
      description: "",
      createDate: "",
      stackholder: [],
      allTags: [],
      selectedTags: [],
      errorMessage: "",
      value: [],
      options: ["Batman", "Robin", "Joker"],
    };
  },
  mounted() {
    this.getTags();
    this.getUser();
  },
  methods: {
    AddTask() {
      console.log(this.selectedTag);
      let addTag = {
        name: this.name,
        description: this.description,
        createDate: this.createDate,
        stakeHolder: Object.values(this.stackholder),
        tags: Object.values(this.selectedTag),
      };
      axios
        .post("http://192.168.1.61:3000/task/create", addTag)
        .then((res) => {
          console.log(res);
          this.name = "";
          this.description = "";
          this.createDate = "";
          this.selectedTag = [];
          this.$router.push("/displayTask");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(addTag);
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.stackholder.push(user.id);
        console.log(Object.values(this.stackholder));
      } else {
        this.errorMessage = "user is not logged in , Please log in to add Task";
      }
    },
    getTags() {
      axios.get("http://192.168.1.61:3000/tag/get").then((res) => {
        for (let tags of res.data.data) {
          let obj = {
            id: tags.id,
            tag: tags.tag,
          };
          this.allTags.push(obj);
        }
        console.log(this.allTags);
      });
    },
  },
};
</script>

<template>
  <navbar />
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" @:submit.prevent="AddTask">
          <h4 class="text-center">Add Task</h4>
          <br />
          <div class="text-center fs-5 text-danger" v-if="errorMessage">{{ errorMessage }}</div>
          <br />
          <input type="text" class="form-control mb-4 text-center" placeholder="enter name" v-model="name" required />
          <textarea class="form-control mb-4 text-center" placeholder="enter description" v-model="description" required></textarea>
          <h6 class="form-label text-center">Create Date</h6>
          <input type="date" name="" id="" class="form-control mb-4 text-center" placeholder="Enter password" v-model="createDate" required />
          <h6 class="form-label text-center">Select tag:</h6>
          <br />
          <select v-model="selectedTag" class="form-select" required multiple>
            <option v-for="tags in allTags" :value="tags.id" class="text-center">{{ tags.tag }}</option>
          </select>
          <!-- <Multiselect v-model="value" :multiple="true" :taggable="true" placeholder="Select your characters" :options="options" /> -->
          <Treeselect :multiple="true" :options="options" placeholder="Select your favourite(s)..." v-model="value" />
          <Treeselect-value :value="value" />
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-dark mt-4">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  margin: 70px auto;
}
</style>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->

