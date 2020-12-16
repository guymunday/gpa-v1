import { useState, useEffect } from "react";
import Head from "next/head";
import { client } from "@utils/prismicPosts";
import SliceZone from "@components/SliceZone/SliceZone";
import Image from "next/image";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Team from "@components/Team";
import Events from "@components/Events";

const OverlayStyles = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: var(--yellow);
  z-index: 999;
`;

export default function Home({ menuOpen, homepage, team, events }) {
  const [finishLoading, setFinishLoading] = useState(true);

  console.log(team);

  useEffect(() => {
    setTimeout(() => {
      setFinishLoading(false);
      sessionStorage.setItem("first_time", "1");
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>Good People Agency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        {finishLoading &&
        typeof window !== "undefined" &&
        !sessionStorage.getItem("first_time") ? (
          <OverlayStyles
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>
      <div>
        {homepage.data.body && <SliceZone allSlices={homepage.data.body} />}
        <Image
          src={homepage.data.hero_image.url}
          alt="Image"
          layout="responsive"
          width="100%"
          height="100%"
        />
        <Events events={events} />
        <Team team={team} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const homepage = await client.getSingle("homepage");
  const team = await client.getSingle("team");
  const events = await client.getSingle("events");
  return {
    props: {
      homepage,
      team,
      events,
    },
  };
}
