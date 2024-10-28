import querystring from 'node:querystring'
import { NextRequest } from 'next/server'
import { GITHUB_API_HOST, RESPONSE_CODE } from '@/app/api/constant'
import { getGithubHeader } from '../common'

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name')
  const page = searchParams.get('page') ?? 1
  const perPage = searchParams.get('perPage') ?? 30
  if (!name) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'MISSING PARAMETER'
    })
  }

  const params = {
    page: page,
    per_page: perPage
  }
  const reqApi = `${GITHUB_API_HOST}users/${name}/events/public?${querystring.stringify(params)}`
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
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    msg: 'SUCCESS',
    data: resJSON
  })
}
