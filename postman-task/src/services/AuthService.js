import axios from "axios";

const API_URL = "http://192.168.1.61:3000/user";

class AuthService {
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  getUserInfo() {
    return localStorage.getItem("token");
  }

  contructor() {
    console.log(getUserInfo());
  }
}

export default new AuthService();
