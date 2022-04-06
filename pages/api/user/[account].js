import { client } from '../../../lib/sanityClient'

export default async function handler(req,res){

    const {
        query: { account },
        method
    } = req;

    const query = `
        *[_type == "users" && _id == "${account}"]{
            userName,
            walletAddress,
            bio,
            email,
            siteUrl,
            twitterHandle,
            igHandle,
            profileImage
        }
        `
    const data = await client.fetch(query)

    res.json({ response:"hello" })

}