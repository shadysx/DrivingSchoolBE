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
  title?: string;
  text?: string;
  answers?: string[];
  answerIndex?: number;
  themes?: string[];
  imageUri?: string;
  thumbnailUri?: string;
  explanation?: string;
  users?: User[];
  isSerious?: boolean;
}

export interface User {
  id?: number;
  email: string;
  userName: string;
  savedQuestions?: Question[];
}


export const createInitialQuestion = (): Question => ({
  id: undefined,
  title: '',
  text: '',
  answers: ['', '', ''],
  answerIndex: undefined,
  themes: [],
  imageUri: 'https://designshack.net/wp-content/uploads/placeholder-image.png',
  explanation: '',
  users: [],
  isSerious: false,
});