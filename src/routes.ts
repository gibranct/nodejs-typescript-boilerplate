import { Router, Response } from 'express'

const router = Router()

router.get('/health', (_, res: Response) => res.json('ok'))

export default router
