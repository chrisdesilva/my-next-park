import axios from "axios";

export default function handler(req, res) {
  const {
    query: { park },
  } = req;

  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=${process.env.PARKS_API_KEY}`
  );
  const parkData = res.data;

  res.json(`Post: ${parkData}`);
}
