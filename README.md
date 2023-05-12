# TON Dashboard PWA  based on [Next.js](https://nextjs.org/) + [React](https://react.dev/) 

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 

This is a simple PWA designed to display historycal data of TON Cryptocurreny. Here you can review following data:

- Ton price
- Trading volume
- Amount of transactions per second
- Total amount of transactions

Data can be viewed at different scales: **day**, **week**, **month**, **year**.

## Run locally

First, You need to install all dependencies before runnning the application:

```bash
npm install
# or
yarn
```

After successfully installing all dependencies run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To build this app, run the following command
```bash
npm run build
# or
yarn build
```

To check builded version of application,  run the following command
```bash
npm run start
# or
yarn start
```

> **Note:**  Don't forget to change the API_URL in the **.env** file before deploying the application. This is necessary for the internal API routes to work correctly.

