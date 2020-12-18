import Resource from "./resource";
/**
 * The Shopware SDK account resource
 * @class
 */
export default class ShopResource extends Resource {
	async getLanguages() {
		try {
			const res = await this.client.post("language", {});
			console.log("GOT_LANGUAGES:", res?.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_CUSTOMER:", error);
			return [];
		}
	}
}
