import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Price-Shop</title>
        <meta
          name="description"
          content="Price-Shop, e-commerce app by José Núñez Riveros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Price Shop</main>
    </div>
  );
};

export default Home;
