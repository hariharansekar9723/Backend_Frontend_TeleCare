import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'http://localhost:2002'

const ApiService = {

  getData: function (url) {
    return axios.get(baseUrl + url)
  },
  postData: function (url, data) {
    return axios.post(baseUrl + url, data)
  },
  updateData: function (url, data) {
    return axios.patch(baseUrl + url, data)
  },
  tostErr: function (err) {
    toast.error(err);
  },
  tostSuccess: function (success) {
    toast.success(success);
  }
}

export default ApiService;