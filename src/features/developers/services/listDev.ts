export interface Developer {
  id: string;
  email: string;
}

export async function listDevelopers(): Promise<Developer[]> {
  try {
    const response = await fetch('http://localhost:4001/api/developers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching developers list:', error);
    throw error;
  }
}