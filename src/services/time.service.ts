import { AppError } from '../utils/AppError';

interface WorldTimeResponse {
  datetime: string;
  timezone: string;
  utc_datetime: string;
  utc_offset: string;
  day_of_week: number;
  day_of_year: number;
  week_number: number;
}

export async function getCurrentTime(timezone?: string) {
  try {
    const url = timezone 
      ? `http://worldtimeapi.org/api/timezone/${timezone}`
      : 'http://worldtimeapi.org/api/ip';
    
    console.log(`Fetching time from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`API response not ok: ${response.status} ${response.statusText}`);
      throw new AppError(`Failed to fetch time: ${response.statusText}`, response.status);
    }
    
    const data = await response.json() as WorldTimeResponse;
    console.log('Time data received:', data);
    
    return {
      current_time: data.datetime,
      timezone: data.timezone,
      utc_time: data.utc_datetime,
      utc_offset: data.utc_offset,
      day_of_week: data.day_of_week,
      day_of_year: data.day_of_year,
      week_number: data.week_number,
    };
  } catch (error: any) {
    console.error('Error in getCurrentTime:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch current time', 500);
  }
}