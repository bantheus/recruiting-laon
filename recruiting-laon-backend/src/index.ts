import createServer from "./infrastructure/server";

const start = async () => {
	const server = await createServer();

	try {
		await server.listen({ port: 3001 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
