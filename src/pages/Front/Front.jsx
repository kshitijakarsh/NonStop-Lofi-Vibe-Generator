import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import "./front.css";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Front = () => {
  useEffect(() => {
    let tl = gsap.timeline();
    tl.from(".head", {
      y: 300,
      stagger: {
        each: 5,
      },
      duration: 2.5,
      ease: "expo.inOut",
    });
  }, []);

  return (
    <motion.div
      className="text-white bg-black h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />
      <div className="w-full text-center mt-32">
        <div className="text-7xl p-4 text-center lg:text-9xl uppercase tracking-widest mx-4 lg:mx-40 lg:mt-32">
          {"LofiVibe".split(" ").map((word, index) => {
            return word === " " ? (
              <div className="head" key={index}>
                &nbsp;
              </div>
            ) : (
              <div className="head" key={index}>
                {word}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-around">
          <div className="lg:mt-12 mx-4 text-2xl lg:text-2xl mt-24">
            <button className="mb-3 lg:mb-5 lg:mr-6 p-2 lg:p-4 rounded-md bg-gradient-to-r from-violet-600 to-pink-500 transition-all duration-300">
              <Link to="/experience" className="ml-1 mr-6 text-center">
                Music Experience
              </Link>
            </button>
            <br class="lg:hidden" />
            <button className="p-2 lg:p-4 rounded-md bg-gradient-to-r from-violet-600 to-pink-500 transition-all duration-300">
              <Link to="/sound">AI Generated Music</Link>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Front;
