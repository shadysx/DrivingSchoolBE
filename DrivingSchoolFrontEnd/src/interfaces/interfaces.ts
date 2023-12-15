export interface QuizzSummaryDTO {
  score: number;
  creationDate: Date;
  quizzSummaryElements: QuizzSummaryElementDTO[];
  isSuccess: number;
}

export interface QuizzSummaryElementDTO {
  question: QuestionDTO;
  userAnswerIndex: number;
}

export interface QuestionDTO {
  id?: number;
  title: string;
  text: string;
  answers: string[];
  answerIndex: number;
  themes: string[];
  imageUri: string;
}
