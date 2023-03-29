'use strict'

const {Server} = require("./socket/serve")

function main(){
  const serve = new Server(7980)
  serve.listen()
}

main()