import Resource from "./resource";
/**
 * The Shopware SDK cart resource
 * @class
 */
export default class ProductResource extends Resource {
	async getProducts() {
		try {
			const res = await this.client.post("product", {});
			console.log("GOT_PRODUCTS:", res.data);
			return res?.data?.elements;
		} catch (error) {
			console.log("UNABLE_TO_GET_PRODUCTS:", error);
		}
		return [];
	}

	async getProductsIncludeFields(fields: String[] = ["id", "name"]) {
		try {
			const res = await this.client.post("product", {
				includes: {
					product: fields,
				},
			});
			console.log("GOT_PRODUCTS:", res.data);
			return res.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_PRODUCTS:", error);
		}
		return [];
	}
}
