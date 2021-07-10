import axios from "axios";

const instance = axios.create({
  baseURL: "...", // api url(our cloud func)
});
export default instance;
