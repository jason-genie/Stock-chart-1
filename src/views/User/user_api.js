import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router'


export const authLogin = (username, password) => {
  
    return axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        toast("Successful!");
        window.location.assign('/dashboard');
      })
      .catch(err => {
        toast(err);
    });
  
  };


  export const authSignup = (username, email, password, passwordConfirm) => {

      axios
        .post("http://127.0.0.1:8000/rest-auth/registration/", {
          
          username: username,
          email: email,
          password1: password,
          password2: passwordConfirm
        })
        .then(res => {
          const token = res.data.key;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem("token", token);
          localStorage.setItem("expirationDate", expirationDate);
          toast("Successful!");
          window.location.assign('/dashboard');

        })
        .catch(err => {
            toast(err);
        });

  };

  export const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    window.location.assign('/login');
  };

  export const getUser = (username) => {
    const data = 
    axios
        .post("http://127.0.0.1:8000/current-user/", {
          username: username,
        })
    return data;
  }

  export const updateUser = (userId, username, email, firstname, lastname, password) => {

    axios
      .post("http://127.0.0.1:8000/update-user/", {
        userId: userId,
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      })
      .then(res => {
        toast("Successful!");
        localStorage.setItem("username", username);

      })
      .catch(err => {
          toast("Update error!");
      });

};