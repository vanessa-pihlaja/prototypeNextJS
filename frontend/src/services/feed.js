import axios from 'axios';

// Use the environment variable, default to '/api/recipes' if not set.
// This allows flexibility and fallback in case the environment variable is missing.
const baseUrl = 'api/recipes';

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

const feedService = { getAll };
export default feedService;
