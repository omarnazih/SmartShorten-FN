import React, { useState } from 'react'
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinkItem = (props) => {
  const URL = 'https://smart-shorter-api.herokuapp.com/'
  const [copyState, setCopyState] = useState(false)

  const isCopied = () => {
    toast("Copied!!")
    setCopyState(true)
  }

  return (
    <li key={props.key} className="px-4 py-2 bg-white hover:bg-sky-100 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
      <a className='text-blue-600 hover:underline' href={URL + props.linkItem} target="_blank">{URL + props.linkItem}</a>
      <CopyToClipboard text={URL + props.linkItem} onCopy={() => isCopied()}>
        <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
          {copyState ? 'Copied' : 'Copy to Clipboard'}
        </button>
      </CopyToClipboard>
    </li>
  )
}

export default LinkItem