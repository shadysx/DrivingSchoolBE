import { QuizzSummaryDTO } from "../interfaces/interfaces";
import { QuizzSummaryElement } from "./QuizzSummaryElement";

export class QuizzSummary {
  score: number;
  creationDate: Date;
  quizzSummaryElements: QuizzSummaryElement[];
  isSuccess: number;

  constructor(quizzSummaryElements: QuizzSummaryElement[] = []) {
    this.quizzSummaryElements = quizzSummaryElements;
    this.score = this.computeScore();
  }

  static fromDTO(dto: QuizzSummaryDTO): QuizzSummary {
    const quizzSummary = new QuizzSummary();
    quizzSummary.quizzSummaryElements = dto.quizzSummaryElements.map(element => QuizzSummaryElement.fromDTO(element));
    console.log("first element: ", quizzSummary.quizzSummaryElements[0]);
    // initialize other properties...
    return quizzSummary;
  }

  private computeScore(): number {
    let score = 0;
    for (let element of this.quizzSummaryElements) {
      if (element.IsAnswerCorrect) {
        score++;
      }
    }
    return score;
  }

  get IsSuccess(): boolean {
    return this.score >= 41;
  }

  get QuizzSummaryElements(): QuizzSummaryElement[] {
    return this.quizzSummaryElements;
  }

  get Score(): number {
    return this.score;
  }

  get CreationDate(): Date {
    return this.creationDate;
  }
}
