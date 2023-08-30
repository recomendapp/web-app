function YoutubeEmbed ({ embedId } : { embedId: string} ) {
  return (
    <div className="video-responsive">
        <iframe
          className="w-full h-[50vh]"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
    </div>
  )
}

export default YoutubeEmbed;