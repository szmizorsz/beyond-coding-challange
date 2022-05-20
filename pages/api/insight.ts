// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createInsightFromInfluencerFile} from '../../util/InsigthUtil'
import {InsightResponse} from '../../types/insight'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InsightResponse>
) {
  const result = await createInsightFromInfluencerFile()
  const status = result.insight ? 200 : 500
  res.status(status).json(result)
}
