import "./App.css";
import axios from 'axios';
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
function App() {

  const [userInput, setUserInput] = useState("");
  const [shortenedLink, setShortenedLink] = useState("")

  const fetchData = async () => {
    try {
      const response = await axios(
        `https://smart-shorter-api.herokuapp.com/shortlinks`
      );
      // console.log(response[0].data);
      response.data.forEach(e => {
        console.log(e.slug)
        setShortenedLink(e.slug);
      });
      // setShortenedLink(response.data.slug);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" container h-screen flex justify-center items-center">
      <div className=" text-center">
        <h1 className=" text-2xl font-medium text-blue-500 mb-4">
          Smart<span className=" text-yellow-400">Shorter</span>
        </h1>
        <div>
          <input
            className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
            type="text"
            placeholder="Enter link to be shortened"
            value={userInput}
            onChange={(e) => { setUserInput(e.target.value) }}
          />
          <button className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md" onClick={() => {
            fetchData();
          }}>
            Submit URL
          </button>
        </div>

        <div className="mt-5">
          {shortenedLink}
          <CopyToClipboard text={shortenedLink}>
            <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
              Copy URL to Clipboard
            </button>
          </CopyToClipboard>
        </div>


      </div>
    </div>
  );
}
export default App;