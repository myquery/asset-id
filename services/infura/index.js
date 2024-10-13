import {create} from "ipfs-http-client"

const projectKey = process.env.NEXT_PUBLIC_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_API_SECRET;


const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: 'Basic ' + Buffer.from(`${projectKey}:${projectSecret}`).toString('base64')
    }
})

export const uploadToIPFS = async (file)=> {
    try{
        const added = await client.add(file);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        return url

    }catch(err){
console.error('Error uplaoding file to IPFS', err)
return null
    }
}