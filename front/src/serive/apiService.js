import axios from 'axios';

export default async function apiService({ endPoint, method = 'GET', body = null }) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/${endPoint}`;

    const options = {
        method,
        url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) { 
        console.error({
          method: method,
          endPoint: endPoint,
          message: error.response?.data
        })
        return {
          error: true,
          message: error.response?.data
        }
    }
}
