// github repo private to public
import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function PublicEvent(props: Readonly<Props>) {
  const { data } = props
  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <a
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
        target="_blank"
        href={`https://github.com/${data?.repo?.name}`}
        >
        {/* <StarFilledIcon className="text-yellow-400 w-[18px] h-[18px]" /> */}
        <span className="text-blue-500 font-bold">Public Repo</span>
        <p>{data?.repo?.name}</p>
      </a>
    </div>
  )
}
