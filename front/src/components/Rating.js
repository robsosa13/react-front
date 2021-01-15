import React from 'react'
//import { faStar } from '@fortawesome/free-solid-svg-icons' //no-outline

//import { faStar  } from '@fortawesome/free-solid-svg-icons' //outline


const Rating = ({value,text}) => {
    return (
        <div className='rating'>
                <span>
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    */}
                    <i 
                    className={value>=1 
                    ?'fas fa-star':value>=0.5?
                    'fas fa-star-half-alt'
                    :'far fa-star'}>*</i>
                </span>
                <span>
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    */}
                    <i 
                    className={value>=2 
                    ?'fas fa-star':value>=1.5?
                    'fas fa-star-half-alt'
                    :'far fa-star'}>*</i>
                </span>
                <span>
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    */}
                    <i 
                    className={value>=3
                    ?'fas fa-star':value>=2.5?
                    'fas fa-star-half-alt'
                    :'far fa-star'}>*</i>
                </span>
                <span>
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    */}
                    <i 
                    
                    className={value>=4 
                    ?'fas fa-star':value>=3.5?
                    'fas fa-star-half-alt'
                    :'far fa-star'}>*</i>
                </span>
                <span>
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    */}
                    <i 
                    className={value>=5 
                    ?'fas fa-star':value>=4.5?
                    'fas fa-star-half-alt'
                    :'far fa-star'}>*</i>
                </span>
                <span>{text &&  text }</span>
            
        </div>
    )
}

export default Rating
