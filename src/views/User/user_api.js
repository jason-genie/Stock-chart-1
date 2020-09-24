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
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        toast("Successful!");
        window.location.assign('/dashboard');
      })
      .catch(err => {
        toast("User sign in error!");
    });
  
  };


  export const authSignup = (username, email, firstname, lastname, password, passwordConfirm) => {

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
            toast("User sign up error!");
        });

  };

  export const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    window.location.assign('/login');
  };