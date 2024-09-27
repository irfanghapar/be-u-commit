export interface DeveloperLinesChange {
  date: string;
  lines_added: number;
  lines_deleted: number;
}

export async function fetchDeveloperLinesChanges(developerId: string, year: number): Promise<DeveloperLinesChange[]> {
  try {
    const response = await fetch(`http://localhost:4001/api/developers/${developerId}/lines_changes/${year}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching developer lines changes:', error);
    throw error;
  }
}