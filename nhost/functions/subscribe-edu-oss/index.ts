import { Request, Response } from 'express';

import { authPost } from '../_utils/middleware';
import { upsertSubscription } from '../_utils/graphql/subscriptions';

async function inviteTeamMember(req: Request, res: Response, { userId }: { userId: string }) {
  const { plan } = req.body;

  if (!plan || !['oss', 'student'].includes(plan) || !userId) {
    return res.status(400).send({ message: 'Bad request.' });
  }

  await upsertSubscription({
    userId,
    planId: plan,
  });

  return res.status(200).send({ status: 'ok' });
}

export default authPost(inviteTeamMember);
