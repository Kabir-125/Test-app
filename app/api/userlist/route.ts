import prisma from '../../../lib/prisma'

export async function GET ( Request: Request ) {
    var users;
    try {
        users = await prisma.user.findMany({
            select: {
                email: true
            }
        }); 
      } catch (error) {
        return new Response('Error fetching user list', { status: 500 });
      }
    return Response.json(users);
  }