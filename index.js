import dotenv from 'dotenv'
import main from './bin/apiGateway.js'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` })

main()

console.log(`Env: ${process.env.NODE_ENV}`)
