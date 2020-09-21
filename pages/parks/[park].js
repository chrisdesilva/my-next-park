import React from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

const Park = ({ park }) => {
  console.log(park);
  const parkData = park.data[0];

  return (
    <div>
      <Head>
        <title>My Next Park | {parkData.fullName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <nav className="border-b-2 border-green-700 fixed text-center z-10 container py-4 bg-white">
          <Link href="/">
            <a className="text-green-700 hover:text-green-900 transition-colors duration-300">
              My Next Park
            </a>
          </Link>
        </nav>
        <header
          className="bg-cover py-24 bg-center"
          style={{ backgroundImage: `url(${parkData.images[0].url})` }}
        >
          <div className="bg-white opacity-75 py-4">
            <h1 className="text-center text-blue-900">{parkData.fullName}</h1>
          </div>
        </header>
        <section className="py-8 bg-gray-100">
          <h2 className="h2">About The Park</h2>
          <div className="flex justify-between items-center max-w-screen-md mx-auto">
            <img className="w-64" src="/nature.svg" alt="Nature" />
            <p className="w-1/2">{parkData.description}</p>
          </div>
        </section>
        <section className="py-8">
          <h2 className="h2">Getting Here</h2>
          <div className="flex justify-between items-center max-w-screen-md mx-auto">
            <div className="w-1/2">
              <p className="mb-4">{parkData.directionsInfo}</p>
              <a className="text-blue-900" href={parkData.directionsUrl}>
                Directions
              </a>
            </div>
            <img
              className="w-64"
              src="/through_the_park.svg"
              alt="Through the park"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.PARKS_API_KEY}`
  );
  const parks = res.data;

  const paths = parks.data.map((park) => ({
    params: { park: park.parkCode },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=${params.park}&api_key=${process.env.PARKS_API_KEY}`
  );
  const park = res.data;

  return {
    props: {
      park,
    },
  };
};

export default Park;
