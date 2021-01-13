import Resource from "./resource";
/**
 * The Shopware SDK cart resource
 * @class
 */
export default class CartResource extends Resource {
	async getCurrentCart() {
		try {
			const res = await this.client.get("checkout/cart");
			if (res?.data?.token) {
				this.client.updateContext(res?.data?.token);
			}
			return res.data;
		} catch (error) {
			console.log("GET_CURRENT_CART_ERROR:", error);
		}
		return {};
	}
	async addProduct(productId: string, amount: Number) {
		try {
			const res = await this.client.post("checkout/cart/line-item", {
				items: [
					{
						type: "product",
						referencedId: productId,
						quantity: amount > 0 ? amount : 1,
					},
				],
			});
			//console.log("ADDED_TO_CART:", res.data);
			return res.data;
		} catch (error) {
			console.log("ADD_TO_CART_ERROR:", error);
		}
		return {};
	}
	async removeItem(lineId: string) {
		try {
			const res = await this.client.delete("checkout/cart/line-item", {
				ids: [lineId],
			});
			//console.log("ADDED_TO_CART:", res.data);
			return res.data;
		} catch (error) {
			console.log("REMOVE_FROM_CART_ERROR:", error);
		}
		return {};
	}
	async updateItem(id: string, amount: Number, productId: string) {
		try {
			const res = await this.client.patch("checkout/cart/line-item", {
				items: [
					{
						id,
						quantity: amount,
						referencedId: productId,
					},
				],
			});
			//console.log("ADDED_TO_CART:", res.data);
			return res.data;
		} catch (error) {
			console.log("REMOVE_FROM_CART_ERROR:", error);
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
			//console.log("ORDER_CREATED:", res.data);
			if (res?.data?.id) {
				const payment = await this.client.post("handle-payment", {
					orderId: res?.data?.id,
					finishUrl: "http://localhost:3000/success",
					errorUrl: "http://localhost:3000/failed",
				});
				//console.log("HANDLE_PAYMENT", payment.data);
				return { ...res.data, paymentUrl: payment.data?.redirectUrl };
			}
			return res.data;
		} catch (error) {
			console.log("FAILED_TO_CREATE_ORDER:", error);
		}
		return {};
	}
	async getPaymentMethods() {
		try {
			const res = await this.client.post("payment-method", {});
			return res.data;
		} catch (error) {
			console.log("GET_PAYMENT_METHODS_ERROR:", error);
		}
		return [];
	}
}
