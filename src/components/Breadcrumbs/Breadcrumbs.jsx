import { useHref, Link } from 'react-router-dom'

const Breadcrumbs = () => {
    const href = useHref()
    const breadcrums = href.split('/').filter(location => location)
    return (
        <div>
            {breadcrums.map((location, index) => (
                <Link to={location} key={index}>{location && location + '/'}</Link>
            ))}
        </div>
    )
}

export default Breadcrumbs