import { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";
import Navigation from "@components/Navigation";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { createGlobalStyle } from "styled-components";
import reset from "../styles/reset";
import global from "../styles/global";
import Loader from "@components/Loader";
import Social from "@components/Social";

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${global}
    `;

const NavWrapper = styled(motion.nav)`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--secondary);
  z-index: 9999;
`;

const ContactWrapper = styled(motion.nav)`
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  background: var(--yellow);
  z-index: 9999;
`;

const MyApp = ({ Component, pageProps, router }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const apolloClient = new ApolloClient({
    link: PrismicLink({
      uri: process.env.NEXT_PUBLIC_PRISMIC_URL,
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/lho7obo.css" />
        <link href="static/fonts/fonts.css" rel="stylesheet" />
      </Head>
      <GlobalStyles />
      <Loader />
      <AnimatePresence>
        {menuOpen && (
          <NavWrapper
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            onClick={() => setMenuOpen(false)}
          >
            <Navigation />
          </NavWrapper>
        )}
        {contactOpen && (
          <ContactWrapper
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            onClick={() => setContactOpen(false)}
          ></ContactWrapper>
        )}
      </AnimatePresence>
      <motion.div
        style={{ position: "relative" }}
        initial={{ x: 0 }}
        animate={{
          x: menuOpen ? "100%" : contactOpen ? "-50%" : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          contactOpen={contactOpen}
          setContactOpen={setContactOpen}
        />
        <AnimatePresence>
          <motion.main
            key={router.asPath}
            exit={{
              opacity: 0,
            }}
          >
            <Component
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              {...pageProps}
              menuOpen={menuOpen}
            />
            <Social />
            <Footer />
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </ApolloProvider>
  );
};

export default MyApp;
