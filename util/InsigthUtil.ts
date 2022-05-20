import { createInterface } from "readline";
import { createReadStream } from "fs";
import { once } from "events";

export async function createInsightFromInfluencerFile() {
  try {
    const readline = createInterface({
      input: createReadStream('./data/instagram_influencers.csv'),
      crlfDelay: Infinity,    
    });

    readline.on('line', (line) => {
      console.log(`Line from file: ${line}`);
    });

    await once(readline, 'close');

    console.log("processing finished")
  } catch (error) {
    console.error(error);
  }
}