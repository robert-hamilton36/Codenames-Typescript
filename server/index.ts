import server from './server'
import ioServer from './socketIo'

const PORT = process.env.PORT || 3000

const serverObj = server.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})

ioServer(serverObj)
