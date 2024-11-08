import React, { useState } from "react";
import "./login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [showbutton, setshowbutton] = useState("Show");

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const handleShowButton = () => {
    if (showbutton === "Show" && show === false) {
      setshowbutton("Hide");
    } else {
      setshowbutton("Show");
    }
  };

  const handleShow = () => {
    setShow(!show);
    handleShowButton();
  };
  return (
    <motion.div
      className="bg-black h-screen text-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-center items-center m-32 bg-gray-900 rounded-3xl ">
        <div className="sm:w-1/2 p-12">
          <h1 className="text-5xl font-bold uppercase tracking-wider text-center mt-20">
            Log In
          </h1>
          <div className="flex justify-center items-center mt-5 text-lg">
            <span>
              New to LofiVibe? <Link to="/signup">Sign Up</Link>
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            autoComplete="off"
            className="z-50 p-8"
          >
            <div className="mt-5 pl-4 pr-4 pb-3">
              <span className="text-xl">Email</span>
              <br />
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="mt-3 w-full bg-black border-solid border-2 border-white text-white p-2 rounded-xl text-lg"
                autoComplete="false"
                onChange={handleChange}
              />
              <br />
            </div>

            <div className="mt-5 pl-4 pr-4 pb-3">
              <span className="text-xl">Password</span>
              <br />
              <div className="flex relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="mt-2 w-full bg-black text-white rounded-xl p-2 border-solid border-2 border-white text-lg pl-2"
                  autoComplete="false"
                  onChange={handleChange}
                />

                <span
                  onClick={handleShow}
                  className="absolute cursor-pointer right-2 top-2 mt-2 mr-1 flex items-center justify-center text-white font-bold text-xl"
                >
                  {showbutton}
                </span>
              </div>
              <br />
            </div>

            <div className="flex items-center justify-center p-4">
              <button
                type="submit"
                className="mt-2 text-white bg-gradient-to-r from-violet-600 to-pink-500 font-semibold w-full p-3 rounded-xl text-xl hover:scale-110 transition-all duration-300"
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </div>
            <h1 className="text-white text-center p-2 font-semibold">OR</h1>
            <OAuth />
            <p>{error ? error.message || "Something Went Wrong" : ""}</p>
          </form>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center shadow-lg shadow-gray-600">
          <img
            src="./images/lofiimage.png"
            alt="lofiimage"
            className="rounded-xl w-3/4 sm:w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
