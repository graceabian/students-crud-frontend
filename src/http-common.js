import axios from "axios";
export default axios.create({
  //baseURL: "https://mighty-ravine-32012.herokuapp.com/",
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});
