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
	async getMainNavigation() {
		try {
			const res = await this.client.post(
				`navigation/main-navigation/main-navigation`,
				{
					includes: {
						category: [
							"id",
							"name",
							"breadcrumb",
							"media",
							"products",
							"seoUrls",
						],
						media: ["url"],
						product: ["id", "name", "seoUrls"],
						seo_url: ["seoPathInfo"],
					},

					associations: {
						products: {
							associations: {
								seoUrls: {},
							},
						},
						seoUrls: {},
					},
				}
			);
			//console.log("GOT_PRODUCTS:", res.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_NAV:", error);
		}
		return [];
	}
}
