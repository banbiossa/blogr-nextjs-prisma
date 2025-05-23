import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
    const postId = req.query.id;
    const post = await prisma.post.update({
        where: { id: postId },
        data: { published: true },
    });
    res.status(200).json(post);
}
