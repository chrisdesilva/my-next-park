import axios from "axios";
import Head from "next/head";

export default function Home({ park }) {
  const acadia = park.data[0];

  return (
    <div>
      <Head>
        <title>My Next Park</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-red-700">My Next Park</h1>
          <h2>{acadia.fullName}</h2>
        </header>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${process.env.PARKS_API_KEY}`
  );
  const park = res.data;

  return {
    props: {
      park,
    },
  };
};
