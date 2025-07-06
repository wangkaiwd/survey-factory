'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useQuestionStore, useQuestionStoreActions } from '@/store/questionStore/useQuestionStore'
import { useEffect, useRef } from 'react'
import { debounce } from 'lodash-es'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSearchParams } from 'next/navigation'
import { handleApiRes } from '@/lib/http/client'
import { updateSurveyAction } from '../design/actions'

const formItemBaseCls = 'flex justify-between'
const formLabelBaseCls = 'w-20 self-start pt-3'
const SystemSetting = () => {
  const pageInfo = useQuestionStore((state) => state.pageInfo)
  const { setPageInfo } = useQuestionStoreActions()
  const searchParams = useSearchParams()
  const isUpdateFromApi = useRef(true)
  const id = searchParams.get('id')
  const form = useForm()
  useEffect(() => {
    form.reset(pageInfo)
    isUpdateFromApi.current = true
  }, [pageInfo])
  useEffect(() => {
    const cleanup = form.subscribe({
      formState: { values: true },
      callback: debounce(({ values }) => {
        if (!isUpdateFromApi.current) {
          setPageInfo(values)
          handleApiRes(() => updateSurveyAction({ id, ...values }))
        }
        isUpdateFromApi.current = false
      }, 800),
    })
    return () => cleanup()
  }, [form.subscribe])

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>问卷设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className={'space-y-2'}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className={formItemBaseCls}>
                    <FormLabel className={formLabelBaseCls}>标题</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入标题" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className={formItemBaseCls}>
                    <FormLabel className={formLabelBaseCls}>描述</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请输入描述" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SystemSetting
