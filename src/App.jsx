import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const [userData, setuserdata] = useState([])
  const [index, setindex] = useState(1)

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=18`)
    setuserdata(response.data);
  }

  useEffect(() => {
    getData();
  }, [index]);

  let printuserdata = (
    <h3 className='text-gray-400 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>
      Loading...
    </h3>
  );

  if (userData.length > 0) {
    printuserdata = userData.map((elem, idx) => {
      return (
        <div key={idx} className="w-44">
          <a href={elem.url} target='_blank'>
            <div className='h-40 w-full bg-white rounded-xl overflow-hidden'>
              <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
            </div>
            <h2 className='font-bold text-sm mt-1'>{elem.author}</h2>
          </a>
        </div>
      )
    })
  }

  return (
    <div className='bg-black min-h-screen text-white p-4'>
      
      {/* Image Grid */}
      <div className='flex flex-wrap gap-4 p-2'>
        {printuserdata}
      </div>

      {/* Buttons Section */}
      <div className='flex justify-center items-center p-4'>
        
        <button
          className="
            bg-amber-400 text-black px-4 py-2 font-semibold rounded m-2 text-sm cursor-pointer 
            active:scale-95 active:bg-amber-300 transition-all duration-150
          "
          onClick={() => {
            if (index > 1) 
              setuserdata([])
              setindex(index - 1)
          }}
        >
          Prev
        </button>

        <button
          className="
            bg-amber-400 text-black px-4 py-2 font-semibold rounded m-2 text-sm cursor-pointer 
            active:scale-95 active:bg-amber-300 transition-all duration-150
          "
          onClick={() =>{
            setuserdata([])
            setindex(index + 1)}
            
          } 
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default App
