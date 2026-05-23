import { app } from "./app.js"
import { envVars } from "./configs/env.js";
import { initDB } from "./db/index.js"

const main=async()=>{
    await initDB();
    app.listen(envVars.PORT, ()=>{
        console.log(`Server is running on the port ${envVars.PORT}`)
    })
}
main()