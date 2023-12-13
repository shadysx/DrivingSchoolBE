import { QuizzSummaryElement } from "./QuizzSummaryElement";

export class QuizzSummary {
    private score: number;
    private creationDate: Date;
    private quizzSummaryElements: QuizzSummaryElement[];
    private isSuccess: number;
  
    constructor(quizzSummaryElements: QuizzSummaryElement[] = []) {
        this.quizzSummaryElements = quizzSummaryElements
        this.score = this.computeScore();
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
        return this.quizzSummaryElements
    }
  
    get Score(): number {
        return this.score;
    }

    get CreationDate(): Date {
        return this.creationDate;
    }
  }