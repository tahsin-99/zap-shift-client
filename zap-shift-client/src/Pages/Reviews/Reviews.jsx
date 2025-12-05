import React, { use } from 'react';
import { EffectCoverflow, Pagination ,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from '../../Components/ReviewCard';

const Reviews = ({reviewsPromise}) => {
    const reviews =use(reviewsPromise)
   
    return (
        
      <div className='my-24'>
        <div className=' text-center'>
            <h3 className=' text-3xl text-center my-8 ' >Reviews</h3>
            <p className='mb-30'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ducimus accusantium molestias nesciunt minus est, dignissimos inventore, incidunt perspiciatis necessitatibus veritatis, nihil sit consequatur. Est ea dolor eligendi pariatur vero.</p>
        </div>
         <Swiper  
       
       Swiper
       loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
            delay:1000,
            disableOnInteraction:false
        }}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: .75,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper">
            
         {
            reviews.map(review=><SwiperSlide key={review.id}>
                <ReviewCard review={review}></ReviewCard>
               </SwiperSlide> )
         }
        
        
       </Swiper>
      </div>
    );
};

export default Reviews;