'use client'
import { columns } from '@/app/mySurveys/components/columns'
import DataTable from '@/app/mySurveys/components/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { SurveyModel } from '@/types/prismaModel'
import { handleApiRes } from '@/lib/http/client'
import { createSurveyAction, getSurveyListAction } from '../editor/design/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MySurveys = () => {
  const router = useRouter()
  const [data, setData] = useState<SurveyModel[]>([])
  const onCreateClick = async () => {
    const survey = await handleApiRes(() => createSurveyAction({ title: '问卷标题', description: '问卷描述' }))
    if (survey) {
      router.push(`/editor/design?id=${survey.id}`)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await handleApiRes(() => getSurveyListAction())
      setData(res as unknown as SurveyModel[])
    }
    fetchData()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">我的问卷</h1>
              <p className="text-gray-600">管理和查看您的所有问卷调查</p>
            </div>
            <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              创建问卷
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">问卷列表</CardTitle>
            <CardDescription>
              查看和管理您的所有问卷调查
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto max-h-160">
              <DataTable columns={columns} data={data} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MySurveys
