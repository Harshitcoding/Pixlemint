require("dotenv").config();
const app = require('./app');
const PORT = process.env.FRONTEND_URL || 3000 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})