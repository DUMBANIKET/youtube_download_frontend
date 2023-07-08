import React from "react";
import { useState } from "react";
import './style.css'


function App() {
   const [loading,setLoading]=useState('')
   const [state,setState]=useState(false)
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
    const result=  fetch(api_url, {
         method: 'POST',
         body: JSON.stringify({
            url:vidurl
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) => 
            res.json())
         .then((post) => {
            if(post.status===500){
               setState(true)
            }
            // setPosts((posts) => [post, ...posts]);
            setPosts(post)
            setLoading('')
  
            
         })
         .catch((err) => {
            setErr(err.message)
       
            setLoading('')
            setState(true)
         });

        
      }
// console.log(post)
  return (
    <>
  
   <div className="Formbox">
<center>   <h1>You Vid</h1></center>
   <br></br>
   <form onSubmit={subm}>

<center>
<input type="text" id="input" name="input" required value={vidurl}  onChange={(e)=>{setVidurl(e.target.value)}}></input>
    <br></br>
    <button id="submit" name="submit" type="submit">Submit</button>
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


{
   state && <h1>{status}</h1>

}
 


   {/* {<h1>{err}</h1>} */}
   {post.map(po=>
      
      <><div>
         {po.status===500 && <><h2>{po.qualityLabel}</h2></>}{po.status!==500 && <><h2>{po.qualityLabel}</h2><a href={po.url}> <button>Download</button></a></>}
       <p>{po.mimeType}</p><br></br>{po.status===500 &&<p>Cannot load the preview</p>}{po.status!==500 &&<iframe src={po.url} title="video"></iframe>}</div><br></br><hr></hr>
      
      </>
   ) }

   {/* {<h2>{status}</h2>} */}
   {<h2>{loading}</h2>}

   
</div>
    </>
  );
}

export default App;