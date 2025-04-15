// api.ts
import axios from 'axios';
import { ImageData } from '../types'

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://visualizing-convnets-latest.onrender.com';


export const api = {
    getImageList: async (): Promise<ImageData[]> => {
        return (await axios.get<ImageData[]>(`${API_BASE_URL}/images`, {
            headers: { 'Accept': 'application/json' }
        })).data;
        //   return [{ url: myImage, name: 'local-image-1' }, { url: myImage2, name: 'local-image-2' }];
    }
};