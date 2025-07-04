import { Survey } from "@/generated/prisma";
import { QuestionProtocol } from "@/questions";

export interface SurveyModel extends Omit<Survey, 'questions'>{
    questions: {
        id: string,
        props: QuestionProtocol
    }[]
}