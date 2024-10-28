import { Badge } from '@/components/ui/badge'
import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'
// import { MessageSquare } from "lucide-react"


interface Props {
  data: IActivityItem
}

export function IssuesEvent(props: Readonly<Props>) {
  const { data } = props
  const label = data?.payload?.action?.toLocaleUpperCase()

  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">
        {formatDataTime(data.created_at)}
      </div>
      <a
        className="flex flex-col items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
        target="_blank"
        href={data?.payload?.issue?.html_url}
        >
        <div className="flex flex-1 flex-row w-full gap-1 justify-between">
          <div className="flex items-center gap-2">
            {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
            <span className="text-sky-400 font-bold">Issues</span>
            <span>{data.repo.name}</span>
          </div>
          <span className="flex items-center gap-1 text-gray-400">
            <Badge
              className={`rounded-full shadow-transparent text-[12px] px-2 py-0.2 ${label === 'CLOSED' ? '' : 'text-gray-400'}`}
              variant={label === 'CLOSED' ? 'destructive' : 'outline'}>
              {label}
            </Badge>
          </span>
        </div>
        <div className="flex overflow-hidden flex-1 w-full">
          <span className="text-gray-400 truncate">{data.payload?.issue?.title}</span>
        </div>
      </a>
    </div>
  )
}
