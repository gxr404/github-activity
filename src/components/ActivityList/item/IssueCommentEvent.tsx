import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'
// import { MessageSquare } from "lucide-react"

interface Props {
  data: IActivityItem
}

export function IssueCommentEvent(props: Readonly<Props>) {
  const { data } = props
  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <a
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
        target="_blank"
        href={data?.payload?.comment?.html_url}
        >
        <div className="flex flex-1 flex-col w-full gap-1">
          <div className="flex items-center gap-2">
            {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
            <span className="text-sky-400 font-bold">Issues</span>
            <span>{data.repo.name}</span>
          </div>
          <div className="flex overflow-hidden flex-1 w-full">
            <span className="text-gray-400 truncate">{data.payload?.comment?.body}</span>
          </div>
        </div>
      </a>
    </div>
  )
}
