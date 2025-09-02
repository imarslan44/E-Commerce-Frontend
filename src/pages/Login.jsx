import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
const [formData, setFormData] = useState({ name: "", 
   email: "", 
   password: "" 
  });
  const [currentState, setCurrentState] = useState("Sign Up");

  const navigate = useNavigate();


    const  handleInpts = (e)=>{
      const {name, value} = e.target;
      setFormData({...formData, [name]: value})
     

    }

  const handleSubmit = async(e)=>{
     e.preventDefault();
      if(currentState === 'Sign Up'){
        // handle sign up logic
        const {name, email, password} = formData;
        try{
         const res = await fetch("http://localhost:4400/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password}) 
        });
          
          const data = await res.json();
        console.log(data);
        console.log(res.status);
      if(res.status === 200){
        localStorage.setItem("token", data.token);
        setFormData({ name: "", email: "", password: "" });
        navigate("/");
        toast.success("Registration Successful");
        
        
      } else {
        

      }
    } catch(err){
        toast.error(err);
        console.log(err)
      }
  }
  else{
    try{
   
    const { email, password} = formData;
    const res =await fetch("http://localhost:4400/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password})
    
    })

    const data = await res.json();
    console.log(data);
    if(res.status === 200){
      localStorage.setItem("token", data.token);
      setFormData({ name: "", email: "", password: "" });
      navigate(-1);
      toast.success("Login Successful");
    }


    } catch(err){
toast.error(err);
    }
  }
  }
 return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center  w-[80%] sm:max-w-96 m-auto  gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mx-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>
         {currentState === 'Login' ? "" : <input name="name" value={formData.name} onChange={(e)=>handleInpts(e)}  type="text" className="w-full px-3 py-2 border border-gray-600" placeholder='Name' required/> }
         <input name="email"
         vlaue={formData.name}
         onChange={(e)=>handleInpts(e)}  
         type="email" className="w-full px-3 py-2 border border-gray-600" placeholder='Email' required/>
         <input name="password" type="password" 
         vlaue={ formData.password}
         onChange={(e)=>handleInpts(e)}  
         className="w-full px-3 py-2 border border-gray-600" placeholder='Password' required/>
         <div className="w-full flex justify-between text-sm mt-[-8px]">
             <p>Forgot your password?</p>
             {currentState === 'Login'? <p  onClick={()=>setCurrentState("Sign Up")}className="cursor-pointer">Create account</p> : <p onClick={()=>setCurrentState("Login")} className="cursor-pointer">Login</p>}
         </div>
         <button className="bg-black w-full py-3 text-sm text-white cursor-pointer">{currentState}</button>

    </form>
  )

}

export default Login