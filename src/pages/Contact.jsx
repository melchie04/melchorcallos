import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { LuSend } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { contents } from "../assets/contents/contact";
import PageTitle from "../components/PageTitle";
import "react-toastify/dist/ReactToastify.css";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;

emailjs.init(publicKey);

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(serviceId, templateId, e.target, publicKey).then(
      (result) => {
        console.log(result.text);
        toastSuccess("Email sent successfully!");
        setLoading(false);
      },
      (error) => {
        console.log(error.text);
        toastError("Failed to send email. Please try again.");
        setLoading(false);
      }
    );
  };

  const toastSuccess = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const toastError = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const Form = () => {
    return (
      <form
        className="lg:w-1/3 md:w-1/2 w-full flex flex-col justify-center items-center mx-auto p-6 space-y-3"
        onSubmit={sendEmail}
      >
        <input
          className="w-full bg-transparent rounded-md border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary p-2"
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          placeholder="Name"
          required
        />
        <input
          className="w-full bg-transparent rounded-md border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary p-2"
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          required
        />
        <textarea
          className="w-full bg-transparent rounded-md border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary p-2 pb-12 custom-scrollbar"
          id="message"
          name="message"
          autoComplete="off"
          placeholder="Message"
          required
        ></textarea>
        <button
          className="flex justify-center items-center bg-primary text-lg text-light font-semibold rounded-lg cursor-pointer py-2 px-8 transition duration-300 hover:bg-primary/60"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                class="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="ml-2">Sending...</span>
            </>
          ) : (
            <>
              <LuSend />
              <span className="ml-2">Send</span>
            </>
          )}
        </button>
      </form>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <PageTitle
        title={contents.title.toUpperCase()}
        subtitle={contents.subtitle}
      />
      <Form />
      <ToastContainer />
    </motion.div>
  );
};

export default Contact;
