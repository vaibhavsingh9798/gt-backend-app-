import { useState } from "react";
//import { NavLink, useNavigate } from "react-router-dom";

const Signup = () =>{
const [user,setUser] = useState({name:'',phone:'',email:'',password:'',profession:''})
const [error,setError] = useState('')
const URL = 'http://localhost:8002/api/v1/users'

//const navigate = useNavigate()
const handleChange = (e) =>{
    setError('')
    setUser({...user,[e.target.name]:e.target.value})
}

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if( (user.name.trim() && user.phone.trim().length == 10) && (user.email.trim() && user.password.trim().length >3 ) && user.profession.trim() ){
            try{
                console.log('send...',user)
             let response = await fetch(`${URL}/signup`,{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'Content-Type':'application/json'}
             })
        
                let data = await response.json()

             if(response.ok){
                alert(data.message)
              //  navigate('/login')
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">SingUp</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={user.phone}
            minLength={10}
            maxLength={10}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Profession
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="profession"
            type="text"
            placeholder="Profession"
            value={user.profession}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            minLength={4}
            maxLength={16}
            onChange={handleChange}
            required
            
          />
        </div>        
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500  hover:font-extrabold text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
             Sing up
          </button>
        </div>
        <div className='mt-4'>
        
      
        {/* <p  className='text-slate-400'>Have an account? <NavLink to='/login'> <button className="text-blue-500" >Log in </button></NavLink></p>  
        -- */}
        {error && <p className='text-red-500 mt-2'>{error}</p>} 
        </div>
      </form>
    </div>
    )
}

export default Signup;