import { fetchDeveloperCommits, DeveloperCommits, DailyCommit } from './commitCount';
import { listDevelopers, Developer } from '../../developers/services/listDev';

interface TotalCommitData {
  date: string;
  totalCommits: number;
}

export async function fetchTotalCommits(year: number): Promise<TotalCommitData[]> {
  try {
    // Fetch all developers
    const developers: Developer[] = await listDevelopers();

    // Fetch commit data for each developer
    const commitPromises = developers.map(dev => 
      fetchDeveloperCommits(dev.id, new Date(year, 0, 1))
    );
    const allCommits: DeveloperCommits[] = await Promise.all(commitPromises);

    // Combine and process the data
    const combinedData: { [date: string]: number } = {};
    allCommits.forEach(developerCommit => {
      developerCommit.data.forEach(commit => {
        const date = new Date(commit.date);
        if (date.getFullYear() === year) {
          const dateString = date.toISOString().split('T')[0];
          combinedData[dateString] = (combinedData[dateString] || 0) + commit.commit_count;
        }
      });
    });

    // Convert to array and sort
    const sortedData: TotalCommitData[] = Object.entries(combinedData)
      .map(([date, totalCommits]) => ({ date, totalCommits }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return sortedData;
  } catch (error) {
    console.error("Error fetching total commit data:", error);
    throw error;
  }
}

export function filterCommitsByMonth(data: TotalCommitData[], month: number | 'all'): TotalCommitData[] {
  if (month === 'all') return data;
  return data.filter(item => {
    const date = new Date(item.date);
    return date.getMonth() === month - 1; // JavaScript months are 0-indexed
  });
}

export function aggregateCommitsByMonth(data: TotalCommitData[]): TotalCommitData[] {
  const monthlyData: { [month: string]: number } = {};
  data.forEach(item => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + item.totalCommits;
  });

  return Object.entries(monthlyData)
    .map(([date, totalCommits]) => ({ date: `${date}-01`, totalCommits }))
    .sort((a, b) => a.date.localeCompare(b.date));
}