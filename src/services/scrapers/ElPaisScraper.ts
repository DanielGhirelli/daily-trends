// src/services/scrapers/ElPaisScraper.ts
import { BaseScraper } from './BaseScraper';
import { IFeed } from '../../models/Feed';
import cheerio from 'cheerio';

export class ElPaisScraper extends BaseScraper {
  constructor() {
    super('https://elpais.com'); // Base URL for El País
  }

  public async scrape(): Promise<IFeed[]> {
    const html = await this.fetchHTML("UTF-8");
    const $ = cheerio.load(html);
    const feeds: IFeed[] = [];

    $('.c_t a').slice(0, 5).each((i: number, elem: any) => {
      feeds.push({
        title: $(elem).text().trim(),
        url: $(elem).attr('href'),
        source: 'El País',
        publishedAt: new Date(),
      } as IFeed);
    });

    return feeds;
  }
}
