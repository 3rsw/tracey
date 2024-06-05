
# Once off installation steps

1. Install [mongodb community edition](https://www.mongodb.com/docs/manual/administration/install-community/)

2. Create the database
`$ mongoimport -d tracey -c questions --file=./db/questions/q1/question.json`

3. Install the packages required for the backend
`$ npm ci`


# Make the project run normally for development

1. Run the database
`sudo systemctl start mongod` (for modern versions of linux)

2. Run the backend
`npm run dev`

3. Run the frontend