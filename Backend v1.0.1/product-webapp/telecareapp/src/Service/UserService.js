import axios from "axios";

const baseUrl = 'http://localhost:8080'

const UserService = {
  getUserData: function (url) {
    return axios.get(baseUrl + url)
  },

  updateUserData: function (url, data) {
    return axios.patch(baseUrl + url, data)
  },
}

export default UserService;