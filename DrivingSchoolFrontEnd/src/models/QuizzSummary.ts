import { QuizzSummaryElement } from "./QuizzSummaryElement";

export class QuizzSummary {
    private score: number;
    private creationDate: Date;
    private quizzSummaryElements: QuizzSummaryElement[];
  
    constructor(quizzSummaryElements: QuizzSummaryElement[] = [], creationDate?: Date, score?: number) {
        this.creationDate = creationDate
        this.quizzSummaryElements = quizzSummaryElements
        this.score = score 
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

    get QuizzSummaryElements(): QuizzSummaryElement[] {
        return this.quizzSummaryElements
    }
  
    get Score(): number {
        return this.computeScore();
    }

    get CreationDate(): Date {
        return this.creationDate;
    }

    // Define a toString method
    toString(): string {
        const summaryElementsString = this.quizzSummaryElements
            .map(element => `Question: ${element.QuestionText}, User Answer Correct: ${element.IsAnswerCorrect}`)
            .join(', ');

        return `Quizz Summary: Date = ${this.creationDate.toISOString()}, Score = ${this.score}, Elements = [${summaryElementsString}]`;
    }
  }