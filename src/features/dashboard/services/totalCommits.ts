export interface DeveloperCommit {
  id: number;
  developer_id: number;
  committed_at: string;
  lines_added: number;
  lines_deleted: number;
}

export async function fetchDeveloperCommits(developerId: string, year: number): Promise<DeveloperCommit[]> {
  try {
    const response = await fetch(`http://localhost:4001/api/commits/developers/${developerId}?year=${year}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching developer commits:', error);
    throw error;
  }
}

export function processTotalCommits(commits: DeveloperCommit[], date: Date): number {
  return commits.filter(commit => {
    const commitDate = new Date(commit.committed_at);
    return commitDate.toDateString() === date.toDateString();
  }).length;
}