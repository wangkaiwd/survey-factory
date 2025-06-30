'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { start } from '@/app/(home)/components/actions'

const StartButton = () => {
  const router = useRouter()
  const onStart = async () => {
    await start()
    router.push('/mySurveys')
  }

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={onStart}>
      开始创建
    </Button>
  )
}

export default StartButton
