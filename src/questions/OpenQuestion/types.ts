import { BaseQuestionProtocol } from '@/questions/type'

export interface OpenQuestionConfig {
  title: string;
  placeholder: string;
}

export type OpenQuestionProps = OpenQuestionConfig & BaseQuestionProtocol
