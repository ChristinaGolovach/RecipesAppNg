export class User {
    constructor(
        public email: string,
        public id: string,
        private tokenValue: string,
        private tokenExpirationDate: Date
    ) {}

    get token() : string {
        if (!this.tokenValue || new Date() > this.tokenExpirationDate) {
            return null;
        }

        return this.tokenValue;
    }
}