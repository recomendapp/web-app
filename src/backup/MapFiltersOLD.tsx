import { useState, useEffect, useContext, useRef, use } from 'react';

// LIB
import { getGenreList } from '@/hooks/tmdb';

// STYLES
import styles from './MapFilters.module.css'

// ICON
import { AiOutlineReload } from 'react-icons/ai'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useUser } from '@/context/user';
import { Button } from '@/components/ui/button';
import { ChevronRight, RotateCw } from 'lucide-react';



export default function MapFilters(props: any) {
    const { user } = useUser()
    const { defaultMovieDatabase, onChange, closePopupMovie, map} = props;
    const [ genreList, setGenreList ] = useState<any[]>([]);
    const [ activeGenres, setActiveGenres ] = useState<Record<string, boolean>>({});
    const genreFiltersRef = useRef<HTMLDivElement>(null); 
    const [ scrollLeft, setScrollLeft ] = useState(0);

    

    // INIT LIST OF GENRES
    useEffect(() => {
        getGenreList(user ? user.language : 'fr-FR')
            .then((response) => {
                setGenreList(response.map(genre => {
                    return {
                        name: genre.name,
                        enabled: false
                    }
                }))
            })
            .catch((error) => console.log(error))
    }, [user])

    // Update Movie Database when selected genres change
    useEffect(() => {
        if (Object.keys(activeGenres).length) {
            map.setFilter('markers-layer', ['in', ['get', 'Genre'], ['literal', Object.keys(activeGenres)]]);
            
        } else {
            map && map.setFilter('markers-layer', null);
        }

    }, [activeGenres])

    function handleGenreClick(genre: string | number) {
        const newActiveGenres = {...activeGenres};
        if (newActiveGenres[genre]) {
          delete newActiveGenres[genre];
        } else {
          newActiveGenres[genre] = true;
        }
        setActiveGenres(newActiveGenres);
    }

    function resetFilters() {
        setActiveGenres({});
        setGenreList(genreList.map(genre => {
            return {
            name: genre.name,
            enabled: false
            }
        }))
    }

    const handleFiltersScroll = (scrollOffset: number) => {
        if (genreFiltersRef.current) {
            genreFiltersRef.current.scrollBy({
              left: scrollOffset,
              behavior: "smooth",
            });
            
          }
    };

    const updateScrollLeft = () => {
        if (genreFiltersRef.current) {
            setScrollLeft(genreFiltersRef.current?.scrollLeft)
        }
    };

    useEffect(() => {
        console.log(activeGenres)
    }, [activeGenres])
    return (
        <div className={styles.container}>
            {/* CLEAR GENRES */}
            <Button 
                onClick={() => {
                    closePopupMovie()
                    resetFilters()
                    
                }}
                variant={Object.keys(activeGenres).length === 0 ? "secondary" : "default"}
                className='rounded-full'
                // className={styles.resetButton}
                disabled={Object.keys(activeGenres).length === 0 ? true : false}
            >
                <RotateCw />
            </Button>
            <div className={styles.genresContainer}>
                <div className={styles.genreList}  ref={genreFiltersRef} onScroll={() => updateScrollLeft()}>
                    {/* ALL GENRES */}
                    {genreList.map((genre) => (
                        <Button 
                            key={genre.id}
                            id={genre.id}
                            onClick={() => {
                                genre.enabled = !genre.enabled;
                                closePopupMovie()
                                handleGenreClick(genre.name);
                                
                            }}
                            variant={genre.enabled ? "default" : "secondary"}
                            className='rounded-full'
                        >
                            {genre.name}
                        </Button>
                    ))}
                </div>
                {/* SCROLL BUTTON */}
                {genreFiltersRef.current && (
                    <>
                        {scrollLeft > 0 && (
                            <div onClick={() => handleFiltersScroll(-200)} className={styles.scrollLeftButton}>
                                <MdKeyboardArrowLeft size={15} />
                            </div>
                        )}
                        {scrollLeft < ((genreFiltersRef.current.scrollWidth - genreFiltersRef.current.clientWidth)) && (
                            <div onClick={() => handleFiltersScroll(200)} className={styles.scrollRightButton}>
                                <MdKeyboardArrowRight size={15} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}