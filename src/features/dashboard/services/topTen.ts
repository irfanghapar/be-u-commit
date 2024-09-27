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

export function processLinesChangesData(
  data: DeveloperLinesChange[], 
  date: Date
): { added: string; deleted: string; rawAdded: number; rawDeleted: number } {
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === date.toDateString();
  });

  const result = filteredData.reduce((acc, item) => ({
    added: acc.added + item.lines_added,
    deleted: acc.deleted + item.lines_deleted
  }), { added: 0, deleted: 0 });

  return { 
    added: formatLargeNumber(result.added),
    deleted: formatLargeNumber(result.deleted),
    rawAdded: result.added,
    rawDeleted: result.deleted
  };
}

function formatLargeNumber(value: number): string {
  if (value >= 1e9) return '> 1 Billion';
  if (value === 0) return '0';
  return value.toString().replace(/^0+/, '');
}