# Upload file using MinIO and HonoJS

This project demonstrates how to upload files using MinIO and HonoJS, utilizing the Node.js adapter and the AWS SDK to interact with the MinIO storage AWS S3 simulator.

MinIO is an open-source object storage server that is compatible with the Amazon S3 API. It provides a simple and scalable solution for storing and retrieving large amounts of data.

## Getting Started

To run this project, follow these steps:

1. Clone the repository: `git clone https://github.com/marciofrancalima/upload-file-hono.git`
2. Install dependencies: `npm install`
3. Access the MinIO console by opening a web browser and navigating to `http://localhost:9001/login`. Once you have access to the MinIO console, create a bucket named `my-bucket`. Create the access key and secret key and set them in the `.env` file.
4. Rename the `.env-example` file to `.env` and set the appropriate values for the variables based on your local environment.
5. Start the application:

- Option 1: Run `npm run dev` to start the application normally.
- Option 2: Run *debug* to start the application with debug mode enabled.

## Debugging with VS Code

To configure a launch VS Code debugger for this project, follow these steps:

1. Open the project in VS Code.
2. Click on the Debug icon in the sidebar.
3. Click on the gear icon to create a `launch.json` file.
4. Select "Node.js" as the environment.
5. Update the `program` field in `launch.json` to point to the entry file of your application (`src/index.ts`).
6. Add any necessary configurations, such as environment variables or arguments.
7. Save `launch.json`.
8. Set breakpoints in your code.
9. Click on the green play button to start debugging (or press F5).

### Example launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "debug"],
      "program": "${workspaceFolder}/src/index.ts",
      "outFiles": ["${workspaceFolder}/**/*.js"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Stack

This project utilizes the following technologies:

- [Node.js Adapter](https://github.com/honojs/node-server): This adapter allows you to run your Hono application on Node.js.
- [Hono](https://hono.dev): Web application framework.
- [MinIO](https://min.io): An open-source object storage server that is compatible with the Amazon S3 API.
- [AWS SDK v3](https://aws.amazon.com/sdk-for-javascript/): The AWS SDK is used to interact with the MinIO storage AWS S3 simulator, which simulates the AWS S3 service.
- [Drizzle ORM](https://orm.drizzle.team): A lightweight and intuitive ORM for TypeScript.

## Create a JWT token

Create a token on the [jwt.io](https://jwt.io) using the secret key (JWT_SECRET) defined in the `.env` file. Use this token to http requests that require authentication.

---

Made with ♥ by Márcio F. Lima. [Contact me](https://www.linkedin.com/in/m%C3%A1rcio-fran%C3%A7a-lima-916454187/)
