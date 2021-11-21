import { Request, Response } from 'express'

export type MainContext = {
  req: Request
  res: Response
}
