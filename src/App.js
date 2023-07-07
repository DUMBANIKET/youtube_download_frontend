import React from "react";
import { useState } from "react";
import './style.css'


function App() {
   const [loading,setLoading]=useState('')
   const [count,setCount]=useState(0)
  const [post,setPosts]=useState([])
  const [vidurl,setVidurl]=useState('')
  const [status,setStatus]=useState('nothing here search to get the url')
const [err,setErr]=useState('')
  const url="https://youtu.be/-wOkkbufYIA"
  const api_url="https://youtube-api-0own.onrender.com/video"
const subm=async(e)=>{
   setStatus('')
  e.preventDefault();
  setLoading("Loading please wait")
      fetch(api_url, {
         method: 'POST',
         body: JSON.stringify({
            url:vidurl
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) => res.json())
         .then((post) => {
            // setPosts((posts) => [post, ...posts]);
            setPosts(post)
            setLoading('')
            
         })
         .catch((err) => {
            setErr(err.message)
            console.log(err.message);
            setLoading('')
         });

}
// console.log(post)
  return (
    <>
  
   <div className="Formbox">
   <h1>You Vid</h1>
   <form onSubmit={subm}>

<center>
<input type="text" required value={vidurl}  onChange={(e)=>{setVidurl(e.target.value)}}></input>
    <br></br>
    <button type="submit">Submit</button>
</center>
   </form>
   <br></br>
   {/* {post.map((po)=>{
      // console.log(po.qualityLabel)
      <><div>
         {po.url}
      </div></>
   })} */}
   <hr></hr>
   {<h1>{err}</h1>}
   {post.map(po=>
      
      <><div><h2>{po.qualityLabel}</h2><a href={po.url}><button>Download</button></a><p>{po.mimeType}</p></div><br></br><hr></hr>
      
      </>
   ) }

   {<h2>{status}</h2>}
   {<h2>{loading}</h2>}
</div>
    </>
  );
}

export default App;