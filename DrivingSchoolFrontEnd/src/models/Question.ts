import { QuestionDTO } from "../interfaces/interfaces";
import { QuizzSummaryElement } from "./QuizzSummaryElement";

export class Question {
    id?: number;
    title: string;
    text: string;
    answers: string[];
    answerIndex: number;
    themes: string[];
    imageUri: string;

    constructor(title: string, text: string, answers: string[], answerIndex: number, themes: string[], imageUri: string) {
        this.title = title;
        this.text = text;
        this.answers = answers;
        this.answerIndex = answerIndex;
        this.themes = themes;
        this.imageUri = imageUri;
      }
    
      static fromDTO(dto: QuestionDTO): Question {
        return new Question(dto.title, dto.text, dto.answers, dto.answerIndex, dto.themes, dto.imageUri);
      }

}
