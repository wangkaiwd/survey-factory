import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Eye, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const NavBar = () => {

  return (
    <div className="flex items-center justify-between px-4 h-16 border-b bg-background">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href="/">
            <ArrowLeft size={18} />
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">最近编辑: 例例</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Settings size={16} />
          <span>设置</span>
        </Button>
        <Button variant="outline" size="sm">
          <Eye size={16} />
          <span>预览</span>
        </Button>
        <Button size="sm">
          发布
        </Button>
        <Avatar>
          <AvatarImage
            src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/28/285f5cb40b457eed834ec7e78bed0c2869ca38d6.jpg" />
          <AvatarFallback>
            头像
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default NavBar
