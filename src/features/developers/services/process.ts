interface CommitData {
  date: string;
  developer_count: number;
}

export function processCommitData(data: CommitData[], selectedMonth: string) {
  console.log('Processing data:', data, selectedMonth);
  
  if (!Array.isArray(data) || data.length === 0) {
    console.log('Data is empty, null, or not an array');
    return [];
  }

  const filteredData = filterDataByMonth(data, selectedMonth);
  console.log('Filtered data:', filteredData);

  if (filteredData.length === 0) {
    console.log('Filtered data is empty');
    return [];
  }

  try {
    let groupedData;
    if (selectedMonth === 'all') {
      groupedData = groupDataByMonth(filteredData);
    } else {
      groupedData = groupDataByDay(filteredData);
    }
    console.log('Grouped data:', groupedData);

    const result = Object.entries(groupedData).map(([key, value]) => ({
      label: key,
      developer: value
    })).sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime());

    console.log('Processed data:', result);
    return result;
  } catch (error) {
    console.error('Error processing data:', error);
    return [];
  }
}

function filterDataByMonth(data: CommitData[], selectedMonth: string) {
  if (selectedMonth === 'all') {
    return data;
  }
  
  const monthNumber = parseInt(selectedMonth);
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === monthNumber;
  });
}

function groupDataByDay(data: CommitData[]) {
  return data.reduce((acc, item) => {
    const date = new Date(item.date);
    const key = date.toISOString().split('T')[0];
    acc[key] = (acc[key] || 0) + item.developer_count;
    return acc;
  }, {} as Record<string, number>);
}

function groupDataByMonth(data: CommitData[]) {
  return data.reduce((acc, item) => {
    const date = new Date(item.date);
    const key = date.toLocaleString('default', { month: 'short' });
    acc[key] = (acc[key] || 0) + item.developer_count;
    return acc;
  }, {} as Record<string, number>);
}