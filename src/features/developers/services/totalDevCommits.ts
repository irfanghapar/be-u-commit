export async function fetchTotalDeveloperCommits(year: number) {
  try {
    const response = await fetch(`http://localhost:4001/api/commits/developer_count/${year}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response:', data);
    return data.data; // Return the nested data array
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}