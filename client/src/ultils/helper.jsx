import icons from './icons'

const { MdStar, MdStarOutline } = icons

export const createSlug = string => string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('-')

export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()

export const renderStarFromNumber = (number) => {
    if (!Number(number)) return
    const stars = []
    for (let i = 0; i < +number; i++) stars.push(<MdStar color='orange'/>)
    for (let i = 5; i > +number; i--) stars.push(<MdStarOutline color='orange'/>)
    return stars
}

export function secondToHms(d){
    d = Number(d)/1000
    const h = Math.floor(d/3600)
    const m = Math.floor(d%3600/60)
    const s = Math.floor(d%3600%60)
    return ({h,m,s})
}

export const validate = (payload, setInvalidFields) =>{
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for(let arr of formatPayload){
        if(arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev=>[...prev,{name: arr[0], mes: 'Required this field!'}])
        }
    }
    for(let arr of formatPayload){
        switch (arr[0]) {
            case 'email':
                const regex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
                if(arr[1].match(regex)){
                    invalids++
                    setInvalidFields(prev=>[...prev,{name: arr[0], mes: 'Invalid email!'}])
                }
                break;
            case 'password':
                if(arr[1].length<6){
                    invalids++
                    setInvalidFields(prev=>[...prev,{name: arr[0], mes: 'Password has to be more than 6 characters!'}])
                }
                break;
            default:
                break;
        }
    }

    return invalids
}

export const formatPrice = number => Math.round(number/1000)*1000