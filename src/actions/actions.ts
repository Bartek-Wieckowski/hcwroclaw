'use server'

import { client } from "@/sanity/lib/client";
import { getNewsQuery } from "@/sanity/lib/queries";
import { NewsSinglePage } from "../../sanity.types";

export async function loadMoreNews(start: number, end: number): Promise<NewsSinglePage[]> {
  return client.fetch(getNewsQuery, {
    start,
    end,
  });
} 