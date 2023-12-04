export class QuestionSummary {
    private _questionText: string;
    private _correctAnswerIndex: number;
    private _userAnswerIndex: number;
    private _isAnswerCorrect: boolean;
  
    constructor(questionText: string, correctAnswerIndex: number , userAnswerIndex: number) {
      this._questionText = questionText;
			this._correctAnswerIndex = correctAnswerIndex;
  	  this._userAnswerIndex = userAnswerIndex;
      this._isAnswerCorrect = this.checkAnswerCorrectness();
		}
  
    private checkAnswerCorrectness(): boolean {
      // Assuming answer is a string that should match the correct answer's text.
      // Modify this logic as per your actual data structure.
      return this._correctAnswerIndex === this._userAnswerIndex;
    }
  
		get questionText(): string {
			return this._questionText;
		}

		get isAnswerCorrect(): boolean {
			return this._isAnswerCorrect;
		}
  }