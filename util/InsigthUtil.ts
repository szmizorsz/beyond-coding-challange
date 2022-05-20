import { createInterface } from "readline";
import { createReadStream } from "fs";
import { once } from "events";
import { Influencer } from '../types/insight'

export async function createInsightFromInfluencerFile() {
  try {
    const readline = createInterface({
      input: createReadStream('./data/instagram_influencers.csv'),
      crlfDelay: Infinity,    
    });

    readline.on('line', (line) => {
      const influencer = parseLine(line)
      console.log(`Line from file: ${line}`);
      console.log(`Influencer from line: ${JSON.stringify(influencer)}`);
    });

    await once(readline, 'close');

    console.log("processing finished")
  } catch (error) {
    console.error(error);
  }
}

function parseLine(line: string): Influencer {
  const columns = line.split(",");
  return {
    instaUserName: columns[0],
    instagramName: columns[1],
    category1: columns[2],
    category2: columns[3],
    followers: parseNumber(columns[4]),
    country: columns[5],
    authenticEngagement: parseNumber(columns[6]),
    engagementAvg: parseNumber(columns[7])  
  }
}

function parseNumber(encodedNumber: string): number {
  switch (encodedNumber.charAt(encodedNumber.length - 1)) {
    case 'K':
      return parseFloat(encodedNumber) * 1000;
    case 'M':
      return parseFloat(encodedNumber) * 1000000;
    default:
      return parseFloat(encodedNumber);
  }
}