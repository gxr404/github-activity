import { FolderCode, GitBranch, Tag } from 'lucide-react'
import { formatDataTime } from '@/lib/utils'
import { IActivityItem } from '@/query/useActivity'

interface Props {
  data: IActivityItem
}

export function CreateEvent(props: Readonly<Props>) {
  const { data } = props
  if (data.payload.ref_type === 'tag') {
    return (
      <div>
        <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
        <a
          className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
          href={`https://github.com/${data.repo.name}/tags`}
          target="_blank"
          >
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              {/* <CirclePlus className="text-green-600 w-[18px] h-[18px]" /> */}
              <span className="text-green-600 font-bold">Create</span>
              <span>{data.repo.name}</span>
            </div>
            {
              data.payload.ref && (
                <span className="flex items-center gap-1 text-gray-400 max-w-[30%] truncate">
                  <Tag className="text-yellow-400 w-[16px] h-[16px] min-w-[16px]" />
                  <span className="truncate inline-block">{data.payload.ref}</span>
                </span>
              )
            }
          </div>
        </a>
      </div>
    )
  } else if (data.payload.ref_type === 'branch') {
    return (
      <div>
        <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
        <a
          className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
          href={`https://github.com/${data.repo.name}/branches`}
          target="_blank"
          >
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              {/* <CirclePlus className="text-green-600 w-[18px] h-[18px]" /> */}
              <span className="text-green-600 font-bold">Create</span>
              <span>{data.repo.name}</span>
            </div>
            {
                data.payload.ref && (
                  <span className="flex items-center gap-1 text-gray-400 max-w-[30%] truncate">
                    <GitBranch className="text-yellow-400 w-[16px] h-[16px] min-w-[16px]" />
                    <span className="truncate inline-block">{data.payload.ref}</span>
                  </span>
                )
              }
          </div>
        </a>
      </div>
    )
  } else if (data.payload.ref_type === 'repository') {
    return (
      <div>
        <div className="text-[12px] text-gray-400 mb-[4px]">{formatDataTime(data.created_at)}</div>
        <a
          className="flex flex-cols items-center border rounded-lg p-3 gap-2 text-[14px] hover:bg-gray-50 dark:hover:bg-zinc-800"
          href={`https://github.com/${data.repo.name}`}
          target="_blank"
          >
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              {/* <CirclePlus className="text-green-600 w-[18px] h-[18px]" /> */}
              <span className="text-green-600 font-bold">Create</span>
              <span>{data.repo.name}</span>
            </div>
            <span className="flex items-center gap-1 text-gray-400 max-w-[30%] truncate">
              <FolderCode className="text-yellow-400 w-[16px] h-[16px] min-w-[16px]" />
              <span className="truncate inline-block">{data?.repo?.name?.split('/')?.[1]}</span>
            </span>
          </div>
        </a>
      </div>
    )
  } else {
    return <></>
  }
}
