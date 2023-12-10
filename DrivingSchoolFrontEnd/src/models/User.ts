export class User {
    private _email: string;
    private _userName: string;
  
    constructor(email: string, userName: string) {
        this._email = email;
        this._userName = userName;
	}
  
    get email(): string {
        return this._email;
    }

    get userName(): string {
        return this._userName;
    }
  }