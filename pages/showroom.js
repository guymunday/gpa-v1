import { useState } from "react";
import { showroomClient } from "@utils/prismicPosts";
import Prismic from "prismic-javascript";
import PasswordProtect from "@components/Showroom/PasswordProtect";
import ProductGrid from "@components/Showroom/ProductGrid";
import Filter from "@components/Showroom/Filter";
import Wrapper from "@components/Wrapper";
import styled from "styled-components";
import Head from "next/head";

const ShowroomStyles = styled.section`
  display: flex;
  margin-top: 150px;
  position: relative;
  /* height: 100%; */
  min-height: 600px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    /* max-height: none; */
  }
`;

export default function Showroom({ products, brands, password, orderForms }) {
  const [brand, setBrand] = useState();
  return (
    <>
      <Head>
        <title>Showroom | Good People Agency</title>
      </Head>
      <PasswordProtect showroomPassword={password.data.password}>
        <Wrapper>
          <ShowroomStyles>
            <Filter
              brands={brands.results}
              setBrand={setBrand}
              orderForms={orderForms.results}
            />
            <ProductGrid products={products.results} brand={brand} />
          </ShowroomStyles>
        </Wrapper>
      </PasswordProtect>
    </>
  );
}

export async function getStaticProps() {
  const products = await showroomClient.query(
    Prismic.Predicates.at("document.type", "product"),
    { pageSize: 100 }
  );
  const brands = await showroomClient.query(
    Prismic.Predicates.at("document.type", "brand"),
    { pageSize: 100, orderings: "[my.brand.uid]" }
  );

  const orderForms = await showroomClient.query(
    Prismic.Predicates.at("document.type", "order_form"),
    { pageSize: 100 }
  );

  const password = await showroomClient.getSingle("password");
  // const orderForms = await showroomClient.getSingle("order_form");

  return {
    props: {
      products,
      brands,
      password,
      orderForms,
    },
  };
}
