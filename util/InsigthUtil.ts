import { createInterface } from "readline";
import { createReadStream } from "fs";
import { once } from "events";
import { Influencer, Insight, InsightResponse } from '../types/insight'

export async function createInsightFromInfluencerFile(): Promise<InsightResponse> {
  try {
    const readline = createInterface({
      input: createReadStream('./data/instagram_influencers.csv'),
      crlfDelay: Infinity,    
    });

    const insight: Insight = {
      'topInfluencersPerCategoryByFollowers': {},
      'topInfluencersPerCountryByEngagementAvg': {}
    }

    let lineNumber = 0;
    readline.on('line', (line) => {
      if (lineNumber !== 0) {
        const influencer = parseLine(line)
        evaluateInfluencer(influencer, insight);
      }
      lineNumber++;
    });

    await once(readline, 'close');

    return {insight}
  } catch (error) {
    console.error(error);
    return {error: 'failed to process influencer file'}
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


function evaluateInfluencer(influencer: Influencer, insight: Insight) {
  if (insight.topInfluencersPerCategoryByFollowers[influencer.category1] === undefined) {
    insight.topInfluencersPerCategoryByFollowers[influencer.category1] = {
      name: influencer.instaUserName,
      value: influencer.followers
    }
  } else if (influencer.followers > insight.topInfluencersPerCategoryByFollowers[influencer.category1].value) {
    insight.topInfluencersPerCategoryByFollowers[influencer.category1].name = influencer.instaUserName;
    insight.topInfluencersPerCategoryByFollowers[influencer.category1].value = influencer.followers;
  }

  if (insight.topInfluencersPerCountryByEngagementAvg[influencer.country] === undefined) {
    insight.topInfluencersPerCountryByEngagementAvg[influencer.country] = {
      name: influencer.instaUserName,
      value: influencer.engagementAvg
    }
  } else if (influencer.engagementAvg > insight.topInfluencersPerCountryByEngagementAvg[influencer.country].value) {
    insight.topInfluencersPerCountryByEngagementAvg[influencer.country].name = influencer.instaUserName;
    insight.topInfluencersPerCountryByEngagementAvg[influencer.country].value = influencer.engagementAvg;
  }  
}