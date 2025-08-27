export interface Product {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    color: string;
    __v: number;
    id: string;
  };
  type: string;
  price: number;
  oldPrice?: number;
  isFeatured: boolean;
  countInStock: string;
  discount?: number;
  size: string[];
  productSize: string[];
  rating: number;
  images: string[];
  dateCreated: string;
  __v: number;
  catName: string;
}

export interface TabCategory {
  name: string;
  color?: string;
}

export interface HomeSwiperProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  showTabs?: boolean;
  categories?: TabCategory[];
  products?: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showDoubleRow?: boolean;
  itemsPerRow?: number;
  className?: string;
  headerClassName?: string;
  swiperClassName?: string;
  loading?: boolean;
  error?: string | null; 
}

export interface Review {
  _id: string;
  productId: string;
  customerName: string;
  customerRating: number;
  review: string;
}

export interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  isVegan: boolean;
  setIsVegan: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SimpleSwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay?: number;
  loading: boolean;
  error?: string | null;
  seeAllCard?: React.ReactNode;
}

//contexts
// category context
export interface Category {
  _id: string;
  name: string;
  images: string[];
  color: string;
  description: string;
  __v: number;
  id: string;
}


export interface CartItem {
  id?: string;
  productTitle: string;
  images: string;
  rating: number;
  price: number;
  quantity: number;
  subTotal: number;
  productId: string;
  userId?: string;
  size: string;
}


export interface SearchSug {
  name: string;
  id : string;
}

export interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// user context
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  token: string;
  isVegan: boolean;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  loading : boolean;
  logout: () => void;
}


export interface SignUpResponse {
  user: {
    _id: string;
    id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    __v?: number;
  };
  token: string;
}

export interface SignupError {
  status: false;
  msg: string;
}


//favorites context

export interface FavoriteItem {
  _id: string;
  productTitle: string;
  images: string;
  rating: number;
  price: number;
  productId: string;
  userId: string;
}

export interface FavoritesContextType {
  favorites: FavoriteItem[];
  loading: boolean;
  refreshFavorites: () => void;
}

//auth
export interface SignInContainerProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}