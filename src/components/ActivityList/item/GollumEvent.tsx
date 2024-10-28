// create or edit wiki page
import { IActivityItem } from '@/query/useActivity'
import { formatDataTime } from '@/lib/utils'

interface Props {
  data: IActivityItem
}

export function GollumEvent(props: Readonly<Props>) {
  const { data } = props
  function toActionWord(actionWord: string) {
    return`${actionWord.charAt(0).toUpperCase()}${actionWord.slice(1)}`
  }
  function cardClick() {
    window.open(`https://github.com/${data.repo.name}/wiki`, '_blank')
  }
  return (
    <div>
      <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
      <div
        className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={cardClick}
        >
        {/* <StarFilledIcon className="text-yellow-400 w-[18px] h-[18px]" /> */}
        <div className="flex flex-1 flex-col w-full gap-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">Wiki</span>
            <p>{data?.repo?.name}</p>
          </div>
          <ul className="text-gray-400 truncate">
            {
              Array.isArray(data.payload?.pages) &&
              data.payload?.pages.map((item, index) => {
                return (
                  <li key={`GollumEvent_${index}`}>
                    <a
                      className="truncate block hover:text-blue-500"
                      target="_blank"
                      href={item.html_url} >
                      {toActionWord(item.action)} - {item.title}
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
