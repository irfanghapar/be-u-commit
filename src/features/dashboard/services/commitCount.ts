export interface DailyCommit {
  date: string;
  commit_count: number;
}

export interface DeveloperCommits {
  data: DailyCommit[];
}

export async function fetchDeveloperCommits(developerId: string, date: Date): Promise<DeveloperCommits> {
  try {
    const year = date.getFullYear();
    const response = await fetch(`http://localhost:4001/api/developers/${developerId}/daily_commits/${year}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched commit data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching developer commits:', error);
    throw error;
  }
}

export function processTotalCommits(data: DeveloperCommits, date: Date): number {
  // Use the provided date directly, adjusting for local timezone
  const targetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const targetDateString = targetDate.toISOString().split('T')[0];
  console.log('Processing commits for date:', targetDateString);
  console.log('Received data:', JSON.stringify(data, null, 2));

  const targetCommit = data.data.find(commit => {
    const commitDate = new Date(commit.date);
    const commitDateString = commitDate.toISOString().split('T')[0];
    console.log(`Comparing: ${commitDateString} with ${targetDateString}`);
    return commitDateString === targetDateString;
  });

  const totalCommits = targetCommit ? targetCommit.commit_count : 0;

  console.log('Target commit:', targetCommit);
  console.log('Total commits:', totalCommits);
  return totalCommits;
}