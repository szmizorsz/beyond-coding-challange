This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Thoughts

I decided to process the file line by line and maintain the insights on the fly

- Pros: file size does not effect the processing, so it could handle the growth of the data set (10x, 100x,...)
- Cons: it is harder to read and maintain because the logic is written from scratch without using any library. If I had to target only this file size then reading the whole file into memory and process the influencers (lines) as an array of objects would have resulted in a more readable code (like using array.reduce or lodash).

Instead of writing a consumer script, I decided to consume the API and present the insight on a page because it is easier for the user

Next steps:

- Creating a more elegant and maintanable solution without sacrifycing the scalability would mean that the file should be loaded into a NoSQL database, like MongoDB, and write all the insights in forms of queries
