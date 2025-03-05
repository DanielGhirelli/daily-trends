// src/services/scrapers/BaseScraper.ts
import { IFeed } from '../../models/Feed';
import axios from 'axios';
import iconv from 'iconv-lite';

export abstract class BaseScraper {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  public abstract scrape(): Promise<IFeed[]>;

  protected async fetchHTML(chartSet: string): Promise<string> {
    const response = await axios.get(this.url, {
      responseType: 'arraybuffer', // Fetch raw binary data
      responseEncoding: 'binary', // Prevent Axios from auto-decoding
    });
  
    // Decode response using given charset
    const decodedHTML = iconv.decode(Buffer.from(response.data), chartSet);
    
    return decodedHTML;
  }
}
