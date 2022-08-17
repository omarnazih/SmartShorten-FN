import axios from 'axios';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LinkBar from './components/LinkBar';
import LinkItem from './components/LinkItem'

function App() {

  const [linkItem, setLinkItem] = useState("")

  const fetchAllData = async () => {
    try {
      const response = await axios(
        {
          method: 'GET',
          url: 'https://smart-shorter-api.herokuapp.com/shortlinks'
        }
      )

      response.data.map((elm) => {
        setLinkItem(elm.slug)
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <div className="container h-screen flex justify-center items-center mx-auto text-center">
      <ToastContainer />
      <div className="text-center">
        <Header />
        <LinkBar setLinkItem={setLinkItem} />
        <div className="mt-5">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {linkItem === "" ? <p>No Links Found in the Database</p> :
                <LinkItem linkItem={linkItem} />
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;