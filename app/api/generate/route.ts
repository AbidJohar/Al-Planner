import { NextRequest, NextResponse } from "next/server";
import {Client} from '@gradio/client';


export  const POST = async (req : NextRequest)=> {

         try {
         const {imageUrl, prompt} = await req.json();
         const imageRes = await fetch(imageUrl);
         const imageBlob = await imageRes.blob();

         const client = await Client.connect("abidhossein/ai_interior_planner")

        const result = await client.predict('/predict', {
            input_image : imageBlob,
            prompt
        });

       const data =   result.data as {
            url : string,
            path : string
         }[];
         const imageSrc = data?.[0]?.url;

         return NextResponse.json({
            success:true,
            image : imageSrc
         }, {status: 200}
        )
            
         } catch (error) {
            console.error("Generation Error:",error);
          return  NextResponse.json(
            {
             error : "faild to generate image!"
          },
          {status: 500}
        )
            
         }


}