'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Badge } from '@/components/ui/badge'
import { useSearch } from '@/query/useSearch'
import { cn, formatDataTime } from '@/lib/utils'

import type { SearchItem } from '@/query/useSearch'

interface Props {
  username: string
}

const authorPRListClassName = [
  'scrollbar-thumb-rounded-full',
  'scrollbar-track-rounded-full',
  'scrollbar-thin',
  'scrollbar-thumb-muted-foreground',
  'scrollbar-track-muted',
  'hover:scrollbar-thumb-secondary-foreground',
  'overflow-auto',
  'h-[calc(100vh-166px-4rem)]',
  'sm:h-[calc(100vh-166px-5rem)]',
  'p-6', 'flex', 'flex-col',
  'gap-4'
]

export function AuthorPRList(props: Readonly<Props>) {
  const { username } = props
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [authorPRList, setAuthorPRList] = useState<SearchItem[]>([])
  const [hasError, setHasError] = useState(false)

  const { data, isFetched } = useSearch({
    name: username,
    page,
    type: 'author'
  })

  useEffect(() => {
    if (Array.isArray(data?.data?.items)) {
      setAuthorPRList([
        ...authorPRList,
        ...data?.data?.items
      ])
      setHasMore(data?.data?.items?.length >= 30)
    }
    if (data?.code !== 0) {
      setHasError(true)
    }
  }, [data, isFetched])

  function next() {
    if (hasError) return
    setPage(page+1)
  }

  return (
    <div className={cn(authorPRListClassName)}>
      {/* <p>ActivityList {page} -- <button onClick={() => setPage(page+1)}>Add</button></p> */}
      {
        authorPRList.map((item, index) => (
          <RenderItem key={index} data={item} />
        ))
      }
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={!isFetched}
        next={next}
        threshold={0}>
        {(hasMore && !hasError) ? (
          <div className="flex justify-center">
            <Loader2 className="my-2 h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="text-[12px] text-center text-gray-400">
            ⎯ END  ⎯
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}

interface RenderItemProps {
  data: SearchItem
}

function RenderItem(props: Readonly<RenderItemProps>) {
  const {html_url, created_at, title, state, pull_request} = props.data
  function getRepo(prUrl: string) {
    if (!prUrl) {
      return {
        user: '',
        repo: ''
      }
    }
    const [
      raw = prUrl,
      user = '',
      repo = ''
    ] = Array.from(/https:\/\/github\.com\/(.*?)\/(.*?)\/.*/.exec(prUrl) || [])
    return {
      raw,
      user,
      repo
    }
  }

  function formatState(state: string) {
    let res = state?.toLocaleUpperCase()
    res = res === 'CLOSED' && pull_request?.merged_at ? 'MERGED' : res
    return res
  }

  function getStateClass(state: string) {
    const stateClass = {
      'CLOSED': 'text-white bg-destructive hover:bg-destructive/80',
      'MERGED': 'text-white bg-violet-800 hover:bg-violet-900',
    }
    const defaultClass = 'text-white bg-green-600 hover:bg-green-700'
    return stateClass[state as keyof typeof stateClass] || defaultClass
  }
  const repo = getRepo(html_url)
  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(created_at)}</div>
      <a
        className="flex flex-col border rounded-lg p-3 gap-1 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
        href={html_url}
        target="_blank"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
                <span className="text-green-600 font-bold">PR</span>
                <span>{repo.user}/{repo.repo}</span>
            </div>
            <Badge
              className={`rounded-full shadow-transparent text-[12px] px-2 py-0.2 ${getStateClass(formatState(state))}`}
              variant="secondary">
              {formatState(state)}
            </Badge>
            {/* <span className="flex items-center gap-1 text-gray-400">
              <Tag className="text-yellow-400 w-[16px] h-[16px]" />
              {data.payload.release.name}
            </span> */}
          </div>
          <div className="text-gray-400 truncate">
            {title}
          </div>
      </a>
    </div>
  )
}

export const AuthorPRListMemo = React.memo(AuthorPRList)
