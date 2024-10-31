import querystring from 'node:querystring'
import { NextRequest } from 'next/server'
import { GITHUB_API_HOST, RESPONSE_CODE, SEARCH_TYPE } from '@/app/api/constant'
import { getGithubHeader } from '../common'


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name') ?? ''
  const page = searchParams.get('page') ?? 1
  const perPage = searchParams.get('perPage') ?? 30
  const type = searchParams.get('type') ?? SEARCH_TYPE.AUTHOR
  const typeMap = new Map([
    [SEARCH_TYPE.AUTHOR, `author:${name}+type:pr`],
    [SEARCH_TYPE.INVOLVES, `involves:${name}+type:issue`]
  ])
  const matchType = typeMap.get(type)
  if (!name || !matchType) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'MISSING PARAMETER'
    })
  }

  const params = {
    page: page,
    per_page: perPage,
    q: matchType
  }

  const reqApi = `${GITHUB_API_HOST}search/issues?${querystring.stringify(
    params, '&', '=', { encodeURIComponent: str => str }
  )}`
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
  if (resJSON?.message && resJSON?.errors){
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: resJSON?.message || 'UNKNOWN ERROR'
    })
  }
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    msg: 'SUCCESS',
    data: resJSON
  })
}
