'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Survey } from '@/mock'
import { Button } from '@/components/ui/button'
import { Edit, Share, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

const formatTime = (dateString: string) => {
  return format(dateString, 'yyyy-MM-dd HH:mm:ss')
}

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: 'title',
    header: '问卷标题'
  },
  {
    accessorKey: 'pageInfo.description',
    header: '描述'
  },
  {
    accessorKey: 'questions',
    header: '题目数量',
    cell: ({ row }) => {
      const questionCount = row.original.questions.length
      return (
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {questionCount} 题
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => {
      return (
        <div className="text-gray-600 text-sm">
          {formatTime(row.original.createdAt)}
        </div>
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
    cell: ({ row }) => {
      return (
        <div className="text-gray-600 text-sm">
          {formatTime(row.original.updatedAt)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const survey = row.original

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            asChild
          >
            <Link href={`/editor/design?id=${survey.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              编辑
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            asChild
          >
            <Link href={`/editor/share?id=${survey.id}`}>
              <Share className="h-4 w-4 mr-1" />
              分享
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            asChild
          >
            <Link href={`/editor/analysis?id=${survey.id}`}>
              <BarChart3 className="h-4 w-4 mr-1" />
              分析
            </Link>
          </Button>
        </div>
      )
    },
  },
]
