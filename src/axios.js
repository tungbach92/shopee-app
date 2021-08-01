import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-shopee-demo-c6d2b.cloudfunctions.net/api", // api url(our cloud func)
  //http://localhost:5001/shopee-demo-c6d2b/us-central1/api
});
export default instance;
