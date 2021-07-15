import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/shopee-demo-c6d2b/us-central1/api", // api url(our cloud func)
});
export default instance;
