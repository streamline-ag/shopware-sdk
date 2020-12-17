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
		}
		return {};
	}
	async order() {
		try {
			const res = await this.client.post("checkout/order", {
				includes: {
					order: ["orderNumber", "price", "lineItems", "id"],
					order_line_item: ["label", "price"],
				},
			});
			console.log("ORDER_CREATED:", res.data);
			if (res?.data?.id) {
				const payment = await this.client.post("handle-payment", {
					orderId: res?.data?.id,
					finishUrl: "http://localhost:3000/success",
					errorUrl: "http://localhost:3000/failed",
				});
				console.log("HANDLE_PAYMENT", payment.data);
				return { ...res.data, paymentUrl: payment.data?.redirectUrl };
			}
			return res.data;
		} catch (error) {
			console.log("FAILED_TO_CREATE_ORDER:", error);
		}
		return {};
	}
}
