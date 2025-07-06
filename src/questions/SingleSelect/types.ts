import { BaseQuestionProtocol } from '@/questions/type'

export interface SingleSelectConfig {
  title: string;
  options: { label: string, value: string }[];
}

export type SingleSelectProps = SingleSelectConfig & BaseQuestionProtocol
