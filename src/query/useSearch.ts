import { useQuery } from '@tanstack/react-query'
import { IUserInfoData } from './useUserInfo'

export const queryKey = ['useSearch']

interface IReactions {
  confused: number
  eyes: number
  heart: number
  hooray: number
  laugh: number
  rocket: number
  total_count: number
  url: string
}

interface ILabelsItem {
  color: string
  default: boolean
  description: string
  id: number
  name: string
  node_id: string
  url: string
}

interface IPullRequest {
  diff_url: string
  html_url: string
  merged_at: string
  patch_url: string
  url: string
}

export interface SearchItem {
  active_lock_reason: null
  assignee: null
  assignees: []
  author_association: string
  body: string
  closed_at: string
  comments: number
  comments_url: string
  created_at: string
  draft: boolean
  events_url: string
  html_url: string
  id: number
  labels: ILabelsItem[]
  labels_url: string
  locked: boolean
  milestone: null
  node_id: string
  number: number
  performed_via_github_app: null
  pull_request: IPullRequest
  reactions: IReactions
  repository_url: string
  score: number
  state: string
  state_reason: null
  timeline_url: string
  title: string
  updated_at: string
  url: string
  user: IUserInfoData
}

interface ISearchData {
  incomplete_results: boolean
  items: SearchItem[]
  total_count: number
}

export interface ISearch {
  code: number,
  data?: ISearchData,
  msg: string
}

interface IParams {
  name: string
  page: number,
  type: string
}

export const useSearch = (params: IParams) => {
  return useQuery<ISearch>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(Object.entries(params)).toString()
        const res = await fetch(`/api/github/search?${query}`)
        const data = await res.json()
        return {
          code: data.code,
          data: data?.data as ISearchData,
          msg: data.msg
        }
      } catch {
        return {
          code: -1,
          msg: 'unknown error'
        }
      }
    },
    // 无参数时不请求
    enabled: Boolean(params.name) || Boolean(params.type)
  })
}
