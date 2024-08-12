import React, { useEffect, useState } from 'react';

function Home() {
    const [users,setUsers] = useState([])
    const [updateUser,setUpdateUser] = useState({name:'',phone:'',id:''})
    const [isUpdate,setIsUpdate] = useState(false)
    const URL = 'http://localhost:8002/api/v1/users'
    const token = JSON.parse( localStorage.getItem('token'))
    const fetchUser = async ()=>{
        console.log('home token..',token)
        let response = await fetch(URL,{
            method: 'GET', 
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
         })

        let data = await response.json() 
        setUsers(data.data)
    }

    const onUpdate = (user) =>{
        setIsUpdate(true)
        setUpdateUser({name:user.name,phone:user.phone,id:user._id})
    }

    const handleDelete = async (user) =>{
        let response = await fetch(`${URL}/${user._id}`,{
            method : 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }) 
        if(response.ok)
            alert('deleted')
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        let response = await fetch(`${URL}/${updateUser.id}`,{
            method : 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(updateUser)
        })

        if(response.ok){
            alert('updated')
            setIsUpdate(false)
        }
    }

    const handleChange = (e) =>{
          setUpdateUser({...updateUser,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        fetchUser()
    })

    const printUser = () =>{
        return (
        <div className="p-4 ">
      <ul className="space-y-4 mt-4">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md max-w-4xl w-full">
            <span className="text-sm mr-1">{user.name}</span>
            <span className="text-sm mr-1">{user.phone}</span>
            <span className="text-sm mr-1">{user.email}</span>
            <span className="text-sm mr-1">{user.profession}</span>
            <div className="space-x-2">
              <button
                onClick={() => onUpdate(user)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
        )
    }

    const updateUserForm = () =>{
        return(
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-400 to-pink-400 ">
            <form className="bg-zinc-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update User</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={updateUser.name}
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
                  value={updateUser.phone}
                  minLength={10}
                  maxLength={10}
                  onChange={handleChange}
                  required
                />
                    <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r mt-2 from-red-500 to-pink-500  hover:font-extrabold text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
              </div>
              </form>
              </div>
        )
    }

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-red-300 to-pink-400 min-h-screen">
      <header className="text-4xl font-bold mb-8">Users</header>
      <main className="text-lg text-center max-w-xl">
        {printUser()}
        {isUpdate && updateUserForm()}
      </main>
     
    </div>
  );
}

export default Home;
