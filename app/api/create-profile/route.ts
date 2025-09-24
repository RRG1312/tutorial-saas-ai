import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function POST(){

    try{

        const clerkUser = await currentUser()
        if(!clerkUser){
            return NextResponse.json(
                {error: "User not found in Clerk"}, 
                {status: 404}
            )
        }

        const email = clerkUser?.emailAddresses[0].emailAddress;

        if(!email){
            return NextResponse.json(
                {error: "User does not have email address"}, 
                {status: 400}
            )
        }

        const existingProfile = await prisma.profile.findUnique(
            {where:{userId:clerkUser.id}
        })

        if(existingProfile){
            return NextResponse.json(
                {message: "Profile already exists"}
            )
        }

        await prisma.profile.create({
            data:{
                userId: clerkUser.id,
                email,
                subscriptionTier:null,
                stripeSubscriptionId:null,
                subscriptionActice:false
            }
        })

        return NextResponse.json(
            {message:"Profile created succesfully"}, 
            {status:201}
        )
    }catch{
        return NextResponse.json({error:"Internal error"}, {status:500})
    }
}