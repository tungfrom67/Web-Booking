import { BannerSlider } from "@/components/banner-slider"
import { SearchBarRedesign } from "@/components/search-bar-redesign"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { SpecialOffers } from "@/components/special-offers"
import { MobileAppPromo } from "@/components/mobile-app-promo"
import { PropertyTypeFilter } from "@/components/property-type-filter"
import { FavoriteAccommodations } from "@/components/favorite-accommodations"
import { FeaturedRooms } from "@/components/featured-rooms"
import { CustomerReviewsEnhanced } from "@/components/customer-reviews-enhanced"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Search Bar */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <SearchBarRedesign />
      </div>

      {/* Property Type Filter */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <PropertyTypeFilter />
      </section>

      {/* Featured Rooms */}
      <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Phòng nổi bật</h2>
          <p className="text-gray-600 mb-6">Đặt ngay những phòng tốt nhất với giá ưu đãi</p>
          <FeaturedRooms />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Điểm đến nổi bật</h2>
        <FeaturedDestinations />
      </section>

      {/* Favorite Accommodations */}
      <section className="py-12 px-4 md:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Nhà ở mà khách yêu thích</h2>
          <FavoriteAccommodations />
        </div>
      </section>

      {/* Customer Reviews - ENHANCED */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <CustomerReviewsEnhanced />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ưu đãi đặc biệt</h2>
        <SpecialOffers />
      </section>

      {/* Mobile App Promotion */}
      <section className="py-12 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <MobileAppPromo />
        </div>
      </section>
    </div>
  )
}
