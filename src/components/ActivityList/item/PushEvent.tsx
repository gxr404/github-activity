import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function PushEvent(props: Readonly<Props>) {
  const { data } = props

  function cardClick() {
    // location.href = `https://github.com/${data.repo.name}/commit/${data?.payload?.head}`
    window.open(`https://github.com/${data.repo.name}/commit/${data?.payload?.head}`, '_blank')
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
            <span className="text-green-600 font-bold">Push</span>
            <span>{data.repo.name}</span>
          </div>
          <ul className="text-gray-400 truncate">
            {
              Array.isArray(data.payload?.commits) &&
              data.payload?.commits.map((item) => {
                return (
                  <li key={item.message}>
                    <a
                      className="truncate block hover:text-green-600"
                      target="_blank"
                      href={`https://github.com/${data.repo.name}/commit/${item.sha}`} >
                      {item.message}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
