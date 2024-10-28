import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'
// import { StarFilledIcon } from '@radix-ui/react-icons'

interface Props {
  data: IActivityItem
}

export function WatchEvent(props: Readonly<Props>) {
  const { data } = props
  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <a
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
        target="_blank"
        href={`https://github.com/${data.repo.name}`}
        >
        {/* <StarFilledIcon className="text-yellow-400 w-[18px] h-[18px]" /> */}
        <span className="text-yellow-400 font-bold">Star</span>
        <p>{data.repo.name}</p>
      </a>
    </div>
  )
}
