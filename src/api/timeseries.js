import resource from 'resource-router-middleware';
import facets from '../models/facets';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'timeseries',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		console.log(`timeseries id: ${id}`);
		let facet = facets.find( facet => facet.id===id ),
			err = facet ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		db.r.table('timeseries').run(db.conn, function(err, cursor) {
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.json(result);
			});
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		db.r.table('timeseries').insert([
			{
				timestamp: Date.now(),
				value: Math.random() * 10,
			}
		])
		.run(db.conn, function(err, result) {
			if (err) throw err;
			res.json(result.generated_keys);
		})
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});
