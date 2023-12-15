import { QuestionDTO, QuizzSummaryElementDTO } from "../interfaces/interfaces";
import { Question } from "./Question";

export class QuizzSummaryElement {
  private question: Question;
  private userAnswerIndex: number;

  constructor(question: Question, userAnswerIndex: number) {
    this.question = question;
    this.userAnswerIndex = userAnswerIndex;
  }

  static fromDTO(dto: QuizzSummaryElementDTO): QuizzSummaryElement {
    const question = Question.fromDTO(dto.question);
    return new QuizzSummaryElement(question, dto.userAnswerIndex);
  }

  get QuestionText(): string {
    return this.question.text;
  }

  get CorrectAnswerIndex(): number {
    return this.question.answerIndex;
  }

  get UserAnswerIndex(): number {
    return this.userAnswerIndex;
  }

  get IsAnswerCorrect(): boolean {
    return this.question.answerIndex === this.userAnswerIndex;
  }
  get ImageUri(): string {
    return this.question.imageUri;
  }
}
