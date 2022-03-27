import { TokenFields } from '../models/token-fields';

export class TokenService {
	private static _tokenKey = '__token__';

	static save(token: string) {
		localStorage.setItem(this._tokenKey, token);
	}

	static get() {
		return localStorage.getItem(this._tokenKey);
	}

	static delete() {
		localStorage.removeItem(this._tokenKey);
	}

	// Discriminated Unions.
	static decode(): TokenFields | null {
		const token = this.get();
		if (!token || token.length < 1) {
			return null;
		}

		const parts = token.split('.');
		if (parts.length != 3) {
			return null;
		}

		const input = parts[1]
			.replaceAll('-', '+')
			.replaceAll('_', '/');
		
		const decoded = atob(input);
		return JSON.parse(decoded) as TokenFields;
	}
}