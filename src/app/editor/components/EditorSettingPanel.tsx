'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'

const formItemBaseCls = 'flex justify-between'
const formLabelBaseCls = 'w-20'

const EditorSettingPanel = () => {
  const form = useForm()
  return (
    <Card className="w-80 h-full">
      <CardHeader>
        <CardTitle>题目设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className={'space-y-4'}>
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className={formItemBaseCls}>
                    <FormLabel className={formLabelBaseCls}>必填</FormLabel>
                    <FormControl>
                      <Switch

                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                name="placeholder"
                render={({ field }) => (
                  <FormItem className={formItemBaseCls}>
                    <FormLabel className={formLabelBaseCls}>提示文字</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入提示文字" {...field} />
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

export default EditorSettingPanel
