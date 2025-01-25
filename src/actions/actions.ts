'use server';

import { client } from '@/sanity/lib/client';
import { getNewsQuery } from '@/sanity/lib/queries';
import { GetNewsQueryResult } from '../../sanity.types';

export async function loadMoreNews(
  start: number,
  end: number
): Promise<GetNewsQueryResult> {
  return client.fetch(getNewsQuery, {
    start,
    end,
  });
}
