import { useState } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { usePageControl } from "../providers/PageControlProvider";
import { home } from "../assets/contents/contents";
import { avatar } from "../assets/contents/images";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div className="flex flex-col md:flex-row items-center animate-float">
        <Avatar />
        <Greetings />
      </div>
    </motion.div>
  );
};

const Greetings = () => {
  const [text] = useTypewriter(home.typewriter);

  return (
    <div className="flex flex-col justify-center md:items-start items-center md:mx-5 md:my-0 mx-0 my-5">
      <h1 className="lg:text-7xl sm:text-6xl text-5xl font-bold m-1">
        <span>Hi, I'm </span>
        <span className="text-primary">{home.nickname}</span>
      </h1>
      <p className="lg:text-3xl sm:text-2xl text-xl text-secondary-light dark:text-secondary-dark font-medium italic m-1">
        {text}
        <Cursor />
      </p>
    </div>
  );
};

const Avatar = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const { setActivePage } = usePageControl();

  return (
    <div className={`flex flex-1 justify-center items-center transition-opacity duration-500 ${
      imgLoading ? "opacity-0" : "opacity-100"
    }`}
    >
      <Link
        className="size-48 relative rounded-full overflow-hidden bg-dark dark:bg-light after:bg-light after:dark:bg-dark
        before:bg-gradient-to-t before:from-primary before:dark:to-secondary-dark before:to-secondary-light circular-spin-animation"
        to="/contact"
        onClick={() => setActivePage("/contact")}
      >
        <div className="flex flex-col justify-center items-center absolute inset-[12px] z-10 rounded-full overflow-hidden cursor-pointer">
          <img
            className="size-full absolute top-0 left-0 object-cover bg-dark dark:bg-light transition-opacity duration-500 hover:opacity-0"
            src={avatar}
            alt="avatar"
            onLoad={() => setImgLoading(false)}
          />
          <p className="size-full flex justify-center items-center bg-dark dark:bg-light text-primary text-center text-xl font-bold">
            SAY HELLO!
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Home;
