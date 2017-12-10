import { timeseriesSocketsInit } from './timeseries'

export default (db, sockets) => {
    let socketList = [];
    sockets.on('connection', newSocket => {
        socketList.push(newSocket);
    })
    timeseriesSocketsInit(db, socketList);
}