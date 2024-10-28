import { IActivityItem } from '@/query/useActivity'
import { Tag } from 'lucide-react'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function ReleaseEvent(props: Readonly<Props>) {
  const { data } = props
  function cardClick() {
    // location.href = data.payload.pull_request.html_url
    window.open(data.payload.release.html_url, '_blank')
  }

  function renderMsg(msg: string) {
    return msg.split('\r\n').map((item, index) => {
      return (<p key={`ReleaseEvent_${index}`}>{item}</p>)
    })
  }

  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <div
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={cardClick}
        >
        <div className="flex flex-1 flex-col w-full gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <MessageSquare className="text-sky-400 w-[18px] h-[18px]"/> */}
              <span className="text-yellow-400 font-bold">Release</span>
              <span>{data.repo.name}</span>
            </div>
            <span className="flex items-center gap-1 text-gray-400">
              <Tag className="text-yellow-400 w-[16px] h-[16px]" />
              {data.payload.release.name}
            </span>
          </div>
          <div className="text-gray-400 truncate">
            {renderMsg(data.payload.release.body)}
          </div>
        </div>
      </div>
    </div>
  )
}
