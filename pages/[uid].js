import { client } from "@utils/prismicPosts";
import Prismic from "prismic-javascript";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import Image from "next/image";
import Wrapper from "@components/Wrapper";
import SliceZoneUid from "@components/SliceZone/SliceZoneUid";

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .image-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(43, 43, 43, 0.4);
      opacity: 0.2;
      z-index: -1;
    }
  }
  h2 {
    display: inline-block;
    position: relative;
    z-index: 2;
  }
`;

const VisitSection = styled.section`
  width: 100%;
  min-height: 70vh;
`;

export default function BrandPage({ data }) {
  console.log(data);

  return (
    <>
      <Head>
        <title>{data.brand_name[0].text} | Good People Agency</title>
      </Head>
      <HeroSection>
        <div className="hero-image">
          <Image
            src={data.hero_image.url}
            alt={data.hero_image.alt}
            unsized
            layout="responsive"
            className="image-container"
          />
          <div className="image-overlay" />
        </div>
        <h2>{data.tagline[0].text}</h2>
      </HeroSection>
      <Wrapper>
        <SliceZoneUid allSlices={data.body} />
      </Wrapper>
      <VisitSection>
        <Image
          src={data.background_image.url}
          alt={data.background_image.alt}
          unsized
          layout="responsive"
        />
      </VisitSection>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { uid } = params;
  const { data } = await client.getByUID("brand_page", uid);
  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const { results } = await client.query(
    Prismic.Predicates.at("document.type", "brand_page")
  );

  const paths = results.map((post) => ({
    params: {
      uid: post.uid,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
