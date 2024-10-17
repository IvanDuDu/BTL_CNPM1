### Env Variables

Create a .env file in then root and add the following 
đoạn này t đã viết sẵn vào trong code để có thể chạy luôn nên không cần set up nữa 
Tuy nhiên khi connect với mongoDB thì nhớ vào \backend\config\db.js và link connect theo link mongo trên máy của mình
```
NODE_ENV = development
PORT = 3000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

ankit@example.com (Customer)
123456

```
