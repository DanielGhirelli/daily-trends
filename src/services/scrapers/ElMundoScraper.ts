// src/services/scrapers/ElMundoScraper.ts
import { BaseScraper } from './BaseScraper';
import { IFeed } from '../../models/Feed';
import cheerio from 'cheerio';

export class ElMundoScraper extends BaseScraper {
  constructor() {
    super('https://www.elmundo.es'); // Base URL for El Mundo
  }

  public async scrape(): Promise<IFeed[]> {
    const html = await this.fetchHTML("ISO-8859-1");
    const $ = cheerio.load(html);
    const feeds: IFeed[] = [];

    $('.ue-c-cover-content__link').each((i: number, elem: any) => {
      // Validate if is not an autor link
      if(!$(elem).attr('href')?.includes('/autor/'))
      {
        feeds.push({
          title: $(elem).text().trim(),
          url: $(elem).attr('href'),
          source: 'El Mundo',
          publishedAt: new Date(),
        } as IFeed);
      }

      // Stop after saving 5 articles
      if (feeds.length === 5) {
          return false;
      }
    });

    return feeds;
  }
}
