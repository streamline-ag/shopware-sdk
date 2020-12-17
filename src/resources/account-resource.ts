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
}
