import mongoose from 'mongoose';

// Since structure unknown hai, we'll keep it flexible
const MovieCastsSchema = new mongoose.Schema({}, { strict: false });

const MovieCasts = mongoose.model('MovieCasts', MovieCastsSchema, 'MovieCasts');


export default MovieCasts;