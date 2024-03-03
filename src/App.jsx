import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const [length,setlength] = useState(8);
  const [numberallowed,setnumbers]= useState(false);
  const [charcterallowed,setcharcter]= useState(false);
  const [copied,setcopied]=useState(false);
  const[password,setpassword]=useState("");
  const passwordref=useRef(null);
  const generatePassword =useCallback(()=>{
       let pass="";
       let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
       if(numberallowed)
       str+="0123456789";
      if(charcterallowed)
      str+="!@#$%^&*(){}+-=";
      for(let i=1;i<=length;i++){
        pass+=str[Math.floor(Math.random()*str.length)]
      }
      setpassword(pass);
  },[length,numberallowed,charcterallowed]);
  useEffect(()=>{
  generatePassword()
  },[length,numberallowed,charcterallowed]);
  return (
    <div className="App-container">
    <h2>Password Generator</h2>
     {copied?
      <p className='copycon'>Copied to clipboard</p>
     :null
    }
    <div className='passwordbox'>
      <input type="text" value={password} ref={passwordref}readOnly></input>
      <button className=' my-btn btn btn-primary ' onClick={()=>{
        passwordref.current?.select();
       window.navigator.clipboard.writeText(password);
       const mypromise= new Promise((res,rej)=>{
        setcopied(true);
        setTimeout(()=>{
          res(true);
        },2000);
       })
       mypromise.then(()=>{
        setcopied(false);
       })

      }}>Copy</button>
    </div>
    <div className="passparam">
      <div>
      <input type='range' min={6} max={100}
      onChange={(e)=>setlength(e.target.value)}></input>
  
      <label>Length:{length}</label>
      </div>
      <div>
      <input type="checkbox"  defaultChecked={numberallowed} onChange={()=>setnumbers((prev)=>!prev)}></input>

      <label >Numbers</label>
      </div>
      <div>
      <input type='checkbox' defaultChecked={charcterallowed} onChange={()=>setcharcter((prev)=>!prev)}></input>
      <label>Charcters</label>
      </div>
    </div>
    </div>
  )
}

export default App
