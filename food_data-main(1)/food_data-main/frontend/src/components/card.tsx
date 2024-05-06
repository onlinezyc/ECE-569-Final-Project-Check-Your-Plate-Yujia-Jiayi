export default (prop: {
  img: string
  title: string
  year: string
  director: string
  onClick?: () => void
}) => {
  return (
    <div className="start-card" onClick={prop.onClick}>
      <img src={'media/' + prop.img} className="start-card-img" />
      <button className="start-card-star  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 m-auto s"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <div className="start-card-text p-4">
        <div className="start-card-title truncate">{prop.title}</div>
        <div className="start-card-subtitle py-1 truncate">
          {prop.year}&nbsp;|&nbsp;{prop.director}
        </div>
      </div>
    </div>
  )
}
