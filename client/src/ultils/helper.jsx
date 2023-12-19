import icons from './icons'

const { MdStar, MdStarOutline } = icons

export const createSlug = string => string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('-')

export const formatMoney = number => Number(number.toFixed(1)).toLocaleString()

export const renderStarFromNumber = (number) => {
    if (!Number(number)) return
    const stars = []
    for (let i = 0; i < +number; i++) stars.push(<MdStar color='orange'/>)
    for (let i = 5; i > +number; i--) stars.push(<MdStarOutline color='orange'/>)
    return stars
}