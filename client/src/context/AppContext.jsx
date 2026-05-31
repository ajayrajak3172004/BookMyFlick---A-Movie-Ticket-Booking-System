import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env.VITE_BASE_URL)

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [isAdmin, setisAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()

    const navigate = useNavigate()
    
    const fetchIsAdmin = async() => {
        
        if (!user || !user.id) return;
        try {
             const token = await getToken();
            
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/is-admin`, { headers: { Authorization: `Bearer ${token}`,'userId':user.id } })
            setisAdmin(data.isAdmin)
            //  console.log(data.isAdmin)
            //   console.log(user)
            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                // alert('you are not authorized to admin dashboard')
                toast.error('you are not authorized to admin dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchShows = async () => {
        try {
            // console.log(user)
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/show/all`)
            if (data.success) {
                setShows(data.shows)
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }



    const fetchfavoriteMovies = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/favorites`, { headers: { Authorization: `Bearer ${await getToken()}`,'userId':user.id } })
            if (data.success) {
                setFavoriteMovies(data.movies)
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (user) {
            fetchIsAdmin()
            fetchfavoriteMovies()
        }
    }, [user])

    useEffect(() => {
        fetchShows()
    }, [])

    useEffect(() => {
        if (user) {
            fetchIsAdmin()
        }
    }, [])

    const setShowsBySearch = (inputVal)=>{
         if (inputVal.trim() === '') {
    fetchShows(); // show all if input is empty (e.g. after backspace)
  } else {
    const result = shows.filter((show) =>
      show.title.toLowerCase().includes(inputVal.toLowerCase()) ||
      show.genres.some((genre) =>
        genre.toLowerCase().includes(inputVal.toLowerCase())
      )
    );
    setShows(result);
  }
        
    }

    const value = {axios,user,getToken,navigate,favoriteMovies, isAdmin,shows,fetchIsAdmin,fetchShows, setShowsBySearch,fetchfavoriteMovies}

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)