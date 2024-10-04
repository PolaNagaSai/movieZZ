import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-2 my-4 hidden lg:block">
        <div className="flex gap-3 items-center justify-center">
          <Link to='/' >About</Link>
          <Link to='/'>Contact</Link>
        </div>
    </footer>
  )
}

export default Footer