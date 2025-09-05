import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Calendar,
  Users,
  Heart,
  Search,
  Filter,
  ChefHat,
  Award,
  Truck,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MessageSquare,
  X,
  ArrowRight,
  Volume2,
  VolumeX,
  Eye,
  MapIcon,
  Leaf,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import { menuItems } from "./data/data";


const RestaurantWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    spicy: 0,
    vegan: false,
    maxPrice: 10000,
    minCalories: 0,
    maxCalories: 1000,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showNutrition, setShowNutrition] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [reviews] = useState([
    {
      id: 1,
      name: "Adaeze Johnson",
      review:
        "Best jollof rice in Benin City! The flavors are authentic and the service is excellent.",
      rating: 5,
      date: "2025-08-15",
      verified: true,
      dish: "Jollof Rice Supreme",
      images: [],
    },
    {
      id: 2,
      name: "Michael Okafor",
      review:
        "Love the local specials here. The banga rice reminds me of home cooking.",
      rating: 5,
      date: "2025-08-10",
      verified: true,
      dish: "Banga Rice Special",
      images: [],
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 5,
    dish: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const videoRef = useRef(null);
  const galleryImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop",
  ];

  const menuCategories = [
    { id: "appetizers", name: "Appetizers", icon: "🥗" },
    { id: "main-dishes", name: "Main Dishes", icon: "🍽️" },
    { id: "local-specials", name: "Local Specials", icon: "🍲" },
    { id: "grills", name: "Grills", icon: "🥩" },
    { id: "beverages", name: "Beverages", icon: "🥤" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
  ];

  const getFilteredItems = () => {
    let items = menuItems[selectedCategory] || [];

    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    items = items.filter((item) => {
      return (
        item.spicy >= filters.spicy &&
        item.price <= filters.maxPrice &&
        item.calories >= filters.minCalories &&
        item.calories <= filters.maxCalories &&
        (!filters.vegan || item.vegan)
      );
    });

    items.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "calories":
          return a.calories - b.calories;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.popular ? 1 : -1;
      }
    });

    return items;
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const handleReservation = (e) => {
    e.preventDefault();
    alert(
      `Reservation confirmed for ${reservationData.name} on ${reservationData.date} at ${reservationData.time} for ${reservationData.guests} guests.`
    );
    setShowReservation(false);
    setReservationData({
      date: "",
      time: "",
      guests: 2,
      name: "",
      phone: "",
      email: "",
      specialRequests: "",
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your review!");
    setNewReview({ name: "", review: "", rating: 5, dish: "" });
    setShowReviewForm(false);
  };

  const getSpicyLevel = (level) => {
    return "🌶️".repeat(level);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"></div>

        <button
          onClick={() => setVideoMuted(!videoMuted)}
          className="absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          {videoMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
              Bella's Kitchen
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              Authentic Nigerian cuisine meets modern dining. Experience the
              taste of tradition with a contemporary twist.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <ChefHat className="inline w-5 h-5 mr-2" />
                View Menu
              </button>
              <button
                onClick={() => setShowReservation(true)}
                className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                <Calendar className="inline w-5 h-5 mr-2" />
                Reserve Table
              </button>
              <button
                onClick={() => setShowGallery(true)}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                <Eye className="inline w-5 h-5 mr-2" />
                View Gallery
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-white">4.8★</div>
                <div className="text-sm opacity-75">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm opacity-75">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm opacity-75">Menu Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
            <div
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => setShowMap(true)}
            >
              <MapPin className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">
                123 Mission Road
                <br />
                GRA, Benin City
              </p>
              <button className="text-orange-600 text-sm mt-2 hover:underline">
                View on Map
              </button>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">
                +234 802 123 4567
                <br />
                info@bellaskitchen.ng
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon-Sat: 11AM-11PM
                <br />
                Sunday: 12PM-9PM
              </p>
              <span className="text-green-600 text-sm mt-2">● Open Now</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Awards</h3>
              <p className="text-gray-600">
                Best Nigerian Restaurant
                <br />
                2024 & 2025
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-orange-50 p-4 rounded-lg">
              <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Organic Ingredients</span>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Quick Service</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Fresh ingredients, authentic recipes, and bold flavors crafted
              with love and tradition.
            </p>

            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                    showFilters
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="calories">Calories</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fixed Cart Button */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredItems().map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowNutrition(true);
                    }}
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      🔥 Popular
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      favorites.includes(item.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(item.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h3>
                    {item.vegan && (
                      <span className="text-green-600 text-sm">🌱 Vegan</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowNutrition(true);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                      >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Your Order</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {formatPrice(item.price)} each
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-orange-600">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t bg-gray-50 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-orange-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                  <CreditCard className="inline w-5 h-5 mr-2" />
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={galleryImages[currentImageIndex]}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={() =>
                setCurrentImageIndex(
                  (prev) => (prev + 1) % galleryImages.length
                )
              }
              className="absolute right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/50"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {showNutrition && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowNutrition(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedItem.name}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {selectedItem.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {formatPrice(selectedItem.price)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-900">
                    Nutrition Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Calories</span>
                      <span className="font-semibold">
                        {selectedItem.calories} kcal
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Prep Time</span>
                      <span className="font-semibold">
                        {selectedItem.prepTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Spice Level</span>
                      <span className="font-semibold">
                        {selectedItem.spicy === 0
                          ? "Mild"
                          : getSpicyLevel(selectedItem.spicy)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-900">
                    Ingredients
                  </h4>
                  <div className="space-y-2">
                    {selectedItem.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => toggleFavorite(selectedItem.id)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    favorites.includes(selectedItem.id)
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 inline mr-2 ${
                      favorites.includes(selectedItem.id) ? "fill-current" : ""
                    }`}
                  />
                  {favorites.includes(selectedItem.id)
                    ? "Saved to Favorites"
                    : "Add to Favorites"}
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedItem);
                    setShowNutrition(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  Add to Cart - {formatPrice(selectedItem.price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex space-x-1 mr-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="text-gray-600 ml-2">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Write Review
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <CheckCircle
                            className="w-4 h-4 text-green-500"
                            title="Verified Purchase"
                          />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {review.dish && (
                  <div className="mb-3">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {review.dish}
                    </span>
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Write a Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dish Tried
                  </label>
                  <select
                    value={newReview.dish}
                    onChange={(e) =>
                      setNewReview({ ...newReview, dish: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select a dish (optional)</option>
                    {Object.values(menuItems)
                      .flat()
                      .map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: i + 1 })
                      }
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          i < newReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  required
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none"
                  placeholder="Tell us about your dining experience..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageSquare className="inline w-5 h-5 mr-2" />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showReservation && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Reserve Your Table</h3>
                <button
                  onClick={() => setShowReservation(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleReservation} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={reservationData.date}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        date: e.target.value,
                      })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <select
                    required
                    value={reservationData.time}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        time: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select time</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      setReservationData({
                        ...reservationData,
                        guests: Math.max(1, reservationData.guests - 1),
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {reservationData.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setReservationData({
                        ...reservationData,
                        guests: Math.min(12, reservationData.guests + 1),
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <Users className="w-5 h-5 text-gray-500 ml-2" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reservationData.name}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={reservationData.phone}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={reservationData.email}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Calendar className="inline w-5 h-5 mr-2" />
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-96 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Our Location</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-700 mb-2">
                  Bella's Kitchen
                </h4>
                <p className="text-gray-600">
                  123 Mission Road, GRA, Benin City
                </p>
                <p className="text-gray-600">+234 802 123 4567</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">
                Bella's Kitchen
              </h3>
              <p className="text-gray-400 mb-4">
                Where tradition meets taste. Experience authentic Nigerian
                cuisine in a modern setting.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#menu"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Reservations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Catering
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Mission Road, GRA, Benin City</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+234 802 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@bellaskitchen.ng</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Get updates on new dishes and special offers!
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                />
                <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-4 py-2 rounded-lg transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 Bella's Kitchen. All rights reserved. Made with love in
              Nigeria
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantWebsite;

