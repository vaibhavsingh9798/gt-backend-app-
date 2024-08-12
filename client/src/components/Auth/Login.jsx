import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const Login = () =>{
const [user,setUser] = useState({email:'',password:''})
const [error,setError] = useState('')
const URL = 'http://localhost:8002/api/v1/users'
const navigate = useNavigate()

const handleChange = (e) =>{
    setError('')
    setUser({...user,[e.target.name]:e.target.value})
}

const handleSubmit = async (e) =>{
    e.preventDefault();
    setError('');
    if( (user.email.trim() && user.password.trim()) && (user.password.replace(/\s/g, "").length >= 4) ){
        try{
         let response = await fetch(`${URL}/login`,{
            method: 'POST',
            body: JSON.stringify({email:user.email,password:user.password}),
            headers: {'Content-Type':'application/json'}
         })
    
            let data = await response.json()
          console.log('resp...',response)
          console.log('data...',data)
         if(response.ok){
          let token = JSON.stringify(data.token)
            localStorage.setItem('token',token)
            alert(data.message)
            navigate('/home')
         }else
         throw new Error(data.message)
        }catch(err){
          setError(err.message)
        }
    }
    else{
        setError('Invalid Details')
    }
}

    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-400 to-pink-400 ">
      <form className="bg-zinc-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            
          />
        </div>
       
        
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r from-red-400 to-pink-400  hover:font-extrabold text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
             Login
          </button>
        </div>
        <div className='mt-4'>
        
        <p  className='text-slate-400'>Don't have an account? <NavLink to='/signup'><button className="text-blue-500" >Sign up</button></NavLink></p>  
        {error && <p className='text-red-500 mt-2'>{error}</p>} 
        </div>
      </form>
    </div>
    )
}

export default Login;