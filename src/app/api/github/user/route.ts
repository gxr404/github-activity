import { NextRequest } from 'next/server'
import { GITHUB_API_HOST, RESPONSE_CODE } from '@/app/api/constant'
import { getGithubHeader } from '../common'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name') ?? ''
  if (!name) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'MISSING PARAMETER'
    })
  }

  const reqApi = `${GITHUB_API_HOST}users/${name}`
  const res = await fetch(reqApi, {
    headers: getGithubHeader(),
    method:'GET',
  }).catch(e => {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: e?.message || 'UNKNOWN ERROR'
    })
  })
  const resJSON = await res.json()
  // 超出速率限制
  if (/API rate limit exceeded.*/.test(resJSON?.message)) {
    return Response.json({
      code: RESPONSE_CODE.API_RATE_LIMIT,
      msg: 'github api rate limit'
    })
  }
  if (/Not Found/.test(resJSON?.message)) {
    return Response.json({
      code: RESPONSE_CODE.NOT_FOUND,
      msg: 'Not Found'
    })
  }
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    msg: 'SUCCESS',
    data: resJSON
  })
}
