
import { create } from 'ipfs-http-client';

const projectKey = process.env.NEXT_PUBLIC_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_API_SECRET;

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from(`${projectKey}:${projectSecret}`).toString('base64'),
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { file } = req.body;

        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return res.status(200).json({ url });
        } catch (err) {
            console.error('Error uploading file to IPFS:', err);
            return res.status(500).json({ error: 'Failed to upload file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
