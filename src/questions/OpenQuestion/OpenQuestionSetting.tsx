import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

const formItemBaseCls = 'flex justify-between'
const formLabelBaseCls = 'w-20'
const OpenQuestionSetting = () => {
  const form = useFormContext()
  return (
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
  )
}

export default OpenQuestionSetting
