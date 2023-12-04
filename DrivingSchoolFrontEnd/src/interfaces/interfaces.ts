export interface Question {
  id: number;
  title: string;
  text: string;
  answers: string[];
  answerIndex: number;
  themes: string[];
  imageUri: string;
}

