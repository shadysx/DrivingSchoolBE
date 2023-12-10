export class QuizzSummaryElement {
    private questionText: string;
    private correctAnswerIndex: number;
    private userAnswerIndex: number;
    private isAnswerCorrect: boolean;
  
    constructor(questionText: string, correctAnswerIndex: number , userAnswerIndex: number) {
      this.questionText = questionText;
			this.correctAnswerIndex = correctAnswerIndex;
  	  this.userAnswerIndex = userAnswerIndex;
      this.isAnswerCorrect = this.checkAnswerCorrectness();
		}
  
    private checkAnswerCorrectness(): boolean {
      // Assuming answer is a string that should match the correct answer's text.
      // Modify this logic as per your actual data structure.
      return this.correctAnswerIndex === this.userAnswerIndex;
    }
  
		get QuestionText(): string {
			return this.questionText;
		}

		get CorrectAnswerIndex(): number {
			return this.correctAnswerIndex;
		}

    get UserAnswerIndex(): number {
			return this.userAnswerIndex;
		}

		get IsAnswerCorrect(): boolean {
			return this.isAnswerCorrect;
		}
  }