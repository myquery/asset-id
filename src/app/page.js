"use client"; 

import { useState } from 'react';
import { uploadToIPFS } from '../../services/infura';

export default function Home() {
  const [realEstateDetails, setRealEstateDetails] = useState({
    propertyTitle: '',
    propertyLocation: '',
    valuation: '',
    deed: null,
  });

  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'deed') {
      setRealEstateDetails({ ...realEstateDetails, deed: files[0] });
    } else {
      setRealEstateDetails({ ...realEstateDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    try {
      // Upload deed to IPFS
      const deedUrl = await uploadToIPFS(realEstateDetails.deed);
      
      if (deedUrl) {
        setUploadStatus(`Deed uploaded successfully: ${deedUrl}`);
        console.log('Deed uploaded to IPFS:', deedUrl);
      } else {
        setUploadStatus('Failed to upload deed');
      }
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      setUploadStatus('Error during upload');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{
      backgroundImage: 'url(/images/real.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Adjust the height as needed
  }}>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-xl font-bold mb-6">Upload Real Estate Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Property Title</label>
            <input
              type="text"
              name="propertyTitle"
              value={realEstateDetails.propertyTitle}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Property Location</label>
            <input
              type="text"
              name="propertyLocation"
              value={realEstateDetails.propertyLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Property Valuation (₦)</label>
            <input
              type="number"
              name="valuation"
              value={realEstateDetails.valuation}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Deed Document</label>
            <input
              type="file"
              name="deed"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save / Mint 
          </button>
        </form>

        {uploadStatus && (
          <div className="mt-4 text-center text-sm text-gray-600">{uploadStatus}</div>
        )}
      </div>
    </div>
  );
}