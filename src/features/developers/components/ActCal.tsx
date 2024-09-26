"use client"

import React from 'react';
import ActivityCalendar from 'react-activity-calendar';

interface ActCalProps {
  data: {
    date: string;
    count: number;
    level: number;
  }[];
  theme?: {
    light: string[];
    dark?: string[];
  };
  style?: React.CSSProperties;
}

const ActCal: React.FC<ActCalProps> = ({
  data,
  theme = {
    light: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
    dark: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
  },
  style = {},
}) => {
  return (
    <div className='ml-10 mb-8 pt-2 pb-4'>
    <div style={{ ...style }}>
        <ActivityCalendar
          data={data}
          theme={theme}
          showWeekdayLabels={true}
          weekStart={1}
          blockMargin={10}
          blockRadius={3}
          blockSize={15}
        />
      </div>
    </div>
  );
};

export default ActCal;
