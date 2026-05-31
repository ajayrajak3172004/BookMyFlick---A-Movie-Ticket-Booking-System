 <div className='w-[85%] mr-5 h-auto  flex  justify-evenly items-center py-4 border-t border-red-500  overflow-auto hide-scrollbar'>


          {
            NowPlayingMovies.map((movie, i) => (
              <div key={i} onClick={() => { setSelectedMovie(movie) }} className={` w-[10rem]  mx-2 cursor-pointer  flex justify-center    bg-blue-500/20   rounded-2xl  transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                <div className=' relative  w-[12rem]     text-white flex flex-col '>
                  <img src={movie.poster_path} className='w-full    object-cover cursor-pointer rounded-t-2xl'></img>


                  <div className='absolute w-full  flex flex-col justify-between h-[86%]'>


                    <div className=' flex justify-between items-end w-full py-3 rounded-t-2xl   px-3'>

                      {
                        <IoCheckbox size={20} className={`${movie?.id == selectedMovie?.id ? 'block' : 'hidden'}  text-blue-500`} />
                      }

                    </div>

                    <div className=' flex justify-between items-end w-full py-3  bg-black/40  px-3'>
                      <span className='flex justify-center text-sm font-bold items-center'>
                        <MdOutlineStar size={20} className='text-blue-700' />
                        <h2>{movie.vote_average.toFixed(1)}</h2>
                      </span>

                      <h1 className=' text-sm'> {movie.vote_count >= 1000 ? (movie.vote_count / 1000).toFixed(1) + 'K' : movie.vote_count} voters</h1>


                    </div>

                  </div>

                  <h1 className=' text-[1rem] font-bold px-3  text-bold'>{movie.title.length > 18 ? movie.title.slice(0, 18) + ". . ." : movie.title}</h1>

                  <span className='text-[0.8rem] font-bold text-gray-400 px-3  '>{movie.release_date}</span>
                </div>




              </div>
            ))
          }


        </div>


{/*  <div className='w-full bg-amber-200 p-5 flex flex-col gap-2'>
          <h1 className='font-bold'>Show Price</h1>
          <span className='border w-[30%] px-1 py-1 flex justify-center items-center rounded-2xl'>
            $ <input type='number' min={0} value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder='Enter show price' className='w-full border-none focus:outline-none rounded-2xl px-2 h-10'>
            </input></span>

        </div>*/}