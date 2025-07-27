
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest,NextResponse } from "next/server";


export const PATCH = async (
    req : NextRequest,
    {params} : {params : {id: string}}
)=>{

    
      try {
       const {id} = params;
       const {userId} = await auth();

       if(!userId){
        return NextResponse.json({error : "unauthorized"}, {status: 401})
       }
       if(!id){
        return NextResponse.json({error : "Design not found"}, {status: 404})
       }

       const existingDesign = await db.generateRoom.findUnique({
        where : {id}
       });

        if(!existingDesign){
        return NextResponse.json({error : "Design not found"}, {status: 404})
       }


   const isAlreadyFavorite = existingDesign.favourites.includes(userId);

   const updateFavorite = isAlreadyFavorite ? existingDesign.favourites.filter((id)=> id !== userId) : [...existingDesign.favourites, userId];

   const updatedRoom = await db.generateRoom.update({
    where : {id},
    data : {favourites : updateFavorite}
   })
    return NextResponse.json({
        success: true,
        isFavorite : !isAlreadyFavorite,
        favourites :  updatedRoom.favourites
    })
        
      } catch (error) {
        console.log("Error while updating favirote:",error);
         return NextResponse.json({
            error : "faild to update the favirote"
         }, {status: 500})
      }


}