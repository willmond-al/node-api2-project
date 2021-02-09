// require your server and launch it here
const server = require('./api/server')
const PORT = 3000

server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})