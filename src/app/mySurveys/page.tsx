import Link from 'next/link'
import { columns } from '@/app/mySurveys/components/columns'
import DataTable from '@/app/mySurveys/components/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateMockSurveys, Survey } from '@/mock'
import { Plus, FileText } from 'lucide-react'
import { addMonths, isAfter, isBefore, startOfMonth, subDays } from 'date-fns'

async function getData(): Promise<Survey[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 100))
  return generateMockSurveys()
}

const MySurveys = async () => {
  const data = await getData()
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">我的问卷</h1>
              <p className="text-gray-600">管理和查看您的所有问卷调查</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/editor/design">
                <Plus className="h-4 w-4 mr-2" />
                创建问卷
              </Link>
            </Button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                总问卷数
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{data.length}</div>
              <p className="text-xs text-gray-600 mt-1">
                全部问卷
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                本月创建
              </CardTitle>
              <Plus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data.filter(survey => {
                  const now = new Date()
                  const prevMonthLastDay = subDays(startOfMonth(now), 1)
                  const nextMonthFirstDay = startOfMonth(addMonths(now, 1))
                  return isAfter(survey.createdAt, prevMonthLastDay) && isBefore(survey.createdAt, nextMonthFirstDay)
                }).length}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                较上月
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                平均题目数
              </CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(data.reduce((acc, survey) => acc + survey.questions.length, 0) / data.length)}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                每个问卷
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">问卷列表</CardTitle>
            <CardDescription>
              查看和管理您的所有问卷调查
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MySurveys
