import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { logOut } from "../../login/page";

export async function Delete(){
    logOut();
}
