'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { useActivity } from '@/query/useActivity'
import { WatchEvent } from './item/WatchEvent'
import { DeleteEvent } from './item/DeleteEvent'
import { IssueCommentEvent } from './item/IssueCommentEvent'
import { PushEvent } from './item/PushEvent'
import { PullRequestEvent } from './item/PullRequestEvent'
import { PullRequestReviewEvent } from './item/PullRequestReviewEvent'
import { ReleaseEvent } from './item/ReleaseEvent'
import { CreateEvent } from './item/CreateEvent'
import { IssuesEvent } from './item/IssuesEvent'
import { PullRequestReviewCommentEvent } from './item/PullRequestReviewCommentEvent'
import { ForkEvent } from './item/ForkEvent'
import { GollumEvent } from './item/GollumEvent'
import { PublicEvent } from './item/PublicEvent'
import { cn } from '@/lib/utils'

import type { IActivityItem } from '@/query/useActivity'


interface Props {
  username: string
}

const activityListClassName = [
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

export function ActivityList(props: Readonly<Props>) {
  const { username } = props
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activityList, setActivityList] = useState<IActivityItem[]>([])

  const { data, isFetched } = useActivity({
    name: username,
    page
  })

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setActivityList([
        ...activityList,
        ...data?.data
      ])
      setHasMore(data?.data?.length >= 30)
    }
  }, [data, isFetched])

  function next() {
    setPage(page+1)
  }

  return (
    <div className={cn(activityListClassName)}>
      {/* <p>ActivityList {page} -- <button onClick={() => setPage(page+1)}>Add</button></p> */}
      {
        activityList.map((item, index) => (
          <RenderItem key={`ActivityListItem_${index}`} data={item} />
        ))
      }
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={!isFetched}
        next={next}
        threshold={0}>
        {hasMore ? (
          <div className="flex justify-center">
            <Loader2 className="my-2 h-6 w-6 animate-spin" />
          </div>
        ): (
          <div className="text-[12px] text-center text-gray-400">
            ⎯ The event has a delay and can only display events from the past 90 days  ⎯
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}

interface RenderItemProps {
  data: IActivityItem
}

function RenderItem(props: Readonly<RenderItemProps>) {
  const dataType = props.data.type
  switch (dataType) {
    case 'WatchEvent':
      return <WatchEvent data={props.data} />
    case'DeleteEvent':
      return <DeleteEvent data={props.data} />
    case'IssueCommentEvent':
      return <IssueCommentEvent data={props.data} />
    case'PushEvent':
      return <PushEvent data={props.data} />
    case 'PullRequestEvent':
      return <PullRequestEvent data={props.data} />

    case'PullRequestReviewEvent':
      return <PullRequestReviewEvent data={props.data} />
    case'ReleaseEvent':
      return <ReleaseEvent data={props.data} />
    case 'CreateEvent':
      return <CreateEvent data={props.data} />
    case 'IssuesEvent':
      return <IssuesEvent data={props.data} />
    case 'PullRequestReviewCommentEvent':
      return <PullRequestReviewCommentEvent data={props.data} />

    case 'ForkEvent':
      return <ForkEvent data={props.data} />
    case 'PublicEvent':
      return <PublicEvent data={props.data} />
    case 'GollumEvent':
      return <GollumEvent data={props.data} />
    default:
      return <span className="hidden" dangerouslySetInnerHTML={{__html: `<--?? ${dataType}-->`}}></span>
      // return <span>{dataType}</span>
  }
}

export const ActivityListMemo = React.memo(ActivityList)
