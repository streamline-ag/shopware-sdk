import Resource from "./resource";
/**
 * The Shopware SDK cart resource
 * @class
 */
export default class CartResource extends Resource {
	async addProduct(productId: string) {
		try {
			const res = await this.client.post("checkout/cart/line-item", {
				items: [
					{
						type: "product",
						referencedId: productId,
						quantity: 1,
					},
				],
			});
			console.log("ADDED_TO_CART:", res.data);
			return res.data;
		} catch (error) {
			console.log("USER_API_UPDATE_ERROR:", error);
			throw error;
		}
	}
}
