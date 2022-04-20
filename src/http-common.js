import axios from "axios";
export default axios.create({
  baseURL: "https://mighty-ravine-32012.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
