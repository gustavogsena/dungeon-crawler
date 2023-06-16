const tokenPath = 'token'

export class AuthToken {
    static get() {
        return localStorage.getItem(tokenPath)
    }

    static set(token: string) {
        return localStorage.setItem(tokenPath, token)
    }

    static remove() {
        return localStorage.removeItem(tokenPath)
    }
}