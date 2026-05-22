### npm init --y
### npm i -D typescript
### npx tsc --init

### npm install -D @types/node

### npm i express
### npm i --save-dev @types/express

### tsconfig.js:
* uncomment: 
"rootDir": "./src",
"outDir": "./dist",
"lib": ["esnext"],
"types": ["node"],

* comment:
// "types": [],
// "jsx": "react-jsx",

* create src folder and into it create server.ts
* create .env and .gitignore file at root.
* into .gitignore add: .env, dist, node_modules

### npm i -D tsx
### package.json file: 
* into scripts, add: "dev": "tsx watch ./src/server.ts",

### npm i pg
### npm i --save-dev @types/pg

### npm i dotenv
### npm i -D @types/dotenv

### npm i jsonwebtoken
### npm i -D @types/jsonwebtoken

### npm i http-status-codes

### npm i cookie-parser
### npm i -D @types/cookie-parser

### npm i cors
### npm i -D @types/cors

### npm i bcrypt
### npm i -D @types/bcrypt

### at package.json into scripts add:
* "build":"tsc",


## vercel 
### check vercel is globally installed or not : 
* vercel --version
* if not then install globally
###  npm install -g vercel (globally installed)