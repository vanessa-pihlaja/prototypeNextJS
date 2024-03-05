import axios from 'axios';

// Use the environment variable, default to '/api/recipes' if not set.
// This allows flexibility and fallback in case the environment variable is missing.
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes` : '/api/recipes';

const getAll = async() => {
    console.log(baseUrl);
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    const request = await axios.get(baseUrl);
    return request.data;
};

export default { getAll };
