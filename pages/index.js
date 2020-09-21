import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

export default function Home({ parks }) {
  console.log(parks);
  const [parkIndex, setParkIndex] = useState(1);
  const [selected, setSelected] = useState({
    image: parks.data[parkIndex].images[0].url,
    code: parks.data[parkIndex].parkCode,
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleChangePark = (e) => {
    setParkIndex(e.target.value);
  };

  useEffect(() => {
    setSelected({
      image: parks.data[parkIndex].images[0].url,
      code: parks.data[parkIndex].parkCode,
    });
  }, [parkIndex]);

  useEffect(() => {
    if (parks.data) {
      setIsLoading(false);
    }
  }, [parks]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Head>
        <title>My Next Park</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <nav className="border-b-2 border-green-700 fixed text-center w-full py-4 bg-white">
          <Link href="/">
            <a className="text-green-700 hover:text-green-900 transition-colors duration-300">
              My Next Park
            </a>
          </Link>
        </nav>
        <header className="flex flex-col items-center justify-center container py-24 h-screen">
          <h1 className="mt-32 mb-12">Find Your Next Adventure</h1>
          <div className="w-full flex">
            <div className="flex flex-col items-center w-1/2">
              <div className="border-2 border-gray p-8 shadow">
                <div className="h-64 w-64 overflow-y-hidden">
                  <img
                    className="rounded"
                    src={selected.image}
                    alt={selected.title}
                  />
                </div>
                <label>Choose a park</label>
                <select
                  onChange={handleChangePark}
                  className="block w-64 mx-auto bg-white border-2 border-gray-700 text-gray-700 py-3 px-4 focus:border-gray-500"
                >
                  {parks.data.map((park, idx) => {
                    if (park.designation === "National Park") {
                      return (
                        <option key={park.id} value={idx}>
                          {park.fullName}
                        </option>
                      );
                    }
                  })}
                </select>
                <Link href={`/parks/${selected.code}`}>
                  <a className="w-24 block mx-auto mt-4 border-2 py-2 border-green-700 bg-green-700 hover:bg-white text-white hover:text-green-700 transition-colors duration-100 text-center">
                    Let's Go!
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <img className="w-full" src="/navigator.svg" />
            </div>
          </div>
        </header>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.PARKS_API_KEY}`
  );
  const parks = res.data;

  return {
    props: {
      parks,
    },
  };
};
