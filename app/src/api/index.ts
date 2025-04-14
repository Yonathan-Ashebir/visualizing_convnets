// api.ts

import myImage from '../images/validation-dog grass-ILSVRC2012_val_00000003.jpeg'
import myImage2 from '../images/validation-dog blurred-ILSVRC2012_val_00000028.jpeg'

// Configuration
// const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual API endpoint
const API_BASE_URL = '.'; // Replace with your actual API endpoint

/**
 * Fetches the list of available images
 * @returns Promise<ImageData[]> - Array of image information objects
 */
async function getImageList(): Promise<ImageData[]> {
    const response = await fetch(`${API_BASE_URL}/images`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include' // If you need to send cookies
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch image list: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Fetches a specific image by filename
 * @param filename - The name of the image file to fetch
 * @returns Promise<Blob> - The image file as a Blob
 */
async function getImage(filename: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/image/${encodeURIComponent(filename)}`, {
        method: 'GET',
        credentials: 'include' // If you need to send cookies
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch image ${filename}: ${response.statusText}`);
    }

    return await response.blob();
}

/**
 * Constructs a direct URL to an image (useful for <img> tags)
 * @param filename - The name of the image file
 * @returns string - The direct URL to the image
 */
function getImageUrl(filename: string): string {
    return `${API_BASE_URL}/image/${encodeURIComponent(filename)}`;
}

/**
 * Helper function to handle CORS errors
 */
function handleCorsError(error: unknown): never {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Cross-origin request blocked. Please check CORS configuration on the server.');
    }
    throw error;
}

// // Add error handling wrapper
// export const api = {
//     getImageList: async () => {
//         try {
//             return await getImageList();
//         } catch (error) {
//             handleCorsError(error);
//         }
//     },
//     getImage: async (filename: string) => {
//         try {
//             return await getImage(filename);
//         } catch (error) {
//             handleCorsError(error);
//         }
//     },
//     getImageUrl
// };


export const api = {
    getImageList: async () => {
        return [{ url: myImage, name: myImage }, { url: myImage2, name: myImage2 }]
    },
    getImage: async (filename: string) => {
        try {
            return await getImage(filename);
        } catch (error) {
            handleCorsError(error);
        }
    },
    getImageUrl
}