
import { NavLink, useNavigate } from "react-router-dom";

const HomeNavbar = () =>{

   const navigate = useNavigate()
   const isLogin = JSON.parse(localStorage.getItem('token'))?.length ? true : false

   const handleClick = (e) =>{
    e.preventDefault();
        if(isLogin){
            localStorage.removeItem('token')
            navigate('/login') 
        }
        else{
            navigate('/login') 
        }
   }

    return(
        <div class="bg-gradient-to-r from-red-500 to-yellow-700 p-4"> 
    <div class="container mx-auto flex justify-between items-center">
        <div>
    {isLogin &&   <NavLink to='/home'>Home</NavLink> }
        </div>

        <div class="mr-9">
        <button onClick={handleClick}>{isLogin ? 'Logout' : 'Login'}</button>
        </div>
    </div>

        </div>
    )
}

export default HomeNavbar;