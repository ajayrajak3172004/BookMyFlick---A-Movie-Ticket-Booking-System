import mongoose from 'mongoose';

// Since structure unknown hai, we'll keep it flexible
const nowPlayingMovieSchema = new mongoose.Schema({}, { strict: false });

const NowPlayingMovie = mongoose.model('nowplayingmovies', nowPlayingMovieSchema);

export default NowPlayingMovie;