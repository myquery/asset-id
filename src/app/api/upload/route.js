import { create } from 'ipfs-http-client';
import { NextResponse } from 'next/server';

const projectId = process.env.NEXT_PUBLIC_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_API_SECRET;

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64'),
  },
});

export async function POST(req) {
    console.log('API Route is being hit', req); 
    console.log({projectId, projectSecret})
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return NextResponse.json({ error: 'Error uploading to IPFS' }, { status: 500 });
  }
}
