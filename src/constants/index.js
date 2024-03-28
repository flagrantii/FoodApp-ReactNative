export const getCategoryData = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if(!response.ok) {
            throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category data:', error);
        return [];
    }
};
