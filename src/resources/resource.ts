import Client from "../client";

export default class Resource {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}
}
