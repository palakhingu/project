<template>
  <navbar></navbar>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" @submit.prevent="AddTask">
          <h4 class="text-center">Add Task</h4>
          <br />
          <div class="text-center fs-5 text-danger" v-if="errorMessage">{{ errorMessage }}</div>
          <br />
          <input type="text" class="form-control mb-4 text-center" placeholder="enter name" v-model="name" required />
          <textarea class="form-control mb-4 text-center" placeholder="enter description" v-model="description" required></textarea>
          <h6 class="form-label text-center">Create Date</h6>
          <input type="date" name="" id="" class="form-control mb-4 text-center" placeholder="Enter password" v-model="createDate" required />
          <h6 class="form-label text-center">Select tag:</h6>
          <MultiSelect v-model="selectedTags" :options="allTags" optionLabel="tag" optionValue="id" display="chip" class="w-full" placeholder="select tags" />
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-dark mt-4">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import login from "./login.vue";

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
    };
  },
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
        stakeHolder: Object.values(this.stackholder),
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
        console.log(Object.values(this.stackholder));
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
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            console.log(tag);
            // if (tags) {
            // this.selectedTags.push(tags); // Push tag object into selectedTags array
            // }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },

    fetchUserData() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      axios
        .get(`http://192.168.1.61:3000/task/get/${taskId}`)
        .then((response) => {
          console.log(response.data.data.name);
          this.name = response.data.data.name;
          this.description = response.data.data.description;
          this.createDate = response.data.data.createDate;

          const selectedTagIds = response.data.data.tags;
          console.log(selectedTagIds);

          // Clear existing selected tags
          this.selectedTags = [];

          // Iterate through selected tag IDs and find corresponding tag objects
          selectedTagIds.forEach((id) => {
            const tag = this.allTags.find((tag) => tag.id == id);
            if (tag) {
              this.selectedTags.push(tag); // Push tag object into selectedTags array
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 70px auto;
}
</style>
