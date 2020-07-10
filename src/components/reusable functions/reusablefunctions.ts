import axios from "axios";


export const checkIfTokenIsPresented = () => {
  axios
    .get(`http://localhost:4000/`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
    .then((res) => {
      console.log("--------res.data", res.data);
    })
    .catch((err) => {
      console.log("err", err);
      window.location.replace("/login")
    });
}

