import Link from "next/link";
import React from "react";
  
 

const UserNotFound = ( ) => {
 

  return (
    <div className="flex flex-col justify-center items-center   w-full text-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Sad emoji */}
        <div className="text-4xl font-semibold">4😞4</div>

        {/* Message */}
        <h1 className="text-xl font-semibold text-gray-700">
          Oops! User Not Found
        </h1>
        

        {/* Button */}
         <Link href="/" className="text-electric">return</Link>
      </div>
    </div>
  );
};

export default UserNotFound;
