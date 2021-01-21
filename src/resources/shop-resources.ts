import Resource from "./resource";
/**
 * The Shopware SDK account resource
 * @class
 */
export default class ShopResource extends Resource {
	async getLanguages() {
		try {
			const res = await this.client.post("language", {});
			//console.log("GOT_LANGUAGES:", res?.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_LANGUAGES:", error);
			return [];
		}
	}
	async getSalutations() {
		try {
			const res = await this.client.post("salutation", {});
			//console.log("GOT_SALUTATIONS:", res?.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_SALUTATIONS:", error);
			return [];
		}
	}
	async getCountries() {
		try {
			const res = await this.client.post("country", {});
			//console.log("GOT_COUNTRIES:", res?.data);
			return res?.data?.elements;
		} catch (error) {
			console.log("UNABLE_TO_GET_COUNTRIES:", error);
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

	async getFooterNavigation() {
		try {
			const res = await this.client.post(
				`navigation/footer-navigation/footer-navigation`,
				{
					includes: {
						category: ["cmsPage"],
						cms_page: ["id", "name"],
					},
					associations: {
						cmsPage: {},
					},
				}
			);
			//console.log("GOT_PRODUCTS:", res.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_FOOTER_NAV:", error);
		}
		return [];
	}

	async getCMSPage(id: string) {
		try {
			const res = await this.client.getFromCMSEndpoint(`${id}`);
			//console.log("GOT_PRODUCTS:", res.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_CMS_PAGE:", error);
		}
		return "";
	}
}
