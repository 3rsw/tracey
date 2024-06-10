
# Once off installation steps

1. Install [mongodb community edition](https://www.mongodb.com/docs/manual/administration/install-community/)

2. Create the database
`$ mongoimport -d tracey -c questions --file=./db/questions/q1/question.json`

3. Install the packages required for the backend
`~/thesis_app/backend$ npm ci`

4. Install the packages required for the frontend
`~/thesis_app/frontend$ npm ci`

5. Create a .env file inside the backend folder with the contents
(this file is in the .gitignore so that if it eventually contains a password,
it doesn't get pushed accidentally)

```
MONGODB_URI=mongodb://localhost:27017/tracey
PORT=3001
```



# Make the project run normally for development

1. Run the database
`$ sudo systemctl start mongod` (for modern versions of linux)

2. Run the backend
`~/thesis_app/backend$ npm run dev`

3. Run the frontend
`~/theis_app/frontend$ npm run dev`


# Shutting down the project (development)

1. Shut down the frontend
`ctrl + c`

2. Shut down shutdown the backend
`ctrl + c`

3. Shut down the database
`$ sudo systemctl stop mongod`
