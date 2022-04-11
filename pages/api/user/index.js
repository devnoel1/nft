import prisma from '../../../lib/prisma';

export default async (req, res) => {
    if (req.method == "POST") {
        await prisma.user.upsert({
            where: {
                id: req.body.id,
            },
            update: {
                username: req.body.username,
                email: req.body.email,
                twitterHandle: req.body.twitterHandle,
                igHandle: req.body.igHandle,
                profile_pics: req.body.profile_pics,
                site_url: req.body.site_url,
                bio: req.body.bio,
            },
            create: {
                id: req.body.id,
                username: req.body.username,
                email: req.body.email,
                twitterHandle: req.body.twitterHandle,
                igHandle: req.body.igHandle,
                profile_pics: req.body.profile_pics,
                site_url: req.body.site_url,
                bio: req.body.bio,
            },
        });
        return res.status(200).json({ message: "user profile is updated successfuly" });
    } else if (req.method == "GET") {
        const data = await prisma.user.findMany()
        return res.status(200).json(data)
    }
};
