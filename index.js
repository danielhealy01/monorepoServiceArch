import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` })

console.log(process.env.TEST)
