import { IActivityItem } from '@/query/useActivity'
import { ArrowLeft, FolderCode } from 'lucide-react'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function PullRequestEvent(props: Readonly<Props>) {
  const { data } = props
  function cardClick() {
    // location.href = data.payload.pull_request.html_url
    window.open(data.payload.pull_request.html_url, '_blank')
  }

  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <div
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={cardClick}
        >
        <div className="flex flex-1 flex-col w-full gap-1">
          <div className="flex items-center gap-2">
            {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
            <span className="text-green-600 font-bold">PR</span>
            <span>{data.repo.name}</span>
          </div>
          <div className="flex justify-evenly items-center my-2">
            <a
              className="hover:text-green-600 flex gap-1 items-center max-w-[40%]"
              target="_blank"
              href={`https://github.com/${data?.payload?.pull_request?.base?.repo.full_name}/tree/${data?.payload?.pull_request?.base?.ref}`}>
              <FolderCode className="w-[14px] h-[14px] min-w-[14px]" />
              <span className="truncate">{data.payload.pull_request.base.label}</span>
            </a>
            <ArrowLeft className="text-gray-400 w-[16px] h-[16px]"  />
            <a
              className="hover:text-green-600 flex gap-1 items-center max-w-[40%]"
              target="_blank"
              href={`https://github.com/${data?.payload?.pull_request?.head?.repo.full_name}/tree/${data?.payload?.pull_request?.head?.ref}`}>
              <FolderCode className="w-[14px] h-[14px] min-w-[14px]" />
              <span className="truncate">{data.payload.pull_request.head.label}</span>
            </a>
          </div>
          <div className="text-gray-400 truncate">
            {data.payload.pull_request.title}
          </div>
        </div>
      </div>
    </div>
  )
}
