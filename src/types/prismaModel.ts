import { Survey } from "@/generated/prisma";
import { IQuestion } from "@/store/questionStore/types";

export interface SurveyModel extends Omit<Survey, 'questions'>{
    questions: IQuestion[]
}