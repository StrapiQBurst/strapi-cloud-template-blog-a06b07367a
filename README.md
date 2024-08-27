# 🚀 Getting started with Strapi and MySQL using Docker

This project uses Strapi with MySQL for the backend, and Docker for containerization.

## Prerequisites

- Docker & Docker Compose
- Yarn package manager

## 🐳 Start Docker for Strapi and MySQL

To spin up the containers for Strapi and MySQL, run the following command:

```bash
docker compose up
```
This will start the Strapi and MySQL containers based on the configurations in your docker-compose.yml file.

## 📦 Install Dependencies
Install all required dependencies using Yarn:
```bash
yarn install
```
## 🔑 Copy .env File
Make sure to create and copy your `.env` file into the root directory of your project. Use the following values for your `.env` file:
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=INXynmK8eMOIZPc4+FvsaQ==,fe7eqzpdg+SN4eiIkO+ZwA==,2ofau2+wQ82D+lAtcMt8JQ==,jswg3FGfs0OnK83XqyqyRA==
API_TOKEN_SALT=l04vzSIZhPtPcIDg/1ARwg==
ADMIN_JWT_SECRET=zZRAvzQosxZKFnxYT4YzIA==
TRANSFER_TOKEN_SALT=ymV8UG8NKfe/yCVvkc8fRQ==
# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=192.168.100.10
DATABASE_PORT=3306
DATABASE_NAME=strapi_poc
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_SSL=false
JWT_SECRET=vnvHUBMbsFA8NnQ2OJyalQ==
```
## 📂 Import Data from catalog.csv

To import product data from the catalog.csv file:
- Place the catalog.csv file in the root directory of your project.
- Run the following command to import the data:
```bash
node csv-import-script.js
```
This will populate the database with data from the CSV file.



## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
