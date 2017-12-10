export const timeseriesSocketsInit = (db, socketList) => {
    db.r.table('timeseries')
    .changes()
    .run(db.conn)
    .then(cursor => cursor.each((err, changeItem) => {
        socketList.forEach(socket => socket.emit('newTimeseriesValue', changeItem));
    }))
}