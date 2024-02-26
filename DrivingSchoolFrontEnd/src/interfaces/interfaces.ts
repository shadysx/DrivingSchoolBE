import { RouteProp } from "@react-navigation/native";

export interface QuizzSummary {
  score: number;
  creationDate?: Date;
  quizzSummaryElements: QuizzSummaryElement[];
  isSuccess: boolean;
  userId: number;
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
  explanation: string;
  users: User[];
  isSerious: boolean;
}

export interface User {
  id?: number;
  email: string;
  userName: string;
  savedQuestions?: Question[];
}

export interface GetStatsResponse {
  mean: number,
  scores: number[]
}
