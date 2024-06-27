import { BetQuizAnswers } from "../BetQuizAnswers/bet-quiz-answers";

export class BetQuiz {
    U_QUIZ_ID!: string;
    U_QUIZ_NAME!: string;
    U_QUIZ_DATE!: string;
    U_QUIZ_ANSWER_COUNT!: string;
    U_QUIZ_ANSWERS: BetQuizAnswers[] = [];
}
