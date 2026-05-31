import axios from 'axios'
import { err } from 'inngest/types';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import NowPlayingMovie from '../models/NowPlaying.js';
import MovieCasts from '../models/MovieCasts.js'



//APi to get a Now palying movies from Rapidapi
// export const getNowPlayingMovies = async (req, res) => {

//     const options = {
//         method: 'GET',
//         url: 'https://imdb236.p.rapidapi.com/api/imdb/top250-movies',
//         headers: {
//             'x-rapidapi-key': `3c9c56af6cmshd19ef0273e1b272p1d0ad1jsn0ab3a39f15bf`,
//             'x-rapidapi-host': 'imdb236.p.rapidapi.com'
//         }
//     };

//     try {

//         const response = await axios.request(options)
//         const movies = response.data
//         // console.log(movie)
//         // // res.json({success:true,movie:movie})
//         res.json({ success: true, movies: movies })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

//Fetchin NowPlayingMovies (200) from mongodb atlash
export const getNowPlayingMovies = async (req, res) => {
    try {
        const movies = await NowPlayingMovie.find().sort({ releaseDate: -1 });
        res.json({ success: true, movies });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// //Api to add new show to the database

// export const addShow = async (req, res) => {
//     try {

//         // console.log("Request body:", req.body);
//         const { movieId, showsInput, showPrice } = req.body
//         // console.log(showsInput[0].time)


//         let movie = await Movie.findById(movieId)

//         if (!movie) {

//             //fetch movie details and credits from RapidApi
//             const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([axios.get(`https://imdb236.p.rapidapi.com/api/imdb/${movieId}`, {
//                 headers: {
//                     'x-rapidapi-key': `3c9c56af6cmshd19ef0273e1b272p1d0ad1jsn0ab3a39f15bf`,
//                     'x-rapidapi-host': 'imdb236.p.rapidapi.com'
//                 }
//             }), axios.get(`https://imdb236.p.rapidapi.com/api/imdb/${movieId}/cast`, {
//                 headers: {
//                     'x-rapidapi-key': `3c9c56af6cmshd19ef0273e1b272p1d0ad1jsn0ab3a39f15bf`,
//                     'x-rapidapi-host': 'imdb236.p.rapidapi.com'
//                 }
//             })])


//             const movieApiData = movieDetailsResponse.data
//             const moviCastData = movieCreditsResponse.data

//             const movieDetails = {
//                 _id: movieId,
//                 title: movieApiData.primaryTitle || moviCastData.originalTitle,
//                 overview: movieApiData.description,
//                 poster_path: movieApiData.primaryImage,
//                 backdrop_path: movieApiData.primaryImage,
//                 genres: movieApiData.genres,
//                 casts: moviCastData,
//                 release_date: movieApiData.releaseDate,
//                 original_language: movieApiData.spokenLanguages[0],
//                 vote_count: movieApiData.numVotes,
//                 averageRating: movieApiData.averageRating,
//                 runtime: movieApiData.runtimeMinutes,
//             }

//             const movie = await Movie.create(movieDetails)

//         }

//         const showsToCreate = [];

//         showsInput.forEach(show => {
//             const showDate = show.date


//             // Validate time is an array
//             if (!Array.isArray(show.time)) {
//                 console.error(`❌ Error: show.time is not array at index ${i}:`, show.time);
//                 return res.status(400).json({
//                     success: false,
//                     message: `Invalid time format at index ${i}`
//                 });
//             }


//             show?.time?.forEach((time) => {
//                 const dateTimeString = `${showDate}T${time}`
//                 showsToCreate.push({
//                     movie: movieId, showDateTime: new Date(dateTimeString),
//                     showPrice,
//                     occupiedSeats: {}
//                 })
//             })
//         });

//         if (showsToCreate.length > 0) {
//             await Show.insertMany(showsToCreate)
//         }
//         res.json({ success: true, message: "Show Added Successfully." })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }




export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;

        let movie = await Movie.findById(movieId);

        //  If movie not found in Movie collection
        if (!movie) {
            // 🔍 Try to get movie from nowplayingmovie collection (Atlas copy-pasted data)
            const movieApiData = await NowPlayingMovie.findOne({id:movieId});
             const movieApiCast = await MovieCasts.find({});

            if (!movieApiData) {
                return res.status(404).json({ success: false, message: "Movie not found in local database." });
            }
            
    //    console.log('hellooo')
    //    console.log("movieCast:",movieApiCast)
            // Transform the movie object according to your Movie schema
            const movieDetails = {
                _id: movieId,
                title: movieApiData.primaryTitle || movieApiData.originalTitle || movieApiData.title,
                overview: movieApiData.description || movieApiData.overview,
                poster_path: movieApiData.primaryImage || movieApiData.poster || '',
                backdrop_path: movieApiData.primaryImage || movieApiData.poster || '',
                genres: movieApiData.genres || [],
                casts: movieApiCast || [],
                trailer : movieApiData.trailer || '',
                release_date: movieApiData.releaseDate || movieApiData.released || '',
                original_language: movieApiData.spokenLanguages?.[0] || 'en',
                vote_count: movieApiData.numVotes || 0,
                averageRating: movieApiData.averageRating || 0,
                runtime: movieApiData.runtimeMinutes || 120,
            };

            //  Insert into Movie collection
            movie = await Movie.create(movieDetails);
        }

        // ✅ Prepare shows
        const showsToCreate = [];

        showsInput.forEach(show => {
            const showDate = show.date;

            if (!Array.isArray(show.time)) {
                console.error(`❌ Error: show.time is not array:`, show.time);
                return res.status(400).json({
                    success: false,
                    message: `Invalid time format`
                });
            }

            show.time.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            });
        });

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({ success: true, message: "Show Added Successfully." });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};



//Api to get all shows from the database

export const getShows = async (req, res) => {
    try {
        // const shows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1});
        const shows = await Show.find().populate('movie').sort({ showDateTime: 1 });


        // console.log(shows)
        //filter unique shows
        
        const uniqueShows = new Set(shows.map(show => show.movie))

        return res.json({ success: true, shows: Array.from(uniqueShows) })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}






//Api to get single shows from the database

export const getSingleShow = async (req, res) => {
    try {
        const { movieId } = req.params

        const show = await Show.find({movie:movieId,showDateTime:{$gte: new Date()}})
        // const show = await Show.find({ movie: movieId  })

        const movie = await Movie.findById(movieId)
        const dateTime = {};

           const movieApiCast = await MovieCasts.find({});
        

        show.forEach((show) => {
            const date = show.showDateTime.toISOString().split('T')[0];
            if (!dateTime[date]) {
                dateTime[date] = []
            }
            dateTime[date].push({ time: show.showDateTime, showId: show._id })
        })

        


        return res.json({ success: true, movie, dateTime })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}