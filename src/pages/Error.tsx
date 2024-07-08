import { Link } from "react-router-dom";

const Error : React.FC =()=>{
    return(
        <>
        <div className="flex flex-col">
    <div className="text-9xl flex justify-center mt-80 my-auto font-mono font-bold text-sky-400">
        404
    </div>
    <div className="text-2xl flex justify-center mt-2 font-mono font-bold text-white">
        Page not found
    </div>
    <div className="flex justify-center mt-6">
    <Link to="/"> 
    <button className="rounded-full bg-sky-400 hover:bg-sky-700 hover:text-white w-40 h-10 text-gray-700 text-md">
      Go Home
        
    </button>
    </Link>
    </div>
    </div>
        </>
    )
}

export default Error;