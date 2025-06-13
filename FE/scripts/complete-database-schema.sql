-- =====================================================
-- HOTEL BOOKING SYSTEM - COMPLETE DATABASE SCHEMA
-- =====================================================

-- =====================================================
-- 1. QUẢN LÝ NGƯỜI DÙNG
-- =====================================================

-- Bảng người dùng (mở rộng từ Laravel's users table)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    date_of_birth DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    nationality VARCHAR(100) NULL,
    address TEXT NULL,
    avatar VARCHAR(255) NULL,
    user_type ENUM('admin', 'manager', 'staff', 'customer', 'partner') DEFAULT 'customer',
    status ENUM('active', 'inactive', 'suspended', 'banned') DEFAULT 'active',
    is_vip BOOLEAN DEFAULT FALSE,
    language VARCHAR(10) DEFAULT 'vi',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    last_login_at TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_user_type (user_type),
    INDEX idx_status (status)
);

-- Bảng quyền hạn
CREATE TABLE permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    module VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_module (module),
    INDEX idx_slug (slug)
);

-- Bảng vai trò
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug)
);

-- Bảng liên kết vai trò và quyền hạn
CREATE TABLE role_permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    granted_by BIGINT UNSIGNED NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_role_permission (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Bảng liên kết người dùng và vai trò
CREATE TABLE user_roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    assigned_by BIGINT UNSIGNED NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    UNIQUE KEY unique_user_role (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Bảng quyền hạn trực tiếp của người dùng
CREATE TABLE user_permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    granted_by BIGINT UNSIGNED NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    UNIQUE KEY unique_user_permission (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Bảng chương trình loyalty
CREATE TABLE loyalty_programs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier_name VARCHAR(100) NOT NULL,
    min_points INT NOT NULL DEFAULT 0,
    max_points INT NULL,
    benefits JSON NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    point_multiplier DECIMAL(3,2) DEFAULT 1.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng loyalty của người dùng
CREATE TABLE user_loyalty (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    program_id BIGINT UNSIGNED NOT NULL,
    current_points INT NOT NULL DEFAULT 0,
    total_earned_points INT NOT NULL DEFAULT 0,
    tier_achieved_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_user_program (user_id, program_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES loyalty_programs(id) ON DELETE CASCADE
);

-- Bảng giao dịch loyalty points
CREATE TABLE loyalty_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    program_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NULL,
    transaction_type ENUM('earn', 'redeem', 'expire', 'adjust') NOT NULL,
    points INT NOT NULL,
    description TEXT NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES loyalty_programs(id) ON DELETE CASCADE,
    INDEX idx_user_type (user_id, transaction_type),
    INDEX idx_expires (expires_at)
);

-- =====================================================
-- 2. QUẢN LÝ ĐỊA ĐIỂM
-- =====================================================

-- Bảng quốc gia
CREATE TABLE countries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    currency VARCHAR(10) NOT NULL DEFAULT 'VND',
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    flag_url VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_active (is_active)
);

-- Bảng thành phố
CREATE TABLE cities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(255) NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_country_slug (country_id, slug),
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active)
);

-- Bảng khu vực
CREATE TABLE areas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_city_slug (city_id, slug),
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    INDEX idx_active (is_active)
);

-- =====================================================
-- 3. QUẢN LÝ KHÁCH SẠN
-- =====================================================

-- Bảng phân loại khách sạn
CREATE TABLE hotel_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(255) NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- Bảng tiện nghi
CREATE TABLE amenities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(255) NULL,
    category ENUM('hotel', 'room', 'both') NOT NULL DEFAULT 'both',
    type ENUM('basic', 'premium', 'luxury') DEFAULT 'basic',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_type (type),
    INDEX idx_active (is_active)
);

-- Bảng khách sạn
CREATE TABLE hotels (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id BIGINT UNSIGNED NOT NULL,
    area_id BIGINT UNSIGNED NOT NULL,
    owner_id BIGINT UNSIGNED NULL,
    type ENUM('hotel', 'resort', 'apartment', 'villa', 'hostel', 'guesthouse', 'motel') NOT NULL,
    address TEXT NOT NULL,
    description TEXT NULL,
    short_description VARCHAR(500) NULL,
    star_rating DECIMAL(2, 1) NULL,
    review_rating DECIMAL(2, 1) NULL DEFAULT 0,
    review_count INT DEFAULT 0,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(255) NULL,
    website VARCHAR(255) NULL,
    check_in_time TIME DEFAULT '14:00:00',
    check_out_time TIME DEFAULT '12:00:00',
    total_rooms INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'pending',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES hotel_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_type (type),
    INDEX idx_featured (is_featured),
    INDEX idx_status (status),
    INDEX idx_rating (review_rating),
    INDEX idx_location (latitude, longitude)
);

-- Bảng liên kết khách sạn và tiện nghi
CREATE TABLE hotel_amenities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT UNSIGNED NOT NULL,
    amenity_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_hotel_amenity (hotel_id, amenity_id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Bảng hình ảnh khách sạn
CREATE TABLE hotel_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255) NULL,
    caption TEXT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_primary (hotel_id, is_primary),
    INDEX idx_order (hotel_id, sort_order)
);

-- =====================================================
-- 4. QUẢN LÝ PHÒNG
-- =====================================================

-- Bảng loại phòng
CREATE TABLE room_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    max_occupancy INT NOT NULL DEFAULT 2,
    bed_configuration VARCHAR(255) NULL,
    size_sqm INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- Bảng phòng
CREATE TABLE rooms (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT UNSIGNED NOT NULL,
    room_type_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NULL,
    room_number VARCHAR(50) NULL,
    floor_number INT NULL,
    size_sqm INT NULL,
    max_occupancy INT NOT NULL DEFAULT 2,
    bed_configuration VARCHAR(255) NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    weekend_price DECIMAL(12, 2) NULL,
    holiday_price DECIMAL(12, 2) NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('available', 'occupied', 'maintenance', 'out_of_order') DEFAULT 'available',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_hotel_slug (hotel_id, slug),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
    INDEX idx_featured (is_featured),
    INDEX idx_status (status),
    INDEX idx_price (base_price)
);

-- Bảng liên kết phòng và tiện nghi
CREATE TABLE room_amenities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT UNSIGNED NOT NULL,
    amenity_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_room_amenity (room_id, amenity_id),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Bảng hình ảnh phòng
CREATE TABLE room_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255) NULL,
    caption TEXT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_primary (room_id, is_primary),
    INDEX idx_order (room_id, sort_order)
);

-- Bảng giá phòng theo thời gian
CREATE TABLE room_pricing (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    weekend_price DECIMAL(12, 2) NULL,
    holiday_price DECIMAL(12, 2) NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    min_stay INT DEFAULT 1,
    max_stay INT NULL,
    available_rooms INT DEFAULT 1,
    status ENUM('available', 'booked', 'blocked') DEFAULT 'available',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_room_date (room_id, date),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_date (date),
    INDEX idx_status (status)
);

-- Bảng chính sách phòng
CREATE TABLE room_policies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT UNSIGNED NOT NULL,
    policy_type ENUM('cancellation', 'pet', 'smoking', 'age_restriction', 'payment', 'other') NOT NULL,
    policy_text TEXT NOT NULL,
    is_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_type (policy_type)
);

-- =====================================================
-- 5. QUẢN LÝ ĐẶT PHÒNG
-- =====================================================

-- Bảng đặt phòng
CREATE TABLE bookings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    nights INT NOT NULL,
    adults INT NOT NULL DEFAULT 1,
    children INT NOT NULL DEFAULT 0,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    special_requests TEXT NULL,
    room_total DECIMAL(12, 2) NOT NULL DEFAULT 0,
    service_total DECIMAL(12, 2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'VND',
    promotion_id BIGINT UNSIGNED NULL,
    status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'partially_paid', 'refunded', 'failed') DEFAULT 'pending',
    cancellation_reason TEXT NULL,
    cancelled_at TIMESTAMP NULL,
    cancelled_by BIGINT UNSIGNED NULL,
    confirmed_at TIMESTAMP NULL,
    confirmed_by BIGINT UNSIGNED NULL,
    checked_in_at TIMESTAMP NULL,
    checked_out_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_booking_number (booking_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_dates (check_in_date, check_out_date),
    INDEX idx_guest_email (guest_email)
);

-- Bảng chi tiết phòng đặt
CREATE TABLE booking_rooms (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    room_id BIGINT UNSIGNED NOT NULL,
    room_name VARCHAR(255) NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_per_night DECIMAL(12, 2) NOT NULL,
    total_nights INT NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Bảng dịch vụ bổ sung
CREATE TABLE additional_services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price DECIMAL(12, 2) NOT NULL,
    unit VARCHAR(50) DEFAULT 'item',
    category ENUM('food', 'transport', 'spa', 'tour', 'other') DEFAULT 'other',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_category (category),
    INDEX idx_active (is_active)
);

-- Bảng dịch vụ bổ sung cho đặt phòng
CREATE TABLE booking_services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    service_id BIGINT UNSIGNED NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    service_date DATE NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES additional_services(id) ON DELETE CASCADE
);

-- Bảng hủy đặt phòng
CREATE TABLE booking_cancellations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    reason TEXT NOT NULL,
    cancellation_fee DECIMAL(12, 2) DEFAULT 0,
    refund_amount DECIMAL(12, 2) DEFAULT 0,
    cancelled_by BIGINT UNSIGNED NOT NULL,
    cancelled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    processed_by BIGINT UNSIGNED NULL,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status)
);

-- Bảng thay đổi đặt phòng
CREATE TABLE booking_modifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    modification_type ENUM('dates', 'rooms', 'guests', 'services') NOT NULL,
    old_data JSON NOT NULL,
    new_data JSON NOT NULL,
    price_difference DECIMAL(12, 2) DEFAULT 0,
    reason TEXT NULL,
    requested_by BIGINT UNSIGNED NOT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_by BIGINT UNSIGNED NULL,
    processed_at TIMESTAMP NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_type (modification_type)
);

-- =====================================================
-- 6. QUẢN LÝ ĐÁNH GIÁ
-- =====================================================

-- Bảng đánh giá
CREATE TABLE reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NOT NULL,
    room_id BIGINT UNSIGNED NULL,
    booking_id BIGINT UNSIGNED NULL,
    overall_rating DECIMAL(2, 1) NOT NULL,
    cleanliness_rating DECIMAL(2, 1) NULL,
    service_rating DECIMAL(2, 1) NULL,
    location_rating DECIMAL(2, 1) NULL,
    value_rating DECIMAL(2, 1) NULL,
    title VARCHAR(255) NULL,
    comment TEXT NULL,
    pros TEXT NULL,
    cons TEXT NULL,
    images JSON NULL,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    status ENUM('pending', 'approved', 'rejected', 'hidden') DEFAULT 'pending',
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    approved_by BIGINT UNSIGNED NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_hotel_status (hotel_id, status),
    INDEX idx_rating (overall_rating),
    INDEX idx_status (status)
);

-- Bảng phản hồi đánh giá
CREATE TABLE review_responses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    response TEXT NOT NULL,
    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng vote đánh giá
CREATE TABLE review_votes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    is_helpful BOOLEAN NOT NULL,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_review_user_vote (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 7. QUẢN LÝ KHUYẾN MÃI
-- =====================================================

-- Bảng khuyến mãi
CREATE TABLE promotions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NULL UNIQUE,
    description TEXT NULL,
    type ENUM('discount_code', 'special_offer', 'flash_deal', 'loyalty_reward') NOT NULL,
    discount_type ENUM('percentage', 'fixed_amount', 'free_night') NOT NULL,
    discount_value DECIMAL(12, 2) NOT NULL,
    min_order_amount DECIMAL(12, 2) NULL,
    max_discount_amount DECIMAL(12, 2) NULL,
    usage_limit INT NULL,
    usage_count INT DEFAULT 0,
    user_usage_limit INT DEFAULT 1,
    applicable_hotels JSON NULL,
    applicable_room_types JSON NULL,
    user_type ENUM('all', 'new', 'vip', 'loyalty') DEFAULT 'all',
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_code (code),
    INDEX idx_type (type),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_active (is_active)
);

-- Bảng sử dụng khuyến mãi
CREATE TABLE promotion_usage (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    promotion_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    booking_id BIGINT UNSIGNED NOT NULL,
    discount_amount DECIMAL(12, 2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (promotion_id) REFERENCES promotions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_promotion_user (promotion_id, user_id)
);

-- Bảng ưu đãi đặc biệt
CREATE TABLE special_offers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    promotion_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NULL,
    room_type_id BIGINT UNSIGNED NULL,
    banner_image VARCHAR(255) NULL,
    highlight_text VARCHAR(255) NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (promotion_id) REFERENCES promotions(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
    INDEX idx_featured (is_featured)
);

-- Bảng deal nhanh
CREATE TABLE flash_deals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    promotion_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NULL,
    room_id BIGINT UNSIGNED NULL,
    original_price DECIMAL(12, 2) NOT NULL,
    deal_price DECIMAL(12, 2) NOT NULL,
    quantity_available INT NOT NULL,
    quantity_sold INT DEFAULT 0,
    deal_start TIMESTAMP NOT NULL,
    deal_end TIMESTAMP NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (promotion_id) REFERENCES promotions(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_dates (deal_start, deal_end)
);

-- =====================================================
-- 8. QUẢN LÝ THANH TOÁN
-- =====================================================

-- Bảng phương thức thanh toán
CREATE TABLE payment_methods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    provider VARCHAR(100) NOT NULL,
    description TEXT NULL,
    fee_percentage DECIMAL(5, 2) DEFAULT 0,
    fee_fixed DECIMAL(12, 2) DEFAULT 0,
    min_amount DECIMAL(12, 2) NULL,
    max_amount DECIMAL(12, 2) NULL,
    supported_currencies JSON NULL,
    config JSON NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_provider (provider),
    INDEX idx_active (is_active)
);

-- Bảng giao dịch thanh toán
CREATE TABLE payment_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    booking_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    payment_method_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'VND',
    fee_amount DECIMAL(12, 2) DEFAULT 0,
    net_amount DECIMAL(12, 2) NOT NULL,
    exchange_rate DECIMAL(10, 4) DEFAULT 1.0000,
    provider_transaction_id VARCHAR(255) NULL,
    provider_response JSON NULL,
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_type ENUM('full', 'partial', 'deposit') DEFAULT 'full',
    description TEXT NULL,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE CASCADE,
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_status (status),
    INDEX idx_booking (booking_id)
);

-- Bảng hoàn tiền
CREATE TABLE payment_refunds (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    original_transaction_id BIGINT UNSIGNED NOT NULL,
    refund_transaction_id VARCHAR(100) NOT NULL UNIQUE,
    booking_id BIGINT UNSIGNED NOT NULL,
    refund_amount DECIMAL(12, 2) NOT NULL,
    refund_reason TEXT NOT NULL,
    provider_refund_id VARCHAR(255) NULL,
    provider_response JSON NULL,
    status ENUM('pending', 'processing', 'completed', 'failed', 'rejected') DEFAULT 'pending',
    requested_by BIGINT UNSIGNED NOT NULL,
    processed_by BIGINT UNSIGNED NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (original_transaction_id) REFERENCES payment_transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_refund_id (refund_transaction_id)
);

-- Bảng thẻ thanh toán đã lưu
CREATE TABLE user_payment_methods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    payment_method_id BIGINT UNSIGNED NOT NULL,
    token VARCHAR(255) NOT NULL,
    card_type VARCHAR(50) NULL,
    last_four VARCHAR(4) NULL,
    expiry_month VARCHAR(2) NULL,
    expiry_year VARCHAR(4) NULL,
    cardholder_name VARCHAR(255) NULL,
    is_default BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'expired', 'disabled') DEFAULT 'active',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE CASCADE,
    INDEX idx_user_default (user_id, is_default)
);

-- Bảng thanh toán trả góp
CREATE TABLE installment_payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    installment_count INT NOT NULL,
    installment_amount DECIMAL(12, 2) NOT NULL,
    paid_installments INT DEFAULT 0,
    next_payment_date DATE NOT NULL,
    status ENUM('active', 'completed', 'defaulted', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_next_payment (next_payment_date)
);

-- Bảng chi tiết trả góp
CREATE TABLE installment_details (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    installment_payment_id BIGINT UNSIGNED NOT NULL,
    installment_number INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE NULL,
    transaction_id BIGINT UNSIGNED NULL,
    status ENUM('pending', 'paid', 'overdue', 'waived') DEFAULT 'pending',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (installment_payment_id) REFERENCES installment_payments(id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_id) REFERENCES payment_transactions(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
);

-- =====================================================
-- 9. QUẢN LÝ NỘI DUNG
-- =====================================================

-- Bảng quản lý file
CREATE TABLE media_files (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    dimensions VARCHAR(50) NULL,
    alt_text VARCHAR(255) NULL,
    description TEXT NULL,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    folder VARCHAR(255) DEFAULT 'uploads',
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_file_type (file_type),
    INDEX idx_folder (folder),
    INDEX idx_public (is_public)
);

-- Bảng banner
CREATE TABLE banners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NULL,
    description TEXT NULL,
    image_id BIGINT UNSIGNED NOT NULL,
    link_url VARCHAR(255) NULL,
    link_text VARCHAR(100) NULL,
    position ENUM('home_hero', 'home_secondary', 'category', 'sidebar', 'footer') DEFAULT 'home_hero',
    target_audience ENUM('all', 'new_users', 'returning_users', 'vip_users') DEFAULT 'all',
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    click_count INT DEFAULT 0,
    impression_count INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (image_id) REFERENCES media_files(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_position (position),
    INDEX idx_active (is_active),
    INDEX idx_dates (start_date, end_date)
);

-- Bảng trang tĩnh
CREATE TABLE static_pages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content LONGTEXT NULL,
    excerpt TEXT NULL,
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    meta_keywords TEXT NULL,
    featured_image_id BIGINT UNSIGNED NULL,
    template VARCHAR(100) DEFAULT 'default',
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    updated_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (featured_image_id) REFERENCES media_files(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured)
);

-- Bảng blog posts
CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    excerpt TEXT NULL,
    featured_image_id BIGINT UNSIGNED NULL,
    category_id BIGINT UNSIGNED NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    meta_keywords TEXT NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (featured_image_id) REFERENCES media_files(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_published (published_at)
);

-- =====================================================
-- 10. QUẢN LÝ THỐNG KÊ VÀ BÁO CÁO
-- =====================================================

-- Bảng thống kê hàng ngày
CREATE TABLE daily_statistics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    total_bookings INT DEFAULT 0,
    confirmed_bookings INT DEFAULT 0,
    cancelled_bookings INT DEFAULT 0,
    total_revenue DECIMAL(15, 2) DEFAULT 0,
    total_customers INT DEFAULT 0,
    new_customers INT DEFAULT 0,
    returning_customers INT DEFAULT 0,
    average_booking_value DECIMAL(12, 2) DEFAULT 0,
    occupancy_rate DECIMAL(5, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    website_visits INT DEFAULT 0,
    conversion_rate DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_date (date)
);

-- Bảng thống kê theo khách sạn
CREATE TABLE hotel_statistics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    total_bookings INT DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    occupancy_rate DECIMAL(5, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_hotel_date (hotel_id, date),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_date (date)
);

-- Bảng báo cáo
CREATE TABLE reports (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('revenue', 'booking', 'customer', 'hotel', 'custom') NOT NULL,
    period ENUM('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    filters JSON NULL,
    data JSON NULL,
    file_path VARCHAR(255) NULL,
    status ENUM('generating', 'completed', 'failed') DEFAULT 'generating',
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
);

-- =====================================================
-- 11. QUẢN LÝ THÔNG BÁO
-- =====================================================

-- Bảng thông báo
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'promotion', 'booking', 'payment', 'review') DEFAULT 'info',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    target_audience ENUM('all', 'customers', 'staff', 'managers', 'admins', 'specific') DEFAULT 'all',
    target_users JSON NULL,
    data JSON NULL,
    action_url VARCHAR(255) NULL,
    action_text VARCHAR(100) NULL,
    scheduled_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    status ENUM('draft', 'scheduled', 'sent', 'failed') DEFAULT 'draft',
    sent_count INT DEFAULT 0,
    read_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_scheduled (scheduled_at)
);

-- Bảng người nhận thông báo
CREATE TABLE notification_recipients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    notification_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    delivery_method ENUM('in_app', 'email', 'sms', 'push') DEFAULT 'in_app',
    status ENUM('pending', 'sent', 'delivered', 'read', 'failed') DEFAULT 'pending',
    sent_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    read_at TIMESTAMP NULL,
    clicked_at TIMESTAMP NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_notification_user (notification_id, user_id),
    FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_user_unread (user_id, read_at)
);

-- =====================================================
-- 12. QUẢN LÝ TƯƠNG TÁC NGƯỜI DÙNG
-- =====================================================

-- Bảng yêu thích
CREATE TABLE user_favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_user_hotel (user_id, hotel_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

-- Bảng wishlist
CREATE TABLE wishlists (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_default (user_id, is_default)
);

-- Bảng items trong wishlist
CREATE TABLE wishlist_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    wishlist_id BIGINT UNSIGNED NOT NULL,
    hotel_id BIGINT UNSIGNED NULL,
    room_id BIGINT UNSIGNED NULL,
    notes TEXT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_wishlist (wishlist_id)
);

-- Bảng lịch sử tìm kiếm
CREATE TABLE search_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    session_id VARCHAR(255) NOT NULL,
    search_query TEXT NOT NULL,
    filters JSON NULL,
    results_count INT DEFAULT 0,
    clicked_hotel_id BIGINT UNSIGNED NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (clicked_hotel_id) REFERENCES hotels(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- Bảng log hoạt động người dùng
CREATE TABLE user_activity_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    session_id VARCHAR(255) NOT NULL,
    activity_type ENUM('login', 'logout', 'view_hotel', 'view_room', 'search', 'booking', 'review', 'other') NOT NULL,
    entity_type VARCHAR(100) NULL,
    entity_id BIGINT UNSIGNED NULL,
    description TEXT NULL,
    metadata JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_activity (user_id, activity_type),
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- =====================================================
-- 13. QUẢN LÝ HỆ THỐNG
-- =====================================================

-- Bảng cấu hình hệ thống
CREATE TABLE system_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(255) NOT NULL UNIQUE,
    key_value TEXT NULL,
    description TEXT NULL,
    type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (key_name),
    INDEX idx_public (is_public)
);

-- Bảng log hệ thống
CREATE TABLE system_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    level ENUM('emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug') NOT NULL,
    message TEXT NOT NULL,
    context JSON NULL,
    channel VARCHAR(100) DEFAULT 'application',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_level (level),
    INDEX idx_channel (channel),
    INDEX idx_created (created_at)
);

-- Bảng backup
CREATE TABLE system_backups (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('full', 'incremental', 'differential') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    status ENUM('running', 'completed', 'failed') DEFAULT 'running',
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NULL,
    created_by BIGINT UNSIGNED NULL,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_type (type)
);

-- =====================================================
-- 14. QUẢN LÝ TÍCH HỢP BÊN NGOÀI
-- =====================================================

-- Bảng tích hợp API
CREATE TABLE api_integrations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    type ENUM('payment', 'map', 'email', 'sms', 'analytics', 'other') NOT NULL,
    api_key VARCHAR(255) NULL,
    api_secret VARCHAR(255) NULL,
    endpoint_url VARCHAR(255) NULL,
    config JSON NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_provider (provider),
    INDEX idx_type (type),
    INDEX idx_active (is_active)
);

-- Bảng webhook
CREATE TABLE webhooks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    events JSON NOT NULL,
    secret VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMP NULL,
    success_count INT DEFAULT 0,
    failure_count INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active)
);

-- Bảng log webhook
CREATE TABLE webhook_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    webhook_id BIGINT UNSIGNED NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    response_status INT NULL,
    response_body TEXT NULL,
    status ENUM('pending', 'success', 'failed', 'retry') DEFAULT 'pending',
    attempt_count INT DEFAULT 1,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (webhook_id) REFERENCES webhooks(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_event (event_type),
    INDEX idx_created (created_at)
);

-- =====================================================
-- INDEXES VÀ CONSTRAINTS BỔ SUNG
-- =====================================================

-- Thêm các indexes quan trọng cho performance
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status_payment ON bookings(status, payment_status);
CREATE INDEX idx_rooms_hotel_active ON rooms(hotel_id, is_active);
CREATE INDEX idx_hotels_area_active ON hotels(area_id, is_active);
CREATE INDEX idx_reviews_hotel_approved ON reviews(hotel_id, status);
CREATE INDEX idx_transactions_status_date ON payment_transactions(status, created_at);

-- =====================================================
-- DỮ LIỆU MẪU CƠ BẢN
-- =====================================================

-- Thêm dữ liệu mẫu cho countries
INSERT INTO countries (name, code, currency, timezone) VALUES
('Vietnam', 'VN', 'VND', 'Asia/Ho_Chi_Minh'),
('Thailand', 'TH', 'THB', 'Asia/Bangkok'),
('Singapore', 'SG', 'SGD', 'Asia/Singapore'),
('Malaysia', 'MY', 'MYR', 'Asia/Kuala_Lumpur');

-- Thêm dữ liệu mẫu cho roles
INSERT INTO roles (name, slug, description) VALUES
('Super Admin', 'super-admin', 'Full system access'),
('Admin', 'admin', 'Administrative access'),
('Manager', 'manager', 'Hotel management access'),
('Staff', 'staff', 'Limited staff access'),
('Customer', 'customer', 'Customer access');

-- Thêm dữ liệu mẫu cho permissions
INSERT INTO permissions (name, slug, module, action) VALUES
('View Dashboard', 'view-dashboard', 'dashboard', 'view'),
('Manage Users', 'manage-users', 'users', 'manage'),
('Manage Hotels', 'manage-hotels', 'hotels', 'manage'),
('Manage Bookings', 'manage-bookings', 'bookings', 'manage'),
('Manage Payments', 'manage-payments', 'payments', 'manage'),
('View Reports', 'view-reports', 'reports', 'view'),
('Manage Content', 'manage-content', 'content', 'manage');

-- Thêm dữ liệu mẫu cho hotel categories
INSERT INTO hotel_categories (name, slug, description) VALUES
('Luxury Hotels', 'luxury-hotels', 'High-end luxury accommodations'),
('Business Hotels', 'business-hotels', 'Hotels catering to business travelers'),
('Resort Hotels', 'resort-hotels', 'Vacation and leisure resorts'),
('Budget Hotels', 'budget-hotels', 'Affordable accommodation options'),
('Boutique Hotels', 'boutique-hotels', 'Unique and stylish small hotels');

-- Thêm dữ liệu mẫu cho amenities
INSERT INTO amenities (name, slug, icon, category, type) VALUES
('Free WiFi', 'free-wifi', 'wifi', 'both', 'basic'),
('Swimming Pool', 'swimming-pool', 'pool', 'hotel', 'premium'),
('Fitness Center', 'fitness-center', 'dumbbell', 'hotel', 'premium'),
('Spa Services',   'premium'),
('Fitness Center', 'fitness-center', 'dumbbell', 'hotel', 'premium'),
('Spa Services', 'spa-services', 'spa', 'hotel', 'luxury'),
('Air Conditioning', 'air-conditioning', 'snowflake', 'room', 'basic'),
('Mini Bar', 'mini-bar', 'wine-glass', 'room', 'premium'),
('Room Service', 'room-service', 'room-service', 'hotel', 'premium'),
('Parking', 'parking', 'car', 'hotel', 'basic'),
('Restaurant', 'restaurant', 'utensils', 'hotel', 'basic'),
('Bar/Lounge', 'bar-lounge', 'glass-martini', 'hotel', 'premium'),
('Conference Room', 'conference-room', 'users', 'hotel', 'premium'),
('Laundry Service', 'laundry-service', 'shirt', 'hotel', 'basic'),
('Airport Shuttle', 'airport-shuttle', 'plane', 'hotel', 'premium'),
('Pet Friendly', 'pet-friendly', 'paw', 'hotel', 'basic'),
('Balcony', 'balcony', 'home', 'room', 'premium'),
('Kitchen', 'kitchen', 'chef-hat', 'room', 'premium'),
('Safe', 'safe', 'lock', 'room', 'basic'),
('Hair Dryer', 'hair-dryer', 'wind', 'room', 'basic'),
('TV', 'tv', 'tv', 'room', 'basic'),
('Coffee Maker', 'coffee-maker', 'coffee', 'room', 'basic');

-- Thêm dữ liệu mẫu cho room types
INSERT INTO room_types (name, slug, description, max_occupancy, bed_configuration, size_sqm) VALUES
('Standard Room', 'standard-room', 'Comfortable standard accommodation', 2, '1 Double Bed', 25),
('Deluxe Room', 'deluxe-room', 'Spacious room with premium amenities', 2, '1 King Bed', 35),
('Suite', 'suite', 'Luxurious suite with separate living area', 4, '1 King Bed + Sofa Bed', 50),
('Family Room', 'family-room', 'Perfect for families with children', 4, '2 Double Beds', 40),
('Executive Room', 'executive-room', 'Business-class accommodation', 2, '1 King Bed', 30),
('Presidential Suite', 'presidential-suite', 'Ultimate luxury accommodation', 6, '2 King Beds + Living Area', 100);

-- Thêm dữ liệu mẫu cho payment methods
INSERT INTO payment_methods (name, code, provider, description, supported_currencies) VALUES
('Credit Card', 'credit_card', 'Stripe', 'Visa, Mastercard, American Express', '["VND", "USD", "EUR"]'),
('VNPay', 'vnpay', 'VNPay', 'Vietnamese payment gateway', '["VND"]'),
('PayPal', 'paypal', 'PayPal', 'International PayPal payments', '["USD", "EUR", "VND"]'),
('Bank Transfer', 'bank_transfer', 'Manual', 'Direct bank transfer', '["VND"]'),
('Cash', 'cash', 'Manual', 'Cash payment at hotel', '["VND"]'),
('Momo', 'momo', 'Momo', 'Vietnamese mobile payment', '["VND"]'),
('ZaloPay', 'zalopay', 'ZaloPay', 'Vietnamese digital wallet', '["VND"]');

-- Thêm dữ liệu mẫu cho loyalty programs
INSERT INTO loyalty_programs (name, tier_name, min_points, max_points, benefits, discount_percentage, point_multiplier) VALUES
('Bronze Member', 'Bronze', 0, 999, '{"early_checkin": false, "late_checkout": false, "room_upgrade": false}', 0, 1.0),
('Silver Member', 'Silver', 1000, 4999, '{"early_checkin": true, "late_checkout": true, "room_upgrade": false}', 5, 1.2),
('Gold Member', 'Gold', 5000, 9999, '{"early_checkin": true, "late_checkout": true, "room_upgrade": true}', 10, 1.5),
('Platinum Member', 'Platinum', 10000, NULL, '{"early_checkin": true, "late_checkout": true, "room_upgrade": true, "free_breakfast": true}', 15, 2.0);

-- Thêm dữ liệu mẫu cho system settings
INSERT INTO system_settings (key_name, key_value, description, type, is_public) VALUES
('site_name', 'Hotel Booking System', 'Website name', 'string', true),
('site_description', 'Best hotel booking platform in Vietnam', 'Website description', 'text', true),
('default_currency', 'VND', 'Default currency code', 'string', true),
('default_language', 'vi', 'Default language code', 'string', true),
('booking_cancellation_hours', '24', 'Hours before check-in to allow free cancellation', 'number', false),
('max_booking_days', '365', 'Maximum days in advance for booking', 'number', false),
('min_booking_hours', '2', 'Minimum hours before check-in for booking', 'number', false),
('loyalty_points_rate', '100', 'Points earned per 100 VND spent', 'number', false),
('email_verification_required', 'true', 'Require email verification for new accounts', 'boolean', false),
('auto_confirm_bookings', 'false', 'Automatically confirm bookings after payment', 'boolean', false);

-- =====================================================
-- TRIGGERS VÀ STORED PROCEDURES
-- =====================================================

-- Trigger cập nhật rating trung bình của hotel khi có review mới
DELIMITER //
CREATE TRIGGER update_hotel_rating_after_review
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE hotels 
    SET review_rating = (
        SELECT AVG(overall_rating) 
        FROM reviews 
        WHERE hotel_id = NEW.hotel_id AND status = 'approved'
    ),
    review_count = (
        SELECT COUNT(*) 
        FROM reviews 
        WHERE hotel_id = NEW.hotel_id AND status = 'approved'
    )
    WHERE id = NEW.hotel_id;
END//
DELIMITER ;

-- Trigger tự động tạo booking number
DELIMITER //
CREATE TRIGGER generate_booking_number
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
        SET NEW.booking_number = CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d'), LPAD(LAST_INSERT_ID() + 1, 6, '0'));
    END IF;
END//
DELIMITER ;

-- Trigger cập nhật loyalty points khi booking được confirm
DELIMITER //
CREATE TRIGGER update_loyalty_points_on_booking_confirm
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
        INSERT INTO loyalty_transactions (user_id, program_id, booking_id, transaction_type, points, description)
        SELECT 
            NEW.user_id,
            ul.program_id,
            NEW.id,
            'earn',
            FLOOR(NEW.total_amount / 100),
            CONCAT('Points earned from booking ', NEW.booking_number)
        FROM user_loyalty ul
        WHERE ul.user_id = NEW.user_id
        LIMIT 1;
        
        UPDATE user_loyalty 
        SET current_points = current_points + FLOOR(NEW.total_amount / 100),
            total_earned_points = total_earned_points + FLOOR(NEW.total_amount / 100)
        WHERE user_id = NEW.user_id;
    END IF;
END//
DELIMITER ;

-- =====================================================
-- VIEWS HỮU ÍCH
-- =====================================================

-- View thống kê tổng quan
CREATE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM bookings WHERE DATE(created_at) = CURDATE()) as today_bookings,
    (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed' AND DATE(created_at) = CURDATE()) as today_confirmed,
    (SELECT COALESCE(SUM(total_amount), 0) FROM bookings WHERE status = 'confirmed' AND DATE(created_at) = CURDATE()) as today_revenue,
    (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()) as today_new_users,
    (SELECT COUNT(*) FROM hotels WHERE is_active = true) as active_hotels,
    (SELECT COUNT(*) FROM rooms WHERE is_active = true) as active_rooms,
    (SELECT COALESCE(AVG(overall_rating), 0) FROM reviews WHERE status = 'approved' AND DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as avg_rating_30days;

-- View top hotels
CREATE VIEW top_hotels AS
SELECT 
    h.*,
    COUNT(b.id) as total_bookings,
    COALESCE(SUM(b.total_amount), 0) as total_revenue,
    COALESCE(AVG(r.overall_rating), 0) as avg_rating
FROM hotels h
LEFT JOIN bookings b ON h.id = b.hotel_id AND b.status = 'confirmed'
LEFT JOIN reviews r ON h.id = r.hotel_id AND r.status = 'approved'
WHERE h.is_active = true
GROUP BY h.id
ORDER BY total_revenue DESC, total_bookings DESC;

-- View customer statistics
CREATE VIEW customer_stats AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(b.id) as total_bookings,
    COALESCE(SUM(b.total_amount), 0) as total_spent,
    COALESCE(ul.current_points, 0) as loyalty_points,
    lp.tier_name as loyalty_tier,
    MAX(b.created_at) as last_booking_date
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id AND b.status = 'confirmed'
LEFT JOIN user_loyalty ul ON u.id = ul.user_id
LEFT JOIN loyalty_programs lp ON ul.program_id = lp.id
WHERE u.user_type = 'customer'
GROUP BY u.id;

-- =====================================================
-- KẾT THÚC SCHEMA
-- =====================================================
