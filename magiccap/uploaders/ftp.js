// This code is a part of MagicCap which is a MPL-2.0 licensed project.
// Copyright (C) Jake Gealer <jake@gealer.email> 2018.
// Copyright (C) Rhys O'Kane <SunburntRock89@gmail.com> 2018.

const { post } = require("fetchain");

module.exports = {
	name: "FTP",
	icon: "FTP.png",
	config_options: {
		Hostname: {
			value: "ftp_hostname",
			type: "text",
		},
		Port: {
			value: "ftp_port",
			type: "text",
		},
		Username: {
			value: "ftp_username",
			type: "text",
		},
		Password: {
			value: "ftp_password",
			type: "text",
		},
		Directory: {
			value: "ftp_directory",
			type: "text",
		},
		Secure: {
			value: "ftp_secure",
			type: "Boolean",
		},
		Domain: {
			value: "ftp_domain",
			type: "text",
		},
	},
	upload: async(buffer, filename) => {
		const client = new (require("basic-ftp")).Client();
		await client.access({
			host: config.ftp_hostname,
			port: config.ftp_port,
			user: config.ftp_username,
			password: config.ftp_password,
			secure: config.ftp_secure,
		}).catch(() => new Error("Could not connect to FTP. Are your credentials correct?"));
		await client.ensureDir(config.ftp_directory).catch(() => new Error("FTP directory does not exist. Please create it."));
		await client.upload(buffer, `${config.ftp_directory}/${filename}.png`);
		await client.close();
		return `${config.ftp_domain}/${filename}.png`;
	},
};
