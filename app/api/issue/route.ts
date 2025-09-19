import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { PrismaClient } from "@/app/generated/prisma"; 

const createIssueSchema = z.object({ /* ตัวแปร createIssueSchema ใช้เหมือนเป็น schema ก่อนบันทึกลง DB */
    /* -------- ตัว body ---------*/
    title: z.string().min(1).max(255),
    description: z.string().min(1)
    /* -------------------------- */
});

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    const prisma = new PrismaClient(); /* ตัวเชื่อต่อ MySQL */

    if (!validation.success) 
        return NextResponse.json(
            { errors: validation.error.flatten().fieldErrors },{ status: 400 } ); /* Bad request */
    
    const newIssue = await prisma.issue.create({ /* ใช้ Prisma ORM สั่ง INSERT INTO Issue (title, description) ลง DB */
        data: { title: body.title, description: body.description }
    })
    return NextResponse.json(newIssue, { status: 201 }) /* status 201 --> created*/ 
        
}