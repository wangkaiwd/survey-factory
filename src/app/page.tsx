import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/svgs/logo.svg'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 md:p-8">
          <div className="max-w-4xl w-full space-y-8 text-center">
            <div className="flex justify-center mb-8">
              <Image 
                src={logo} 
                alt="问卷工厂"
                width={80}
                height={80}
                className="rounded-lg"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              问卷工厂
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
              轻松创建、管理和分析问卷的专业工具
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-lg font-medium mb-2">智能生成</h3>
                <p className="text-muted-foreground">快速生成专业问卷，节省宝贵时间</p>
              </div>
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-lg font-medium mb-2">简洁设计</h3>
                <p className="text-muted-foreground">美观易用的界面，轻松创建专业问卷</p>
              </div>
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-lg font-medium mb-2">数据分析</h3>
                <p className="text-muted-foreground">智能分析回复，获取有价值的见解</p>
              </div>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor/design">
                <Button size="lg" className="w-full sm:w-auto">
                  开始创建
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  登录账户
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
