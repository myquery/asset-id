import fetch from 'node-fetch';
import {create} from "ipfs-http-client"

const projectKey = process.env.NEXT_PUBLIC_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_API_SECRET;


const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: 'Basic ' + Buffer.from(`${projectKey}:${projectSecret}`).toString('base64')
    },
    fetch: fetch
})


// Function to upload file and additional metadata to IPFS
export const uploadToIPFS = async (file, additionalData) => {
    console.log({ additionalData }); // Log the additional data for debugging

    if (!file) {
        console.error('No file provided for upload');
        return null;
    }

    try {
     
        const addedFile = await client.add(file);
        const fileUrl = `https://ipfs.infura.io/ipfs/${addedFile.path}`; 

  
        const combinedData = {
            deed: fileUrl,
            ...additionalData 
        };

     
        const addedCombinedData = await client.add(JSON.stringify(combinedData));
        const combinedDataUrl = `https://ipfs.infura.io/ipfs/${addedCombinedData.path}`; 

    
        return { combinedDataUrl };
    } catch (err) {
        console.error('Error uploading to IPFS', err); // Log any errors encountered
        return null;
    }
};