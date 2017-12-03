import r from 'rethinkdb';

export default callback => {
	r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
		if(err) throw err;
		callback({ r, conn });
	});
}
