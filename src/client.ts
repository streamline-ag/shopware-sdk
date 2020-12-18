import axios, { AxiosInstance } from "axios";
import CartResource from "./resources/cart-resource";
import AccountResource from "./resources/account-resource";
import ProductResource from "./resources/product-resource";

class Client {
	headers: any;
	axios: AxiosInstance;
	cart: CartResource;
	account: AccountResource;
	product: ProductResource;
	/**
	 * Primary entry point for building a new Client.
	 */
	static buildClient(accessKey: string, url: string) {
		if (!accessKey || !url) {
			throw Error("Shopware Client Requires an accessKey and url");
		}
		const headers = {
			"sw-access-key": accessKey, // From Shopware
			"Content-Type": "application/json",
		};

		const axiosInstance = axios.create({
			baseURL: url,
			timeout: 10000,
			headers: headers,
		});
		const client = new Client(axiosInstance, headers);
		return client;
	}

	constructor(axiosInstance: AxiosInstance, headers: any) {
		this.axios = axiosInstance;
		this.headers = headers;
		const ctx = localStorage.getItem("sw-context-token");
		if (ctx) {
			this.updateContext(ctx);
		}
		const lang = localStorage.getItem("sw-language-id");
		if (lang) {
			this.updateLanguage(lang);
		}
		this.cart = new CartResource(this);
		this.account = new AccountResource(this);
		this.product = new ProductResource(this);
	}

	async signIn(email: string, password: string) {
		try {
			console.log(document);
			const res = await this.post("account/login", {
				username: email,
				password: password,
			});
			this.updateContext(res?.data?.contextToken);
			//console.log("SIGN_IN:", res.data);
			return res.data;
		} catch (error) {
			console.log("FAILED_TO_SIGN_IN:", error);
			return null;
		}
	}

	async signOut() {
		this.updateContext("");
	}

	async post(endpoint: string, body: any) {
		return await this.axios.post(endpoint, body, {
			headers: this.headers,
		});
	}
	async patch(endpoint: string, body: any) {
		return await this.axios.patch(endpoint, body, {
			headers: this.headers,
		});
	}
	async delete(endpoint: string) {
		return await this.axios.delete(endpoint, {
			headers: this.headers,
		});
	}

	//https://docs.shopware.com/en/shopware-platform-dev-en/admin-api-guide/reading-entities#language-header
	updateLanguage(languageId: string) {
		console.log("UPDATE LANGUAGE", languageId);
		localStorage.setItem("sw-language-id", languageId);
		this.headers["sw-language-id"] = languageId;
	}

	updateContext(contextToken: string) {
		console.log("UPDATE TOKEN", contextToken);
		localStorage.setItem("sw-context-token", contextToken);
		this.headers["sw-context-token"] = contextToken;
	}
}

export default Client;
