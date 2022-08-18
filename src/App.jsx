import axios from 'axios';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LinkBar from './components/LinkBar';
import LinkItem from './components/LinkItem'

function App() {

  const [linkItems, setLinkItems] = useState([{}])

  const fetchAllData = async () => {
    try {
      await axios(
        {
          method: 'GET',
          url: 'https://smart-shorter-api.herokuapp.com/shortlinks'
        }
      ).then((response) => {
        let newlist = []
        response.data.forEach((elm) => {
          newlist.push(elm)
        })
        setLinkItems([...linkItems, ...newlist])
      }
      )
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <div className="container  flex justify-center items-center mx-auto text-center">
      <ToastContainer />
      <div className="text-center">
        <Header />
        <LinkBar setLinkItems={setLinkItems} linkItems={linkItems} />
        <div className="mt-5">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {linkItems.map(link => {
                if (link.slug) {
                  return (
                    <LinkItem key={uuidv4()} linkItem={link.slug} />
                  )
                };
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;