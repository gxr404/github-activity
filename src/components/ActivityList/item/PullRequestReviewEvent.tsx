import { IActivityItem } from '@/query/useActivity'
import { ArrowLeft, FolderCode, CircleUserRound } from 'lucide-react'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function PullRequestReviewEvent(props: Readonly<Props>) {
  const { data } = props
  function cardClick() {
    // location.href = data.payload.pull_request.html_url
    window.open(data.payload.review.html_url, '_blank')
  }

  function repoClick(event: React.MouseEvent<HTMLElement>, url: string ) {
    event.stopPropagation()
    if (!url) return
    window.open(url, '_blank')
  }

  // function getLabelClass(state: string) {
  //   const stateClass = {
  //     'CLOSED': 'text-white bg-destructive hover:bg-destructive/80',
  //     'MERGER': 'text-white bg-violet-800 hover:bg-violet-900',
  //   }
  //   const defaultClass = 'text-white bg-green-600 hover:bg-green-700'
  //   return stateClass[state as keyof typeof stateClass] || defaultClass
  // }

  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <div
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={cardClick}
        >
        <div className="flex flex-1 flex-col w-full gap-1">
          {/* <div className="flex items-center gap-2"> */}
            {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
            {/* <span className="text-green-600 font-bold">PR Review</span>
            <span>{data.repo.name}</span>
            <span>{data.payload.review.author_association}</span>
          </div> */}

          <div className="flex flex-1 flex-row w-full gap-1 justify-between">
            <div className="flex items-center gap-2">
              {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
              <span className="text-green-600 font-bold">PR Review</span>
              <span >{data.repo.name}</span>
            </div>
            {/* {
              data?.payload?.pull_request?.author_association && (
                <span className="flex items-center gap-1 text-gray-400 truncate">
                  <Badge
                    className={`rounded-full shadow-transparent text-[12px] px-2 py-0.2 text-gray-400 ${getLabelClass(data?.payload?.pull_request?.author_association)}`}
                    variant="secondary">
                    {data?.payload?.pull_request?.author_association}
                  </Badge>
              </span>
              )
            } */}
          </div>
          <div className="flex justify-evenly items-center my-2">
            <span
              className="hover:text-green-600 flex gap-1 items-center max-w-[40%] cursor-pointer"
              onClick={(e) => repoClick(e, `https://github.com/${data?.payload?.pull_request?.base?.repo.full_name}/tree/${data?.payload?.pull_request?.base?.ref}`)}>
              <FolderCode className="w-[14px] h-[14px]  min-w-[14px]" />
              <span className="truncate">{data.payload.pull_request.base.label}</span>
            </span>
            <ArrowLeft className="text-gray-400 w-[16px] h-[16px]"  />
            <span
              className="hover:text-green-600 flex gap-1 items-center max-w-[40%] cursor-pointer"
              onClick={(e) => repoClick(e, `https://github.com/${data?.payload?.pull_request?.head?.repo.full_name}/tree/${data?.payload?.pull_request?.head?.ref}`)} >
              <FolderCode className="w-[14px] h-[14px]  min-w-[14px]" />
              <span className="truncate">{data.payload.pull_request.head.label}</span>
            </span>
          </div>
          {
            data?.payload?.review?.author_association && (
              <div
                className="flex items-center text-gray-400"
                title={`${data.payload.review.author_association.toLowerCase()} ⎯ ${data.payload.review.state}`}>
                  <CircleUserRound className="w-[14px] h-[14px]  min-w-[14px] mr-1" />
                  {data.payload.review.author_association.toLowerCase()}: {data.payload.review.state}
              </div>
            )
          }

          {/* <div className="text-gray-400 truncate">
            {data.payload.pull_request.title}
          </div> */}
        </div>
      </div>
    </div>
  )
}
