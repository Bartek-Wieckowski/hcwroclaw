import axios from 'axios';
import { API_URL } from '@/utils/constants';

export async function getCalendarGames() {
  try {
    const response = await axios.get(`${API_URL}/gameCalendarData`);
    return response.data;
  } catch (error) {
    throw new Error('Błąd ładowania danych...');
  }
}
