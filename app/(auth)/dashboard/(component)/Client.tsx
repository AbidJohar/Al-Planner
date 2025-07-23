"use client"

import CustomSelect from "@/components/CustomSelect";
import { roomStyles,aiStyle } from "@/lib/helper";
import { useState } from "react";

interface clientProps {
    user : {
        id: string,
        fullName : string | null,
        email: string,
        imageUrl : string
    }
}

const Client = ({user} : clientProps) => {
   
 const [room, setRoom] =   useState <string | null>(null);
 const [aistyle, setAistyle] =   useState <string | null>(null);


 const handleRoomChange = (value : string)=> {

    setRoom(value);
 }
 const handleAistyle = (value : string)=> {

    setAistyle(value);
 }

  return (
    <div className="my-10 w-full p-4 rounded-md border border-input">
       <div className=" w-full grid grid-cols-1 min-md:grid-cols-3 gap-3">
            <div className="w-full space-y-4 col-span-1 p-10 border border-input rounded-md">
                 <CustomSelect
                  placeholder="Select your interior"
                  option={roomStyles}
                  onChange={handleRoomChange}
                  value={room}
                  className=""
                 
                 />
                 <CustomSelect
                  placeholder="Select AI style interior"
                  option={aiStyle}
                  onChange={handleAistyle}
                  value={aistyle}
                  className=""
                 
                 />
            </div>
            <div className="w-full space-y-4 col-span-2 p-10 border border-input rounded-md">
                
            </div>

       </div>
    </div>
  )
}

export default Client
