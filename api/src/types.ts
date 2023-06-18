export class BaseResponse {
    successIndicator: boolean;
    message: string;
    constructor(indicator: boolean, message: string) {
        this.successIndicator = indicator
        this.message = message
    }
}

export class UserLoginResponse extends BaseResponse {
    user?: UserInput
    error?: LoginError
    constructor( user: UserInput, indicator: boolean, message: string, er?: LoginError) {
        super(indicator, message)
        this.user = user
        this.error = er
    }
}

export type UserInput = {
    email?: string;
    username?: string;
    password?: string;
}

export enum LoginError{
    PASS_NO_MATCH = 1,
    USER_NOT_FOUND
}