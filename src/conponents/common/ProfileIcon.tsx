export const ProfilePicture = ({ url, name }: any) => {
  console.log(url)
  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-full bg-orange-100 aspect-square overflow-hidden">
        <p className=' text-sm font-medium'>{name?.charAt(0)}</p>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${url}`}
        alt={name}
      />
    </div>
  )
}