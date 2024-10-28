'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useUserInfo } from '@/query/useUserInfo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { ActivityListMemo } from '@/components/ActivityList/index'
import { AuthorPRListMemo } from '@/components/AuthorPRList'
import { AuthorInvolvesListMemo } from '@/components/AuthorInvolvesList'
import { THEME_TYPE, ThemeSwitch } from '@/components/ThemeSwitch'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon, GitHubLogoIcon, TwitterLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { goGithub } from '@/lib/utils'


const TABS_TYPE = {
  ACTIVITY: 'activity',
  AUTHOR_PR: 'author_pr',
  INVOLVES_ISSUES: 'involves_issues'
} as const

type Keys = keyof typeof TABS_TYPE
type TABS_VALUE = typeof TABS_TYPE[Keys]

interface UserResultParams {
  params: {
    username: string
  },
  searchParams: {
    tab: TABS_VALUE,
    theme: THEME_TYPE
  }
}


export default function UserResult({ params, searchParams }: Readonly<UserResultParams>) {
  const router = useRouter()
  const { toast } = useToast()
  const { data, isFetched } = useUserInfo({name: params.username})
  const [currentTab, setCurrentTab] = useState<string>(TABS_TYPE.ACTIVITY)
  const [domLoaded, setDomLoaded] = useState(false)
  const [defaultTheme, setDefaultTheme] = useState<THEME_TYPE | undefined>()

  useEffect(() => {
    setDomLoaded(true)
    if (Object.values(TABS_TYPE).includes(searchParams.tab)) {
      setCurrentTab(searchParams.tab)
    }
    if (['light', 'dark'].includes(searchParams.theme)) {
      setDefaultTheme(searchParams.theme)
    }
  }, [])

  useEffect(() => {
    if (data && data.code === -3) {
      toast({
        variant: 'destructive',
        title: `o(╥﹏╥)o ${data.msg}`,
      })
      router.push('/')
    }
    if (data && data.code === 404) {
      toast({
        variant: 'destructive',
        title: 'Not Found User',
      })
      router.push('/')
    }
  }, [data, isFetched, toast, router])

  function goHome() {
    router.push('/')
  }
  function goUserGithub() {
    const url = data?.data?.html_url
    if (!url) return
    window.open(url, '_blank')
  }
  function goTwitter(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation()
    if (!data?.data?.twitter_username) return
    window.open(`https://x.com/${data?.data?.twitter_username}`, '_blank')
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] grid-cols-[1fr] justify-items-center h-screen p-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      { domLoaded && (
        <div className="flex gap-1 absolute sm:top-10 sm:right-20 top-5 right-5">
          <Button variant="ghost" className="h-8 w-8 px-0" onClick={goHome}>
            <MagnifyingGlassIcon />
          </Button>
          <Button variant="ghost" className="h-8 w-8 px-0" onClick={goGithub}>
            <GitHubLogoIcon />
          </Button>
          <ThemeSwitch defaultTheme={defaultTheme} />
        </div>
      )}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[calc(100vw-4rem)] sm:max-w-[650px] min-h-full">
        {
          (isFetched && data?.code === 0) ? (
            <>
              <div className="flex gap-2">
                <div
                  className="flex gap-2 cursor-pointer hover:bg-accent p-2 -mt-2 rounded-lg"
                  onClick={goUserGithub}>
                  <Avatar className="w-[50px] h-[50px] rounded-lg font-bold border bg-card shadow">
                    <AvatarImage src={data?.data?.avatar_url} className="rounded-lg"/>
                    <AvatarFallback className="rounded-lg"></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left text-sm leading-tight justify-around">
                    <span className="truncate font-semibold text-[18px]">{data?.data?.name ?? data?.data?.login}</span>
                    <p className="flex truncate text-xs gap-2">
                      {
                        data?.data?.twitter_username && (
                          <span
                            className="flex gap-1 items-center hover:text-sky-500"
                            onClick={goTwitter}>
                            <TwitterLogoIcon />
                            {data?.data?.twitter_username}
                          </span>
                        )
                      }
                      {
                        data?.data?.email && (
                          <span className="flex gap-1 items-center"><EnvelopeClosedIcon />{data?.data?.email}</span>
                        )
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-8 items-stretch">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 gap-1">
                    <TabsTrigger
                      className="hover:bg-background hover:text-foreground"
                      value={TABS_TYPE.ACTIVITY}>
                        Activity
                    </TabsTrigger>
                    <TabsTrigger
                      className="hover:bg-background hover:text-foreground"
                      value={TABS_TYPE.AUTHOR_PR}>
                        Author PR
                    </TabsTrigger>
                    <TabsTrigger
                      className="hover:bg-background hover:text-foreground"
                      value={TABS_TYPE.INVOLVES_ISSUES}>
                        Author Involves
                    </TabsTrigger>
                  </TabsList>
                  {/* Activity tabsContent */}
                  <TabsContent
                    value={TABS_TYPE.ACTIVITY}
                    hidden={currentTab !== TABS_TYPE.ACTIVITY}
                    forceMount>
                    <ActivityListMemo username={params.username} />
                  </TabsContent>
                  {/* Author PR tabsContent */}
                  <TabsContent
                    value={TABS_TYPE.AUTHOR_PR}
                    hidden={currentTab !== TABS_TYPE.AUTHOR_PR}
                    forceMount>
                    <AuthorPRListMemo username={params.username}/>
                  </TabsContent>
                  {/* Author Involves tabsContent */}
                  <TabsContent
                    value={TABS_TYPE.INVOLVES_ISSUES}
                    hidden={currentTab !== TABS_TYPE.INVOLVES_ISSUES}
                    forceMount>
                    <AuthorInvolvesListMemo username={params.username}/>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Skeleton className="w-[50px] h-[50px] rounded-lg" />
                <div className="flex flex-col flex-1 text-left text-sm leading-tight justify-around">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 items-stretch">
              <div className="w-full">
                <div className="grid w-full grid-cols-1">
                  <Skeleton className="h-9 rounded-lg" />
                </div>
              </div>
              <Skeleton className="w-full h-[calc(100vh-166px-4rem)] sm:h-[calc(100vh-166px-5rem)] rounded-lg" />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
