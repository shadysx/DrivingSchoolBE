export interface QuizzSummary {
  score: number;
  creationDate?: Date;
  quizzSummaryElements: QuizzSummaryElement[];
  isSuccess: boolean;
}

export interface QuizzSummaryElement {
  question: Question;
  userAnswerIndex: number;
  isAnswerCorrect: boolean;
}

export interface Question {
  id?: number;
  title: string;
  text: string;
  answers: string[];
  answerIndex: number;
  themes: string[];
  imageUri: string;
}

export interface User {
  email: string;
  userName: string;
}