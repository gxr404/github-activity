'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { ChromeStoreIcon } from '@/components/ChromeStoreIcon'
import { Input } from '@/components/ui/input'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { useToast } from '@/hooks/use-toast'
import { goGithub, goChromeStore } from '@/lib/utils'

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const [domLoaded, setDomLoaded] = useState(false)
  const usernameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  function search() {
    if (!(usernameInputRef?.current?.value)) {
      toast({
        variant: 'destructive',
        title: 'Please input your username!',
      })
      return
    }
    const username = usernameInputRef.current.value
    router.push( `/${username}`)
  }
  function onKeyup(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.code === 'Enter') {
      search()
    }
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      { domLoaded && (
        <div className="flex gap-1 absolute sm:top-10 sm:right-20 top-5 right-5">
          <Button variant="ghost" className="h-8 w-8 px-0" onClick={goGithub} title="github">
            <GitHubLogoIcon />
          </Button>
          <ThemeSwitch />
          <Button variant="ghost" className="h-8 w-8 px-0" onClick={goChromeStore} title="Chrome Web Store">
            <ChromeStoreIcon />
          </Button>
        </div>
      )}
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <p className='flex w-full items-center text-center text-[40px] font-bold'>
          <GitHubLogoIcon className='w-[40px] h-[40px] mr-4' />
          Github Activity
        </p>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input type='text' placeholder='github user name' ref={usernameInputRef} onKeyUp={onKeyup} />
          <Button type='submit' onClick={search}>
            <MagnifyingGlassIcon />Search
          </Button>
        </div>
      </main>
    </div>
  )
}
