import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-note-2-2.onrender.com/api",
});

export default api;




//       http://localhost:3000/api