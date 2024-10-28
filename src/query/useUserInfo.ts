import { useQuery } from '@tanstack/react-query'

export const queryKey = ['UserInfo']

export interface IUserInfoData {
  avatar_url: string
  company: string | null
  created_at: string
  email: string | null
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  location: string | null
  login: string
  name: string | null
  node_id: string
  organizations_url:string
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  twitter_username: string | null
  type: string
  updated_at: string
  url: string
  user_view_type: string
}

interface IUserInfo {
  code: number,
  data?: IUserInfoData,
  msg: string
}

interface IParams {
  name: string
}

export const useUserInfo = (params: IParams) => {
  return useQuery<IUserInfo>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(Object.entries(params)).toString()
        const res = await fetch(`/api/github/user?${query}`)
        const data = await res.json()
        // console.log('data-->', data, res)
        return {
          code: data.code,
          data: data?.data as IUserInfoData,
          msg: data.msg
        }
      } catch {
        return {
          code: -1,
          msg: 'unknown error'
        }
      }
    },
    enabled: Boolean(params.name)
  })
}
