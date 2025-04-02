import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    const { title, content } = req.body;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        console.error("User not authenticated for /api/post");
        return res.status(401).json({ error: "You must be logged in to create a post." });
    }

    try {
        const result = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: { connect: { email: session?.user?.email } },
            },
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Error creating post" });
    }
}
