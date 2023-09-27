export function GuidelistHeader ({ data } : { data?: any[] }) {

    const randomBackdrop = (object: any[]) => {
      const itemsWithBackdrop = object.filter((item: any) => item.item.film.backdrop_path); 
      
      if (itemsWithBackdrop.length === 0)
        return null;
  
      const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
      return (itemsWithBackdrop[randomIndex].item.film.backdrop_path);
    }
  
    return (
      <div
        style={{
          backgroundImage: `${data ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"}`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${data ? 'top' : 'center'}`,
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        <div className="w-full h-full flex flex-col justify-center p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
          <h2 className='text-6xl font-bold text-accent-1'>
            GUIDELIST
          </h2>
          <p className='text-muted-foreground'>{data?.length ? data.length : '0'} film{data && data?.length > 1 && 's'}</p>
        </div>
      </div>
    )
}