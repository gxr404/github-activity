import { useQuery } from '@tanstack/react-query'
import { IUserInfoData } from './useUserInfo'

export const queryKey = ['useActivity']

export interface IIssue {
  active_lock_reason: null
  assignee: null
  assignees: []
  author_association: string
  body: string
  closed_at: null
  comments: number
  comments_url: string
  created_at: string
  draft: boolean
  events_url: string
  html_url: string
  id: number
  labels: string[]
  labels_url: string
  locked: boolean
  milestone: null
  node_id: string
  number: number
  performed_via_github_app: null
  pull_request: {
    url: string,
    html_url: string,
    diff_url: string,
    patch_url: string,
    merged_at: null
  }
  reactions: {
    url: string,
    total_count: number
  }
  repository_url: string
  state: string
  state_reason: null
  timeline_url: string
  title: string
  updated_at: string
  url: string
  user: IUserInfoData
}

export interface IComment {
  author_association: string,
  body: string,
  created_at: string,
  html_url: string,
  id: number,
  issue_url: string,
  node_id: string,
  reactions: {
    url: string,
    total_count: number
  },
  updated_at: string,
  url: string,
  user: IUserInfoData
}

export interface IRepo {
  id: number
  name: string
  url: string
}

export interface IActor{
  id: number,
  login: string,
  display_login: string,
  gravatar_id: string,
  avatar_url: string
}

export interface ICommitItem {
  author: {
    email: string,
    name: string
  },
  distinct: boolean
  message: string
  sha: string
  url: string
}

export interface IPayload {
  action: string,
  pusher_type: string,
  ref: string,
  ref_type: string,
  comment: IComment,
  issue: IIssue,
  head: string,
  commits: ICommitItem[],
  pull_request: IPullRequest,
  review: IReview
  release: IRelease
  forkee: IForkee
  pages: IPage[]
}

export interface IPage {
  action: string
  html_url: string
  page_name: string
  sha: string
  summary: null
  title: string
}

export interface IForkee {
  full_name: string
  id: number
  name: string
  node_id: string
  private: boolean
  public:boolean
}

export interface IRepo {
  full_name: string,
  id: number,
  name: string,
  node_id: string
  private: boolean
}

export interface IPullRequest {
  active_lock_reason: null
  additions: number
  assignee: null
  assignees: []
  author_association: string
  auto_merge: null
  base: {
    label: string,
    ref: string,
    sha: string,
    repo: IRepo,
    user: IUserInfoData
  }
  body: string
  changed_files: number
  closed_at: string
  comments: number
  comments_url: string
  commits: number
  commits_url: string
  created_at: string
  deletions: number
  diff_url: string
  draft: boolean
  head: {
    label: string,
    ref: string,
    sha: string,
    repo: IRepo,
    user: IUserInfoData
  }
  html_url: string
  id: number
  issue_url: string
  labels:[]
  locked: boolean
  maintainer_can_modify: boolean
  merge_commit_sha: string
  mergeable:null
  mergeable_state: string
  merged: boolean
  merged_at: string
  merged_by: IUserInfoData
  milestone: null
  node_id: string
  number: number
  patch_url: string
  rebaseable: null
  requested_reviewers: IUserInfoData[]
  requested_teams:[]
  review_comment_url: string
  review_comments: number
  review_comments_url: string
  state: string
  statuses_url: string
  title: string
  updated_at: string
  url: string
  user: IUserInfoData
}

export interface IReview {
  author_association: string
  body: null
  commit_id: string
  html_url: string
  id: number
  node_id: string
  pull_request_url: string
  state: string
  submitted_at: string
  user: IUserInfoData
}

export interface IRelease {
  assets: []
  assets_url: string
  author: IUserInfoData
  body: string
  created_at: string
  draft: boolean
  html_url: string
  id: number
  is_short_description_html_truncated: boolean
  name: string
  node_id: string
  prerelease: boolean
  published_at: string
  short_description_html: string
  tag_name: string
  tarball_url: string
  target_commitish: string
  upload_url: string
  url: string
  zipball_url: string
}

export interface IActivityItem {
  actor: IActor,
  created_at: string,
  id: string,
  payload: IPayload,
  public:  boolean,
  repo: IRepo,
  name: string,
  url: string,
  type: string
}

interface IActivity {
  code: number,
  data?: IActivityItem[],
  msg: string
}

interface IParams {
  name: string
  page: number
}

export const useActivity = (params: IParams) => {
  return useQuery<IActivity>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(Object.entries(params)).toString()
        const res = await fetch(`/api/github/activity?${query}`)
        const data = await res.json()
        return {
          code: data.code,
          data: data?.data as IActivityItem[],
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
    enabled: Boolean(params.name)
  })
}
