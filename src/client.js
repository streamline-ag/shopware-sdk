import axios from "axios";

class Client {
	/**
	 * Primary entry point for building a new Client.
	 */
	static buildClient(accessKey, url) {
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

	constructor(axiosInstance, headers) {
		this.axios = axiosInstance;
		this.headers = headers;
		const ctx = localStorage.getItem("sw-context-token");
		if (ctx) {
			this.updateContext(ctx);
		}
	}

	async signIn(email, password) {
		try {
			console.log(document);
			const res = await this.axios.post("account/login", {
				username: email,
				password: password,
			});
			this.updateContext(res?.data?.contextToken);
			console.log("SIGN_IN:", res.data);
			return res.data;
		} catch (error) {
			console.log("FAILED_TO_SIGN_IN:", error);
			return null;
		}
	}

	async signOut() {
		this.updateContext(null);
	}

	async addToCart(productId) {
		try {
			const res = await this.axios.post(
				"checkout/cart/line-item",
				{
					items: [
						{
							type: "product",
							referencedId: productId,
							quantity: 1,
						},
					],
				},
				{
					headers: this.headers,
				}
			);
			console.log("ADDED_TO_CART:", res.data);
			return res.data;
		} catch (error) {
			console.log("USER_API_UPDATE_ERROR:", error);
			throw error;
		}
	}

	updateContext(contextToken) {
		console.log("UPDATE TOKEN", contextToken);
		localStorage.setItem("sw-context-token", contextToken);
		this.headers["sw-context-token"] = contextToken;
	}
}

export default Client;
