<!-- <script>
import axios from "axios";
import Multiselect from "@vueform/multiselect";



export default {
  components: {
    Multiselect,
  },
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
<style src="@vueform/multiselect/themes/default.css"></style> -->

<!-- <template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form
          action=""
          class="form-control bg-light p-5"
          @:submit.prevent="AddTask"
        >
          <h4 class="text-center">Add Task</h4>
          <br />
          <div class="text-center fs-5 text-danger" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <br />
          <input
            type="text"
            class="form-control mb-4 text-center"
            placeholder="enter name"
            v-model="name"
            required
          />
          <textarea
            class="form-control mb-4 text-center"
            placeholder="enter description"
            v-model="description"
            required
          ></textarea>
          <h6 class="form-label text-center">Create Date</h6>
          <input
            type="date"
            name=""
            id=""
            class="form-control mb-4 text-center"
            placeholder="Enter password"
            v-model="createDate"
            required
          />
          <h6 class="form-label text-center">Select tag:</h6>
          <br />
          <multiselect
            v-model="selectedTags"
            :options="allTags"
            :multiple="true"
            track-by="id"
            label="tag"
            placeholder="Select tags"
            @update:model-value="onSelectChange"
          ></multiselect>
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
import Multiselect from "@vueform/multiselect";


export default {
  components: {
    Multiselect,
  },
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
  },
  methods: {
    AddTask() {
      let addTag = {
        name: this.name,
        description: this.description,
        createDate: this.createDate,
        stakeHolder: Object.values(this.stackholder),
        tags: this.selectedTags.map((tag) => tag.id), // Mapping selected tags to their IDs
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
        console.log(Object.values(this.stackholder));
      } else {
        this.errorMessage = "user is not logged in, Please log in to add Task";
      }
    },
    getTags() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        this.allTags = res.data.map((tag) => ({ id: tag.id, tag: tag.title }));
        console.log(this.allTags);
      });
    },
    onSelectChange(value) {
      this.selectedTags = value;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 70px auto;
}
</style> -->

<template>
  <div class="multiselect">
    <div class="selected" @click="toggleDropdown">
      <span v-if="selectedOptions.length === 0">Select options...</span>
      <span v-else>
        {{ selectedOptions.join(', ') }}
      </span>
    </div>
    <div class="dropdown" v-show="isDropdownOpen">
      <div v-for="option in options" :key="option.id" @click="toggleOption(option)">
        <label :for="'option_' + option.id">
          <input type="checkbox" :id="'option_' + option.id" :value="option.id" :checked="isSelected(option.id)">
          {{ option.title }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isDropdownOpen: false,
      options: [], // Initially empty, to be filled with API data
      selectedOptions: [],
      selectedItems: [],
    };
  },
  mounted() {
    // Fetch data from API when component is mounted
    this.fetchData();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleOption(option) {
      const index = this.selectedItems.indexOf(option.id);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
        this.selectedOptions.splice(index, 1);
      } else {
        this.selectedItems.push(option.id);
        console.log(this.selectedItems);
        this.selectedOptions.push(option.title);
      }
    },
    isSelected(optionId) {
      return this.selectedItems.includes(optionId);
    },
    async fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.options = response.data; // Assuming the API response is an array of objects with 'id' and 'title' properties
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>


<style scoped>
.multiselect {
  position: relative;
  width: 200px;
}

.selected {
  border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.dropdown div {
  padding: 5px;
  cursor: pointer;
}

.dropdown label {
  margin-left: 5px;
}
 </style>


