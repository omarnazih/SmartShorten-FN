import React, { useState } from 'react'
import axios from 'axios';
import { isIOS, isAndroid, isDesktop } from 'react-device-detect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinkBar = (props) => {

  const { setLinkItems, linkItems } = props;
  const [linkInput, setLinkInput] = useState("");
  const [slugInput, setSlugInput] = useState("");

  const isAlphanumeric = (slug) => {
    const regex = /^[0-9a-zA-Z]+$/;
    if (slug.match(regex)) {
      return true;
    }
    toast("Slug is not valid!")
    return false
  }

  const isValidLink = (link) => {
    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    if (link.match(regex)) {
      return true
    }
    toast("Link is not valid!")
    return false
  };

  const getShortUrl = async (props) => {

    let newSlug;
    if (slugInput != '') {
      if (isAlphanumeric(slugInput)) {
        newSlug = slugInput
      } else {
        return
      }
    }

    if (!isValidLink(linkInput)) {
      return
    }

    try {
      const response = await axios({
        method: 'post',
        url: `https://smart-shorter-api.herokuapp.com/shortlinks`,
        data: {
          "slug": newSlug ? newSlug : '',
          "web": linkInput
        }
      }
      );

      setLinkItems([response.data, ...linkItems])
    } catch (error) {
      toast("There Was error while sending url to server")
      console.log(error);
    }
  };

  return (
    <div>
      <input
        className="outline-none border-2 w-96 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3 mx-2 my-2"
        type="text"
        placeholder="Enter link to be shortened"
        value={linkInput}
        onChange={(e) => { setLinkInput(e.target.value) }}
      />
      <input
        className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3 ml-3"
        type="text"
        placeholder="Enter Slug"
        value={slugInput}
        onChange={(e) => { setSlugInput(e.target.value); }}
      />
      <button className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md" onClick={() => {
        getShortUrl();
      }}>
        Submit URL
      </button>
    </div>
  )
}

export default LinkBar