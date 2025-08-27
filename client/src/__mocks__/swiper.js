// __mocks__/swiper.js
export const Swiper = ({ children }) => <div>{children}
<div className="swiper-button-next"></div>
<div className="swiper-button-prev"></div>
</div>;
export const SwiperSlide = ({ children }) => <div>{children}</div>;
export const Navigation = () => <div>Mock Navigation</div>;
export default { Swiper, SwiperSlide, Navigation };