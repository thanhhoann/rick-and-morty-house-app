import "../styles/globals.css";
import "../styles/main.scss";
import "../styles/home.scss";
import "../styles/characterId.scss";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: { opacity: 0 },
          pageAnimate: { opacity: 1 },
          pageExit: {
            backgroundColor: "white",
            opacity: 0,
          },
        }}
      >
        <Component {...pageProps} />;
      </motion.div>
    </>
  );
}

export default MyApp;
