import Resource from "./resource";
/**
 * The Shopware SDK account resource
 * @class
 */
interface ChangeProfileProps {
	salutationId: string;
	firstName: string;
	lastName: string;
}
interface ChangeEMailProps {
	email: string;
	emailConfirmation: string;
	password: string;
}
interface ChangePasswordProps {
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
}
interface AddressProps {
	id: string;
	customerId: string;
	countryId: string;
	countryStateId?: string;
	salutationId: string;
	firstName: string;
	lastName: string;
	zipcode: string;
	city: string;
	company?: string;
	street: string;
	department?: string;
	title?: string;
	vatId?: string;
	phoneNumber?: string;
	additionalAddressLine1?: string;
	additionalAddressLine2?: string;
	customFields?: any;
}
export default class AccountResource extends Resource {
	changeProfile(props: ChangeProfileProps) {
		throw new Error("Not Implemented");
	}
	changeEMail(props: ChangeEMailProps) {
		throw new Error("Not Implemented");
	}
	changePassword(props: ChangePasswordProps) {
		throw new Error("Not Implemented");
	}
	async getCurrentCustomer() {
		try {
			const res = await this.client.post("account/customer", {});
			console.log("GOT_CUSTOMER:", res?.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_CUSTOMER:", error);
		}
		return null;
	}
	async createAddress(): Promise<[Error | null, Array<any>]> {
		throw new Error("Not Implemented");
	}
	async setDefaultBillingAddress() {
		throw new Error("Not Implemented");
	}
	async setDefaultShippingAddress() {
		throw new Error("Not Implemented");
	}
	async deleteAddress(id: string): Promise<[Error | null, Array<any>]> {
		try {
			const res = await this.client.delete(`account/address/${id}`);
			console.log("DELETED_ADDRESS:", res?.data);
			return [null, await this.getAddresses()];
		} catch (error) {
			console.log("UNABLE_TO_DELETED_ADDRESS:", error);
			return [error, await this.getAddresses()];
		}
	}
	async updateAddress(
		props: AddressProps
	): Promise<[Error | null, Array<any>]> {
		try {
			const res = await this.client.patch(`account/address/${props.id}`, props);
			//console.log("UPDATED_ADDRESS:", res?.data);
			return [null, await this.getAddresses()];
		} catch (error) {
			console.log("UNABLE_TO_UPDATE_ADDRESS:", error);
			return [error, await this.getAddresses()];
		}
	}
	async getAddresses(): Promise<Array<any>> {
		try {
			const res = await this.client.post("account/list-address", {});
			//console.log("GOT_ADDRESSES:", res?.data);
			return res?.data;
		} catch (error) {
			console.log("UNABLE_TO_GET_ADDRESSES:", error);
		}
		return [];
	}
}
