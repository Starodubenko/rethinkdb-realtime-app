import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import timeseries from './timeseries';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));
	api.use('/timeseries', timeseries({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
