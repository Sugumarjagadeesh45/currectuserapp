// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
//   Animated,
//   Switch,
//   Modal,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import socket from '../../socket';
// import haversine from 'haversine-distance';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Svg, { Path, Circle, Rect } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBackendUrl } from '../../util/backendConfig';

// // Professional SVG icons
// const TaxiIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
//     <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
//     <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
//     <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
//     <Circle cx="6.5" cy="16" r="1.5" fill={color} />
//     <Circle cx="17.5" cy="16" r="1.5" fill={color} />
//   </Svg>
// );
// const PortIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
//     <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
//     <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
//   </Svg>
// );
// const BikeIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="18" cy="16" r="1" fill={color} />
//     <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="6" cy="16" r="1" fill={color} />
//     <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
//     <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
//     <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
//     <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
//   </Svg>
// );

// // RideTypeSelector component
// const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
//   return (
//     <View style={styles.rideTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'taxi' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('taxi')}
//       >
//         <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'taxi' && styles.selectedRideTypeText,
//         ]}>Taxi</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'bike' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('bike')}
//       >
//         <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'bike' && styles.selectedRideTypeText,
//         ]}>Bike</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'port' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('port')}
//       >
//         <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'port' && styles.selectedRideTypeText,
//         ]}>Port</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// interface SuggestionType {
//   id: string;
//   name: string;
//   address: string;
//   lat: string;
//   lon: string;
//   type: string;
//   importance: number;
// }

// interface DriverType {
//   driverId: string;
//   name: string;
//   location: {
//     coordinates: [number, number];
//   };
//   vehicleType: string;
// }

// interface TaxiContentProps {
//   loadingLocation: boolean;
//   pickup: string;
//   dropoff: string;
//   handlePickupChange: (text: string) => void;
//   handleDropoffChange: (text: string) => void;
//   setLoadingLocation: (loading: boolean) => void;
// }

// const TaxiContent: React.FC<TaxiContentProps> = ({
//   loadingLocation,
//   pickup,
//   dropoff,
//   handlePickupChange: propHandlePickupChange,
//   handleDropoffChange: propHandleDropoffChange,
//   setLoadingLocation,
// }) => {
//   const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const [showPricePanel, setShowPricePanel] = useState(false);
//   const [wantReturn, setWantReturn] = useState(false);
//   const [distance, setDistance] = useState<string>('');
//   const [travelTime, setTravelTime] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingOTP, setBookingOTP] = useState<string>('');
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [location, setLocation] = useState<LocationType | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
//   const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
//   const [currentRideId, setCurrentRideId] = useState<string | null>(null);
//   const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
//   const [driverId, setDriverId] = useState<string | null>(null);
//   const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
//   const [travelledKm, setTravelledKm] = useState(0);
//   const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
//   const [nearbyDrivers, setNearbyDrivers] = useState<DriverType[]>([]);
//   const [nearbyDriversCount, setNearbyDriversCount] = useState<number>(0);
  
//   const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });
//   const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
//   const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
//   const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
//   const [pickupLoading, setPickupLoading] = useState(false);
//   const [dropoffLoading, setDropoffLoading] = useState(false);
//   const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
//   const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
//   const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
//   const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
//   const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
//   const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const panelAnimation = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef<MapView | null>(null);

//   // Fetch nearby drivers
//   const fetchNearbyDrivers = async (latitude: number, longitude: number) => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       const backendUrl = getBackendUrl();
//       const response = await axios.get(`${backendUrl}/api/drivers/nearby`, {
//         params: { latitude, longitude },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.success) {
//         setNearbyDrivers(response.data.drivers);
//         setNearbyDriversCount(response.data.count);
//       }
//     } catch (error) {
//       console.error('Error fetching nearby drivers:', error);
//       setApiError('Failed to fetch nearby drivers');
//     }
//   };

//   useEffect(() => {
//     const requestLocation = async () => {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
//           Alert.alert("Permission Denied", "Location permission is required to proceed.");
//           setLoadingLocation(false);
//           return;
//         }
//       }
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
//           setLocation(loc);
//           setPickupLocation(loc);
//           setMapRegion({
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           });
//           propHandlePickupChange("My Current Location");
//           setIsPickupCurrent(true);
//           setLoadingLocation(false);
//           fetchNearbyDrivers(loc.latitude, loc.longitude); // Fetch nearby drivers initially
//         },
//         (err) => {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
//           setLoadingLocation(false);
//           Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           distanceFilter: 10,
//         }
//       );
//     };
//     requestLocation();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           setLocation(newLoc);
//           if (rideStatus === "idle" && isPickupCurrent && dropoffLocation) {
//             setPickupLocation(newLoc);
//             fetchRouteBetween(newLoc, dropoffLocation);
//             fetchNearbyDrivers(newLoc.latitude, newLoc.longitude); // Update nearby drivers
//           }
//         },
//         (err) => {
//           console.error("Live location error:", err);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [rideStatus, isPickupCurrent, dropoffLocation]);

//   // Listen for driver location updates
//   useEffect(() => {
//     const driverLocationsUpdate = (drivers: DriverType[]) => {
//       setNearbyDrivers(drivers);
//       setNearbyDriversCount(drivers.length);
//     };
//     socket.on("driverLocationsUpdate", driverLocationsUpdate);
//     return () => {
//       socket.off("driverLocationsUpdate", driverLocationsUpdate);
//     };
//   }, []);

//   useEffect(() => {
//     if (!currentRideId) return;
//     const rideAccepted = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus("onTheWay");
//         setDriverId(data.driverId);
//         Alert.alert("Driver on the way 🚖");
//       }
//     };
//     const driverLocUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         const coords = { latitude: data.lat, longitude: data.lng };
//         setDriverLocation(coords);
//         if (lastCoord) {
//           const dist = haversine(lastCoord, coords);
//           setTravelledKm(prev => prev + dist / 1000);
//         }
//         setLastCoord(coords);
//       }
//     };
//     const rideStatusUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus(data.status);
//         if (data.status === "completed") {
//           Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
//           setTimeout(() => {
//             setCurrentRideId(null);
//             setDriverId(null);
//             setDriverLocation(null);
//             setRouteCoords([]);
//             setPickupLocation(null);
//             setDropoffLocation(null);
//             propHandlePickupChange("");
//             propHandleDropoffChange("");
//             setRideStatus("idle");
//           }, 3000);
//         }
//       }
//     };
//     const rideOtpListener = ({ rideId, otp }: any) => {
//       if (rideId === currentRideId) {
//         setBookingOTP(otp);
//         setShowConfirmModal(true);
//         Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
//       }
//     };
//     socket.on("rideAccepted", rideAccepted);
//     socket.on("driverLocationUpdate", driverLocUpdate);
//     socket.on("rideStatusUpdate", rideStatusUpdate);
//     socket.on("rideOTP", rideOtpListener);
//     return () => {
//       socket.off("rideAccepted", rideAccepted);
//       socket.off("driverLocationUpdate", driverLocUpdate);
//       socket.off("rideStatusUpdate", rideStatusUpdate);
//       socket.off("rideOTP", rideOtpListener);
//     };
//   }, [currentRideId, lastCoord, travelledKm]);

//   useEffect(() => {
//     if (driverLocation) {
//       let dest: LocationType | null = null;
//       if (rideStatus === "onTheWay" || rideStatus === "arrived") {
//         dest = pickupLocation;
//       } else if (rideStatus === "started") {
//         dest = dropoffLocation;
//       }
//       if (dest) {
//         fetchRouteBetween(driverLocation, dest);
//       }
//     } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
//       fetchRouteBetween(pickupLocation, dropoffLocation);
//     }
//     if (rideStatus === "completed") {
//       setRouteCoords([]);
//     }
//   }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);

//   const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
//     try {
//       console.log(`Fetching suggestions for: ${query}`);
      
//       const cache = type === 'pickup' ? pickupCache : dropoffCache;
//       if (cache[query]) {
//         console.log(`Returning cached suggestions for: ${query}`);
//         return cache[query];
//       }

//       if (type === 'pickup') setPickupLoading(true);
//       else setDropoffLoading(true);
//       setSuggestionsError(null);

//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
//       console.log(`API URL: ${url}`);
      
//       const response = await fetch(url, {
//         headers: {
//           'User-Agent': 'EAZYGOApp/1.0',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(`API response:`, data);
      
//       if (!Array.isArray(data)) {
//         throw new Error('Invalid response format');
//       }

//       const suggestions: SuggestionType[] = data.map((item: any) => ({
//         id: item.place_id || `${item.lat}-${item.lon}`,
//         name: item.display_name,
//         address: extractAddress(item),
//         lat: item.lat,
//         lon: item.lon,
//         type: item.type || 'unknown',
//         importance: item.importance || 0
//       }));

//       if (type === 'pickup') setPickupCache(prev => ({ ...prev, [query]: suggestions }));
//       else setDropoffCache(prev => ({ ...prev, [query]: suggestions }));

//       console.log(`Processed suggestions:`, suggestions);
//       return suggestions;
//     } catch (error: any) {
//       console.error('Suggestions fetch error:', error);
//       setSuggestionsError(error.message || 'Failed to fetch suggestions');
//       return [];
//     } finally {
//       if (type === 'pickup') setPickupLoading(false);
//       else setDropoffLoading(false);
//     }
//   };

//   const extractAddress = (item: any): string => {
//     if (item.address) {
//       const parts = [];
//       if (item.address.road) parts.push(item.address.road);
//       if (item.address.suburb) parts.push(item.address.suburb);
//       if (item.address.city || item.address.town || item.address.village) {
//         parts.push(item.address.city || item.address.town || item.address.village);
//       }
//       if (item.address.state) parts.push(item.address.state);
//       if (item.address.postcode) parts.push(item.address.postcode);
      
//       return parts.join(', ');
//     }
//     return item.display_name;
//   };

//   const handlePickupChange = (text: string) => {
//     console.log(`handlePickupChange called with: "${text}"`);
//     propHandlePickupChange(text);
    
//     if (pickupDebounceTimer.current) {
//       clearTimeout(pickupDebounceTimer.current);
//       pickupDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setPickupLoading(true);
//       setShowPickupSuggestions(true);
      
//       pickupDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'pickup');
//         console.log(`Setting pickup suggestions:`, sugg);
//         setPickupSuggestions(sugg);
//         setPickupLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowPickupSuggestions(false);
//       setPickupSuggestions([]);
//     }
//   };

//   const handleDropoffChange = (text: string) => {
//     console.log(`handleDropoffChange called with: "${text}"`);
//     propHandleDropoffChange(text);
    
//     if (dropoffDebounceTimer.current) {
//       clearTimeout(dropoffDebounceTimer.current);
//       dropoffDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setDropoffLoading(true);
//       setShowDropoffSuggestions(true);
      
//       dropoffDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'dropoff');
//         console.log(`Setting dropoff suggestions:`, sugg);
//         setDropoffSuggestions(sugg);
//         setDropoffLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowDropoffSuggestions(false);
//       setDropoffSuggestions([]);
//     }
//   };

//   const selectPickupSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected pickup suggestion:`, suggestion);
//     propHandlePickupChange(suggestion.name);
//     setPickupLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowPickupSuggestions(false);
//     setIsPickupCurrent(false);
//     if (dropoffLocation) {
//       fetchRouteBetween({
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       }, dropoffLocation);
//     }
//     fetchNearbyDrivers(parseFloat(suggestion.lat), parseFloat(suggestion.lon)); // Update nearby drivers
//   };

//   const selectDropoffSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected dropoff suggestion:`, suggestion);
//     propHandleDropoffChange(suggestion.name);
//     setDropoffLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowDropoffSuggestions(false);
//     if (pickupLocation) {
//       fetchRouteBetween(pickupLocation, {
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       });
//     }
//   };

//   const getAddressFromCoordinates = async (coords: LocationType) => {
//     setReverseGeocoding(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
//         {
//           headers: {
//             'User-Agent': 'EAZYGOApp/1.0',
//           },
//         }
//       );
//       const data = await response.json();
//       return data.display_name || 'Selected Location';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       Alert.alert('Error', 'Failed to get address from coordinates.');
//       return 'Selected Location';
//     } finally {
//       setReverseGeocoding(false);
//     }
//   };

//   const handleMapPress = async (e: any) => {
//     if (selectionMode) {
//       setReverseGeocoding(true);
//       const coords = e.nativeEvent.coordinate;
//       const address = await getAddressFromCoordinates(coords);
      
//       if (selectionMode === 'pickup') {
//         setPickupLocation(coords);
//         handlePickupChange(address);
//         setIsPickupCurrent(false);
//         fetchNearbyDrivers(coords.latitude, coords.longitude); // Update nearby drivers
//       } else if (selectionMode === 'dropoff') {
//         setDropoffLocation(coords);
//         handleDropoffChange(address);
//         if (pickupLocation) {
//           await fetchRouteBetween(pickupLocation, coords);
//         }
//       }
//       setSelectionMode(null);
//       setReverseGeocoding(false);
//     } else {
//       const coords = e.nativeEvent.coordinate;
//       if (!pickupLocation) {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         fetchNearbyDrivers(coords.latitude, coords.longitude); // Update nearby drivers
//       } else if (!dropoffLocation) {
//         setDropoffLocation(coords);
//         handleDropoffChange("Dropoff Selected");
//         await fetchRouteBetween(pickupLocation, coords);
//       } else {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         setDropoffLocation(null);
//         handleDropoffChange("");
//         setRouteCoords([]);
//         fetchNearbyDrivers(coords.latitude, coords.longitude); // Update nearby drivers
//       }
//     }
//   };

//   const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
//     try {
//       const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.code === "Ok" && data.routes.length > 0) {
//         const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
//         setRouteCoords(coords);
//         setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
//         setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
//       } else {
//         setApiError("Failed to fetch route");
//         Alert.alert("Route Error", "Could not find route. Please try different locations.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRouteCoords([]);
//       setApiError("Network error fetching route");
//       Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
//     }
//   };

//   useEffect(() => {
//     if (showPricePanel) {
//       Animated.timing(panelAnimation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(panelAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [showPricePanel]);

//   const calculatePrice = () => {
//     if (!pickupLocation || !dropoffLocation || !distance) return null;
//     const distanceKm = parseFloat(distance);
//     let baseFare = 0;
//     let perKm = 0;
//     switch (selectedRideType) {
//       case 'bike':
//         baseFare = 20;
//         perKm = 8;
//         break;
//       case 'taxi':
//         baseFare = 50;
//         perKm = 15;
//         break;
//       case 'port':
//         baseFare = 80;
//         perKm = 25;
//         break;
//       default:
//         baseFare = 50;
//         perKm = 15;
//     }
//     const multiplier = wantReturn ? 2 : 1;
//     return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
//   };

//   useEffect(() => {
//     if (pickupLocation && dropoffLocation && distance) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);

//   const handleRideTypeSelect = (type: string) => {
//     if (selectedRideType === type) {
//       return;
//     } else {
//       setSelectedRideType(type);
//       setShowPricePanel(true);
//       if (pickupLocation && dropoffLocation) {
//         const price = calculatePrice();
//         setEstimatedPrice(price);
//       }
//     }
//   };

//   const handleBookRide = async () => {
//     const token = await AsyncStorage.getItem('authToken');
//     if (!token) {
//       Alert.alert('Authentication Error', 'Please log in to book a ride');
//       return;
//     }
//     const userId = await AsyncStorage.getItem('userId') || 'U001';
//     if (!pickupLocation || !dropoffLocation) {
//       Alert.alert("Error", "Please select both pickup and dropoff locations");
//       return;
//     }
//     if (!estimatedPrice) {
//       Alert.alert("Error", "Price calculation failed. Please try again.");
//       return;
//     }
//     const rideId = "RID" + Date.now();
//     setCurrentRideId(rideId);
//     setRideStatus("searching");
//     socket.emit("bookRide", {
//       rideId,
//       userId,
//       pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
//       drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
//       vehicleType: selectedRideType,
//     });
//     Alert.alert("Searching for driver... 🚖");
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (!token) {
//         Alert.alert('Authentication Error', 'Please log in again to book a ride');
//         return;
//       }
//       const backendUrl = getBackendUrl();
//       const rideData = {
//         pickupLocation: pickup,
//         dropoffLocation: dropoff,
//         pickupCoordinates: pickupLocation,
//         dropoffCoordinates: dropoffLocation,
//         fare: estimatedPrice,
//         rideType: selectedRideType,
//         otp: bookingOTP,
//         distance,
//         travelTime,
//         isReturnTrip: wantReturn,
//       };
//       const response = await axios.post(
//         `${backendUrl}/api/users/book-ride`,
//         rideData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         }
//       );
//       if (response.data.success) {
//         if (response.data.ride && response.data.ride.customerId) {
//           await AsyncStorage.setItem('customerId', response.data.ride.customerId);
//         }
//         setShowConfirmModal(false);
//         Alert.alert(
//           'Booking Confirmed',
//           `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
//         );
//       } else {
//         throw new Error(response.data.error || 'Failed to book ride');
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
//         } else {
//           Alert.alert(
//             'Booking Failed',
//             error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.'
//           );
//         }
//       } else if (error.request) {
//         Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       } else {
//         Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
//       }
//       setApiError(error.message || 'Failed to book ride');
//     }
//   };

//   const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
//     try {
//       switch (type) {
//         case 'bike':
//           return <BikeIcon color={color} size={size} />;
//         case 'taxi':
//           return <TaxiIcon color={color} size={size} />;
//         case 'port':
//           return <PortIcon color={color} size={size} />;
//         default:
//           return <TaxiIcon color={color} size={size} />;
//       }
//     } catch (error) {
//       return <TaxiIcon color={color} size={size} />;
//     }
//   };

//   const renderSuggestionItem = (item: SuggestionType, onSelect: () => void, key: string) => {
//     let iconName = 'location-on';
//     let iconColor = '#A9A9A9';
    
//     if (item.type.includes('railway') || item.type.includes('station')) {
//       iconName = 'train';
//       iconColor = '#3F51B5';
//     } else if (item.type.includes('airport')) {
//       iconName = 'flight';
//       iconColor = '#2196F3';
//     } else if (item.type.includes('bus')) {
//       iconName = 'directions-bus';
//       iconColor = '#FF9800';
//     } else if (item.type.includes('hospital')) {
//       iconName = 'local-hospital';
//       iconColor = '#F44336';
//     } else if (item.type.includes('school') || item.type.includes('college')) {
//       iconName = 'school';
//       iconColor = '#4CAF50';
//     } else if (item.type.includes('place_of_worship')) {
//       iconName = 'church';
//       iconColor = '#9C27B0';
//     } else if (item.type.includes('shop') || item.type.includes('mall')) {
//       iconName = 'shopping-mall';
//       iconColor = '#E91E63';
//     } else if (item.type.includes('park')) {
//       iconName = 'park';
//       iconColor = '#4CAF50';
//     }
    
//     return (
//       <TouchableOpacity key={key} style={styles.suggestionItem} onPress={onSelect}>
//         <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
//         <View style={styles.suggestionTextContainer}>
//           <Text style={styles.suggestionMainText} numberOfLines={1}>
//             {extractMainName(item.name)}
//           </Text>
//           <Text style={styles.suggestionSubText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   const extractMainName = (fullName: string): string => {
//     const parts = fullName.split(',');
//     return parts[0].trim();
//   };

//   const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;

//   return (
//     <View style={styles.contentContainer}>
//       <View style={styles.mapContainer}>
//         {loadingLocation ? (
//           <Text style={styles.mapLoadingText}>Loading map...</Text>
//         ) : location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             region={mapRegion}
//             onRegionChangeComplete={(region) => setMapRegion(region)}
//             showsUserLocation
//             onPress={handleMapPress}
//           >
//             {pickupLocation && (
//               <Marker coordinate={pickupLocation} title="Pickup">
//                 <View style={styles.pickupLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#4CAF50" />
//                 </View>
//               </Marker>
//             )}
//             {dropoffLocation && (
//               <Marker coordinate={dropoffLocation} title="Dropoff">
//                 <View style={styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#F44336" />
//                 </View>
//               </Marker>
//             )}
//             {driverLocation && (
//               <Marker coordinate={driverLocation} title="Driver">
//                 <View style={styles.vehicleMarkerContainer}>
//                   {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
//                 </View>
//               </Marker>
//             )}
//             {nearbyDrivers.map((driver) => (
//               <Marker
//                 key={driver.driverId}
//                 coordinate={{
//                   latitude: driver.location.coordinates[1],
//                   longitude: driver.location.coordinates[0],
//                 }}
//                 title={`Driver ${driver.driverId}`}
//               >
//                 <View style={styles.driverMarker}>
//                   <MaterialIcons name="local-taxi" size={24} color="#FF0000" />
//                 </View>
//               </Marker>
//             ))}
//             {selectionMode && (
//               <Marker coordinate={{ 
//                 latitude: mapRegion.latitude, 
//                 longitude: mapRegion.longitude 
//               }}>
//                 <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
//                 </View>
//               </Marker>
//             )}
//             {routeCoords.length > 0 && (
//               <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
//             )}
//           </MapView>
//         ) : (
//           <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
//         )}
//       </View>
      
//       <View style={styles.driversCountContainer}>
//         <Text style={styles.driversCountText}>
//           Available Drivers Nearby: {nearbyDriversCount}
//         </Text>
//       </View>
      
//       <View style={styles.inputContainer}>
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Pickup Location"
//             value={pickup}
//             onChangeText={handlePickupChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'pickup' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showPickupSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {pickupLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : pickupSuggestions.length > 0 ? (
//               pickupSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectPickupSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
        
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Dropoff Location"
//             value={dropoff}
//             onChangeText={handleDropoffChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'dropoff' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showDropoffSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {dropoffLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : dropoffSuggestions.length > 0 ? (
//               dropoffSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectDropoffSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
      
//       {(distance || travelTime) && (
//         <View style={styles.distanceTimeContainer}>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
//             <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
//           </View>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
//             <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
//           </View>
//         </View>
//       )}
      
//       {apiError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{apiError}</Text>
//         </View>
//       )}
      
//       {(pickupLocation && dropoffLocation && !routeCoords.length) && (
//         <TouchableOpacity 
//           style={styles.seeRouteButton}
//           onPress={async () => {
//             if (pickupLocation && dropoffLocation) {
//               await fetchRouteBetween(pickupLocation, dropoffLocation);
//             }
//           }}
//         >
//           <Text style={styles.seeRouteButtonText}>See Route</Text>
//         </TouchableOpacity>
//       )}
      
//       <RideTypeSelector
//         selectedRideType={selectedRideType}
//         setSelectedRideType={handleRideTypeSelect}
//       />
      
//       <TouchableOpacity
//         style={[
//           styles.bookRideButton,
//           isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
//         ]}
//         onPress={handleBookRide}
//         disabled={!isBookRideButtonEnabled}
//       >
//         <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
//       </TouchableOpacity>
      
//       {showPricePanel && selectedRideType && (
//         <Animated.View
//           style={[
//             styles.pricePanel,
//             {
//               transform: [{
//                 translateY: panelAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [300, 0],
//                 }),
//               }],
//             },
//           ]}
//         >
//           <View style={styles.panelHeader}>
//             <Text style={styles.panelTitle}>Ride Details</Text>
//             <TouchableOpacity onPress={() => setShowPricePanel(false)}>
//               <MaterialIcons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.priceDetailsContainer}>
//             <View style={styles.vehicleIconContainer}>
//               {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
//             </View>
//             <View style={styles.priceInfoContainer}>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Pickup:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Drop-off:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Distance:</Text>
//                 <Text style={styles.priceValue}>{distance || '---'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Price:</Text>
//                 <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
//               </View>
//               <View style={styles.returnTripRow}>
//                 <Text style={styles.priceLabel}>Return trip:</Text>
//                 <Switch
//                   value={wantReturn}
//                   onValueChange={setWantReturn}
//                   trackColor={{ false: '#767577', true: '#4CAF50' }}
//                   thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={styles.bookButtonContainer}>
//             <TouchableOpacity
//               style={styles.bookMyRideButton}
//               onPress={handleBookRide}
//             >
//               <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Confirm Booking</Text>
//               <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
//                 <MaterialIcons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <View style={styles.modalIconContainer}>
//                 <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
//               </View>
//               <Text style={styles.modalMessage}>
//                 Thank you for choosing EAZY GO!
//               </Text>
//               <Text style={styles.modalSubMessage}>
//                 Your ride has been successfully booked.
//               </Text>
//               <View style={styles.otpContainer}>
//                 <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
//                 <Text style={styles.otpValue}>{bookingOTP}</Text>
//               </View>
//               <Text style={styles.otpWarning}>
//                 Please don't share it with anyone. Only share with our driver.
//               </Text>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowConfirmModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmBooking}
//               >
//                 <Text style={styles.modalConfirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   mapContainer: {
//     width: '100%',
//     height: Dimensions.get('window').height * 0.3,
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: { ...StyleSheet.absoluteFillObject },
//   mapLoadingText: {
//     color: '#757575',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   selectMapButton: {
//     backgroundColor: '#E0E0E0',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   activeSelectMapButton: {
//     backgroundColor: '#FF5722',
//   },
//   selectMapButtonText: {
//     color: '#333',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   seeRouteButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
//   seeRouteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   suggestionsContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   suggestionIcon: {
//     marginRight: 12,
//   },
//   suggestionTextContainer: {
//     flex: 1,
//   },
//   suggestionMainText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   suggestionSubText: {
//     fontSize: 12,
//     color: '#757575',
//     marginTop: 2,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   loadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#666666',
//   },
//   noSuggestionsContainer: {
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   noSuggestionsText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   distanceTimeContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   distanceTimeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   distanceTimeLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     marginRight: 8,
//   },
//   distanceTimeValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   driversCountContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   driversCountText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333333',
//     textAlign: 'center',
//   },
//   bookRideButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     width: '100%',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   enabledBookRideButton: {
//     backgroundColor: '#FF5722',
//   },
//   disabledBookRideButton: {
//     backgroundColor: '#BDBDBD',
//   },
//   bookRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     width: '100%',
//     backgroundColor: '#FFEBEE',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     borderLeftWidth: 4,
//     borderLeftColor: '#F44336',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//  pricePanel: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: Dimensions.get('window').height * 0.5,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   panelHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   panelTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   priceDetailsContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   vehicleIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   priceInfoContainer: {
//     flex: 1,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   priceLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     flex: 1,
//   },
//   priceValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   returnTripRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   bookButtonContainer: {
//     marginTop: 10,
//   },
//   bookMyRideButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bookMyRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   modalContent: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalIconContainer: {
//     marginBottom: 15,
//   },
//   modalMessage: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   modalSubMessage: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   otpContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 15,
//     width: '100%',
//   },
//   otpLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   otpValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF5722',
//   },
//   otpWarning: {
//     fontSize: 12,
//     color: '#F44336',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalCancelButton: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   modalCancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   modalConfirmButton: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   modalConfirmButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   pickupLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   dropoffLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   vehicleMarkerContainer: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   rideTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 15,
//   },
//   rideTypeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   selectedRideTypeButton: {
//     backgroundColor: '#FF5722',
//   },
//   rideTypeText: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   selectedRideTypeText: {
//     color: '#FFFFFF',
//   },
// });

// export default TaxiContent;






















































































































































































































































































































































// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
//   Animated,
//   Switch,
//   Modal,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import socket from '../../socket';
// import haversine from 'haversine-distance';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Svg, { Path, Circle, Rect } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBackendUrl } from '../../util/backendConfig';

// // Professional SVG icons (unchanged)
// const TaxiIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
//     <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
//     <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
//     <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
//     <Circle cx="6.5" cy="16" r="1.5" fill={color} />
//     <Circle cx="17.5" cy="16" r="1.5" fill={color} />
//   </Svg>
// );

// const PortIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
//     <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
//     <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
//   </Svg>
// );

// const BikeIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="18" cy="16" r="1" fill={color} />
//     <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="6" cy="16" r="1" fill={color} />
//     <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
//     <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
//     <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
//     <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
//   </Svg>
// );

// // RideTypeSelector component (unchanged)
// const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
//   return (
//     <View style={styles.rideTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'taxi' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('taxi')}
//       >
//         <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'taxi' && styles.selectedRideTypeText,
//         ]}>Taxi</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'bike' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('bike')}
//       >
//         <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'bike' && styles.selectedRideTypeText,
//         ]}>Bike</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'port' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('port')}
//       >
//         <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'port' && styles.selectedRideTypeText,
//         ]}>Port</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// interface SuggestionType {
//   id: string;
//   name: string;
//   address: string;
//   lat: string;
//   lon: string;
//   type: string;
//   importance: number;
// }

// interface DriverType {
//   driverId: string;
//   name: string;
//   location: {
//     coordinates: [number, number]; // [longitude, latitude]
//   };
//   vehicleType: string;
// }

// interface TaxiContentProps {
//   loadingLocation?: boolean;
//   pickup: string;
//   dropoff: string;
//   handlePickupChange: (text: string) => void;
//   handleDropoffChange: (text: string) => void;
// }

// const TaxiContent: React.FC<TaxiContentProps> = ({
//   loadingLocation: propLoadingLocation,
//   pickup,
//   dropoff,
//   handlePickupChange: propHandlePickupChange,
//   handleDropoffChange: propHandleDropoffChange,
// }) => {
//   const [isLoadingLocation, setIsLoadingLocation] = useState(true);
//   const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const [showPricePanel, setShowPricePanel] = useState(false);
//   const [wantReturn, setWantReturn] = useState(false);
//   const [distance, setDistance] = useState<string>('');
//   const [travelTime, setTravelTime] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingOTP, setBookingOTP] = useState<string>('');
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [location, setLocation] = useState<LocationType | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
//   const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
//   const [currentRideId, setCurrentRideId] = useState<string | null>(null);
//   const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
//   const [driverId, setDriverId] = useState<string | null>(null);
//   const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
//   const [travelledKm, setTravelledKm] = useState(0);
//   const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
//   const [nearbyDrivers, setNearbyDrivers] = useState<DriverType[]>([]);
//   const [nearbyDriversCount, setNearbyDriversCount] = useState<number>(0);
  
//   const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.1, // Wider initial view
//     longitudeDelta: 0.1,
//   });
//   const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
//   const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
//   const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
//   const [pickupLoading, setPickupLoading] = useState(false);
//   const [dropoffLoading, setDropoffLoading] = useState(false);
//   const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
//   const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
//   const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
//   const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
//   const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
//   const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const panelAnimation = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef<MapView | null>(null);

//   // Calculate distance between two coordinates
//   const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     const distance = R * c;
//     return distance;
//   };

//   // Fetch nearby drivers via Socket.IO
//   const fetchNearbyDrivers = (latitude: number, longitude: number) => {
//     socket.emit("requestNearbyDrivers", { latitude, longitude, radius: 5000 }); // 5km radius
//   };

//   useEffect(() => {
//     const requestLocation = async () => {
//       setIsLoadingLocation(true);
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
//           Alert.alert("Permission Denied", "Location permission is required to proceed.");
//           setIsLoadingLocation(false);
//           return;
//         }
//       }
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
//           setLocation(loc);
//           setPickupLocation(loc);
//           setMapRegion({
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             latitudeDelta: 0.1,
//             longitudeDelta: 0.1,
//           });
//           propHandlePickupChange("My Current Location");
//           setIsPickupCurrent(true);
//           setIsLoadingLocation(false);
//           fetchNearbyDrivers(loc.latitude, loc.longitude); // Fetch nearby drivers on load
//         },
//         (err) => {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
//           setIsLoadingLocation(false);
//           Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           distanceFilter: 10,
//         }
//       );
//     };
//     requestLocation();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (location && (rideStatus === "idle" || rideStatus === "searching")) {
//         Geolocation.getCurrentPosition(
//           (pos) => {
//             const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//             setLocation(newLoc);
//             if (isPickupCurrent && dropoffLocation) {
//               setPickupLocation(newLoc);
//               fetchRouteBetween(newLoc, dropoffLocation);
//             }
//             fetchNearbyDrivers(newLoc.latitude, newLoc.longitude); // Update nearby drivers every 5 seconds
//           },
//           (err) => {
//             console.error("Live location error:", err);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [rideStatus, isPickupCurrent, dropoffLocation, location]);

//   // Handle initial nearby drivers response
//   useEffect(() => {
//     const handleNearbyDriversResponse = (data: { drivers: DriverType[] }) => {
//       if (!location) return;

//       const filteredDrivers = data.drivers
//         .filter(driver => {
//           const distance = calculateDistance(
//             location.latitude,
//             location.longitude,
//             driver.location.coordinates[1], // latitude
//             driver.location.coordinates[0]  // longitude
//           );
//           return distance <= 5; // 5km radius
//         })
//         .sort((a, b) => calculateDistance(location.latitude, location.longitude, a.location.coordinates[1], a.location.coordinates[0]) -
//                          calculateDistance(location.latitude, location.longitude, b.location.coordinates[1], b.location.coordinates[0]))
//         .slice(0, 10); // Limit to 10 drivers

//       setNearbyDrivers(filteredDrivers);
//       setNearbyDriversCount(filteredDrivers.length);
//     };

//     socket.on("nearbyDriversResponse", handleNearbyDriversResponse);
//     return () => socket.off("nearbyDriversResponse", handleNearbyDriversResponse);
//   }, [location]);

//   // Handle real-time driver location updates
//   useEffect(() => {
//     const handleDriverLiveLocationUpdate = (data: { driverId: string; lat: number; lng: number }) => {
//       if (!location) return;

//       setNearbyDrivers((prev) => {
//         const updated = prev.map(d =>
//           d.driverId === data.driverId
//             ? { ...d, location: { coordinates: [data.lng, data.lat] } }
//             : d
//         );
//         if (!updated.find(d => d.driverId === data.driverId)) {
//           updated.push({
//             driverId: data.driverId,
//             name: `Driver ${data.driverId}`,
//             location: { coordinates: [data.lng, data.lat] },
//             vehicleType: "taxi",
//           });
//         }
//         // Sort by distance and limit to 10
//         return updated
//           .filter(driver => {
//             const distance = calculateDistance(
//               location.latitude,
//               location.longitude,
//               driver.location.coordinates[1],
//               driver.location.coordinates[0]
//             );
//             return distance <= 5;
//           })
//           .sort((a, b) => calculateDistance(location.latitude, location.longitude, a.location.coordinates[1], a.location.coordinates[0]) -
//                            calculateDistance(location.latitude, location.longitude, b.location.coordinates[1], b.location.coordinates[0]))
//           .slice(0, 10);
//       });
//       setNearbyDriversCount(Math.min(10, nearbyDrivers.length + 1));
//     };

//     socket.on("driverLiveLocationUpdate", handleDriverLiveLocationUpdate);
//     return () => socket.off("driverLiveLocationUpdate", handleDriverLiveLocationUpdate);
//   }, [location]);

//   // Listen for ride-related updates (unchanged)
//   useEffect(() => {
//     if (!currentRideId) return;
//     const rideAccepted = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus("onTheWay");
//         setDriverId(data.driverId);
//         Alert.alert("Driver on the way 🚖");
//       }
//     };
//     const driverLocUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         const coords = { latitude: data.lat, longitude: data.lng };
//         setDriverLocation(coords);
//         if (lastCoord) {
//           const dist = haversine(lastCoord, coords);
//           setTravelledKm(prev => prev + dist / 1000);
//         }
//         setLastCoord(coords);
//       }
//     };
//     const rideStatusUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus(data.status);
//         if (data.status === "completed") {
//           Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
//           setTimeout(() => {
//             setCurrentRideId(null);
//             setDriverId(null);
//             setDriverLocation(null);
//             setRouteCoords([]);
//             setPickupLocation(null);
//             setDropoffLocation(null);
//             propHandlePickupChange("");
//             propHandleDropoffChange("");
//             setRideStatus("idle");
//           }, 3000);
//         }
//       }
//     };
//     const rideOtpListener = ({ rideId, otp }: any) => {
//       if (rideId === currentRideId) {
//         setBookingOTP(otp);
//         setShowConfirmModal(true);
//         Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
//       }
//     };
//     socket.on("rideAccepted", rideAccepted);
//     socket.on("driverLocationUpdate", driverLocUpdate);
//     socket.on("rideStatusUpdate", rideStatusUpdate);
//     socket.on("rideOTP", rideOtpListener);
//     return () => {
//       socket.off("rideAccepted", rideAccepted);
//       socket.off("driverLocationUpdate", driverLocUpdate);
//       socket.off("rideStatusUpdate", rideStatusUpdate);
//       socket.off("rideOTP", rideOtpListener);
//     };
//   }, [currentRideId, lastCoord, travelledKm]);

//   useEffect(() => {
//     if (driverLocation) {
//       let dest: LocationType | null = null;
//       if (rideStatus === "onTheWay" || rideStatus === "arrived") {
//         dest = pickupLocation;
//       } else if (rideStatus === "started") {
//         dest = dropoffLocation;
//       }
//       if (dest) {
//         fetchRouteBetween(driverLocation, dest);
//       }
//     } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
//       fetchRouteBetween(pickupLocation, dropoffLocation);
//     }
//     if (rideStatus === "completed") {
//       setRouteCoords([]);
//     }
//   }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);

//   const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
//     try {
//       console.log(`Fetching suggestions for: ${query}`);
//       const cache = type === 'pickup' ? pickupCache : dropoffCache;
//       if (cache[query]) {
//         console.log(`Returning cached suggestions for: ${query}`);
//         return cache[query];
//       }
//       if (type === 'pickup') setPickupLoading(true);
//       else setDropoffLoading(true);
//       setSuggestionsError(null);
//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
//       console.log(`API URL: ${url}`);
      
//       const response = await fetch(url, {
//         headers: { 'User-Agent': 'EAZYGOApp/1.0' },
//       });
      
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error('Invalid response format');
      
//       const suggestions: SuggestionType[] = data.map((item: any) => ({
//         id: item.place_id || `${item.lat}-${item.lon}`,
//         name: item.display_name,
//         address: extractAddress(item),
//         lat: item.lat,
//         lon: item.lon,
//         type: item.type || 'unknown',
//         importance: item.importance || 0,
//       }));
//       if (type === 'pickup') setPickupCache(prev => ({ ...prev, [query]: suggestions }));
//       else setDropoffCache(prev => ({ ...prev, [query]: suggestions }));
//       return suggestions;
//     } catch (error: any) {
//       console.error('Suggestions fetch error:', error);
//       setSuggestionsError(error.message || 'Failed to fetch suggestions');
//       return [];
//     } finally {
//       if (type === 'pickup') setPickupLoading(false);
//       else setDropoffLoading(false);
//     }
//   };

//   const extractAddress = (item: any): string => {
//     if (item.address) {
//       const parts = [];
//       if (item.address.road) parts.push(item.address.road);
//       if (item.address.suburb) parts.push(item.address.suburb);
//       if (item.address.city || item.address.town || item.address.village) parts.push(item.address.city || item.address.town || item.address.village);
//       if (item.address.state) parts.push(item.address.state);
//       if (item.address.postcode) parts.push(item.address.postcode);
//       return parts.join(', ');
//     }
//     return item.display_name;
//   };

//   const handlePickupChange = (text: string) => {
//     console.log(`handlePickupChange called with: "${text}"`);
//     propHandlePickupChange(text);
//     if (pickupDebounceTimer.current) {
//       clearTimeout(pickupDebounceTimer.current);
//       pickupDebounceTimer.current = null;
//     }
//     if (text.length > 2) {
//       setPickupLoading(true);
//       setShowPickupSuggestions(true);
//       pickupDebounceTimer.current = setTimeout(async () => {
//         const sugg = await fetchSuggestions(text, 'pickup');
//         setPickupSuggestions(sugg);
//         setPickupLoading(false);
//       }, 500);
//     } else {
//       setShowPickupSuggestions(false);
//       setPickupSuggestions([]);
//     }
//   };

//   const handleDropoffChange = (text: string) => {
//     console.log(`handleDropoffChange called with: "${text}"`);
//     propHandleDropoffChange(text);
//     if (dropoffDebounceTimer.current) {
//       clearTimeout(dropoffDebounceTimer.current);
//       dropoffDebounceTimer.current = null;
//     }
//     if (text.length > 2) {
//       setDropoffLoading(true);
//       setShowDropoffSuggestions(true);
//       dropoffDebounceTimer.current = setTimeout(async () => {
//         const sugg = await fetchSuggestions(text, 'dropoff');
//         setDropoffSuggestions(sugg);
//         setDropoffLoading(false);
//       }, 500);
//     } else {
//       setShowDropoffSuggestions(false);
//       setDropoffSuggestions([]);
//     }
//   };

//   const selectPickupSuggestion = (suggestion: SuggestionType) => {
//     propHandlePickupChange(suggestion.name);
//     setPickupLocation({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
//     setShowPickupSuggestions(false);
//     setIsPickupCurrent(false);
//     if (dropoffLocation) fetchRouteBetween({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) }, dropoffLocation);
//     fetchNearbyDrivers(parseFloat(suggestion.lat), parseFloat(suggestion.lon));
//   };

//   const selectDropoffSuggestion = (suggestion: SuggestionType) => {
//     propHandleDropoffChange(suggestion.name);
//     setDropoffLocation({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
//     setShowDropoffSuggestions(false);
//     if (pickupLocation) fetchRouteBetween(pickupLocation, { latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
//   };

//   const getAddressFromCoordinates = async (coords: LocationType) => {
//     setReverseGeocoding(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
//         { headers: { 'User-Agent': 'EAZYGOApp/1.0' } }
//       );
//       const data = await response.json();
//       return data.display_name || 'Selected Location';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       Alert.alert('Error', 'Failed to get address from coordinates.');
//       return 'Selected Location';
//     } finally {
//       setReverseGeocoding(false);
//     }
//   };

//   const handleMapPress = async (e: any) => {
//     if (selectionMode) {
//       setReverseGeocoding(true);
//       const coords = e.nativeEvent.coordinate;
//       const address = await getAddressFromCoordinates(coords);
//       if (selectionMode === 'pickup') {
//         setPickupLocation(coords);
//         handlePickupChange(address);
//         setIsPickupCurrent(false);
//         fetchNearbyDrivers(coords.latitude, coords.longitude);
//       } else if (selectionMode === 'dropoff') {
//         setDropoffLocation(coords);
//         handleDropoffChange(address);
//         if (pickupLocation) await fetchRouteBetween(pickupLocation, coords);
//       }
//       setSelectionMode(null);
//       setReverseGeocoding(false);
//     } else {
//       const coords = e.nativeEvent.coordinate;
//       if (!pickupLocation) {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         fetchNearbyDrivers(coords.latitude, coords.longitude);
//       } else if (!dropoffLocation) {
//         setDropoffLocation(coords);
//         handleDropoffChange("Dropoff Selected");
//         await fetchRouteBetween(pickupLocation, coords);
//       } else {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         setDropoffLocation(null);
//         handleDropoffChange("");
//         setRouteCoords([]);
//         fetchNearbyDrivers(coords.latitude, coords.longitude);
//       }
//     }
//   };

//   const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
//     try {
//       const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.code === "Ok" && data.routes.length > 0) {
//         const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
//         setRouteCoords(coords);
//         setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
//         setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
//       } else {
//         setApiError("Failed to fetch route");
//         Alert.alert("Route Error", "Could not find route. Please try different locations.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRouteCoords([]);
//       setApiError("Network error fetching route");
//       Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
//     }
//   };

//   useEffect(() => {
//     if (showPricePanel) {
//       Animated.timing(panelAnimation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(panelAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [showPricePanel]);

//   const calculatePrice = () => {
//     if (!pickupLocation || !dropoffLocation || !distance) return null;
//     const distanceKm = parseFloat(distance);
//     let baseFare = 0;
//     let perKm = 0;
//     switch (selectedRideType) {
//       case 'bike': baseFare = 20; perKm = 8; break;
//       case 'taxi': baseFare = 50; perKm = 15; break;
//       case 'port': baseFare = 80; perKm = 25; break;
//       default: baseFare = 50; perKm = 15;
//     }
//     const multiplier = wantReturn ? 2 : 1;
//     return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
//   };

//   useEffect(() => {
//     if (pickupLocation && dropoffLocation && distance) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);

//   const handleRideTypeSelect = (type: string) => {
//     if (selectedRideType === type) return;
//     setSelectedRideType(type);
//     setShowPricePanel(true);
//     if (pickupLocation && dropoffLocation) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   };

//   const handleBookRide = async () => {
//     const token = await AsyncStorage.getItem('authToken');
//     if (!token) {
//       Alert.alert('Authentication Error', 'Please log in to book a ride');
//       return;
//     }
//     const userId = await AsyncStorage.getItem('userId') || 'U001';
//     if (!pickupLocation || !dropoffLocation) {
//       Alert.alert("Error", "Please select both pickup and dropoff locations");
//       return;
//     }
//     if (!estimatedPrice) {
//       Alert.alert("Error", "Price calculation failed. Please try again.");
//       return;
//     }
//     const rideId = "RID" + Date.now();
//     setCurrentRideId(rideId);
//     setRideStatus("searching");
//     socket.emit("bookRide", {
//       rideId,
//       userId,
//       pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
//       drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
//       vehicleType: selectedRideType,
//     });
//     Alert.alert("Searching for driver... 🚖");
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (!token) {
//         Alert.alert('Authentication Error', 'Please log in again to book a ride');
//         return;
//       }
//       const backendUrl = getBackendUrl();
//       const rideData = {
//         pickupLocation: pickup,
//         dropoffLocation: dropoff,
//         pickupCoordinates: pickupLocation,
//         dropoffCoordinates: dropoffLocation,
//         fare: estimatedPrice,
//         rideType: selectedRideType,
//         otp: bookingOTP,
//         distance,
//         travelTime,
//         isReturnTrip: wantReturn,
//       };
//       const response = await axios.post(
//         `${backendUrl}/api/users/book-ride`,
//         rideData,
//         { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, timeout: 10000 }
//       );
//       if (response.data.success) {
//         if (response.data.ride && response.data.ride.customerId) await AsyncStorage.setItem('customerId', response.data.ride.customerId);
//         setShowConfirmModal(false);
//         Alert.alert(
//           'Booking Confirmed',
//           `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
//         );
//       } else throw new Error(response.data.error || 'Failed to book ride');
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 401) Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
//         else Alert.alert('Booking Failed', error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.');
//       } else if (error.request) Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       else Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
//       setApiError(error.message || 'Failed to book ride');
//     }
//   };

//   const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
//     try {
//       switch (type) {
//         case 'bike': return <BikeIcon color={color} size={size} />;
//         case 'taxi': return <TaxiIcon color={color} size={size} />;
//         case 'port': return <PortIcon color={color} size={size} />;
//         default: return <TaxiIcon color={color} size={size} />;
//       }
//     } catch (error) {
//       return <TaxiIcon color={color} size={size} />;
//     }
//   };

//   const renderSuggestionItem = (item: SuggestionType, onSelect: () => void, key: string) => {
//     let iconName = 'location-on';
//     let iconColor = '#A9A9A9';
//     if (item.type.includes('railway') || item.type.includes('station')) { iconName = 'train'; iconColor = '#3F51B5'; }
//     else if (item.type.includes('airport')) { iconName = 'flight'; iconColor = '#2196F3'; }
//     else if (item.type.includes('bus')) { iconName = 'directions-bus'; iconColor = '#FF9800'; }
//     else if (item.type.includes('hospital')) { iconName = 'local-hospital'; iconColor = '#F44336'; }
//     else if (item.type.includes('school') || item.type.includes('college')) { iconName = 'school'; iconColor = '#4CAF50'; }
//     else if (item.type.includes('place_of_worship')) { iconName = 'church'; iconColor = '#9C27B0'; }
//     else if (item.type.includes('shop') || item.type.includes('mall')) { iconName = 'shopping-mall'; iconColor = '#E91E63'; }
//     else if (item.type.includes('park')) { iconName = 'park'; iconColor = '#4CAF50'; }
    
//     return (
//       <TouchableOpacity key={key} style={styles.suggestionItem} onPress={onSelect}>
//         <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
//         <View style={styles.suggestionTextContainer}>
//           <Text style={styles.suggestionMainText} numberOfLines={1}>{extractMainName(item.name)}</Text>
//           <Text style={styles.suggestionSubText} numberOfLines={1}>{item.address}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   const extractMainName = (fullName: string): string => {
//     const parts = fullName.split(',');
//     return parts[0].trim();
//   };

//   const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;

//   return (
//     <View style={styles.contentContainer}>
//       <View style={styles.mapContainer}>
//         {isLoadingLocation ? (
//           <View style={styles.mapLoadingContainer}>
//             <ActivityIndicator size="large" color="#4CAF50" />
//             <Text style={styles.mapLoadingText}>Loading map...</Text>
//           </View>
//         ) : location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             region={mapRegion}
//             onRegionChangeComplete={(region) => setMapRegion(region)}
//             showsUserLocation
//             onPress={handleMapPress}
//           >
//             {pickupLocation && (
//               <Marker coordinate={pickupLocation} title="Pickup">
//                 <View style={styles.pickupLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#4CAF50" />
//                 </View>
//               </Marker>
//             )}
//             {dropoffLocation && (
//               <Marker coordinate={dropoffLocation} title="Dropoff">
//                 <View style={styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#F44336" />
//                 </View>
//               </Marker>
//             )}
//             {driverLocation && (
//               <Marker coordinate={driverLocation} title="Driver">
//                 <View style={styles.vehicleMarkerContainer}>
//                   {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
//                 </View>
//               </Marker>
//             )}
//             {nearbyDrivers.map((driver) => (
//               <Marker
//                 key={driver.driverId}
//                 coordinate={{
//                   latitude: driver.location.coordinates[1], // latitude
//                   longitude: driver.location.coordinates[0], // longitude
//                 }}
//                 title={driver.name}
//               >
//                 <View style={styles.driverMarker}>
//                   <MaterialIcons name="local-taxi" size={24} color="#FF0000" /> {/* Red dot */}
//                 </View>
//               </Marker>
//             ))}
//             {selectionMode && (
//               <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}>
//                 <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
//                 </View>
//               </Marker>
//             )}
//             {routeCoords.length > 0 && (
//               <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
//             )}
//           </MapView>
//         ) : (
//           <View style={styles.mapLoadingContainer}>
//             <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
//           </View>
//         )}
//       </View>
      
//       <View style={styles.driversCountContainer}>
//         <Text style={styles.driversCountText}>
//           Available Drivers Nearby: {nearbyDriversCount}
//         </Text>
//       </View>
      
//       <View style={styles.inputContainer}>
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Pickup Location"
//             value={pickup}
//             onChangeText={handlePickupChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'pickup' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showPickupSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {pickupLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : pickupSuggestions.length > 0 ? (
//               pickupSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectPickupSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
        
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Dropoff Location"
//             value={dropoff}
//             onChangeText={handleDropoffChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'dropoff' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showDropoffSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {dropoffLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : dropoffSuggestions.length > 0 ? (
//               dropoffSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectDropoffSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
      
//       {(distance || travelTime) && (
//         <View style={styles.distanceTimeContainer}>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
//             <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
//           </View>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
//             <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
//           </View>
//         </View>
//       )}
      
//       {apiError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{apiError}</Text>
//         </View>
//       )}
      
//       {(pickupLocation && dropoffLocation && !routeCoords.length) && (
//         <TouchableOpacity 
//           style={styles.seeRouteButton}
//           onPress={async () => {
//             if (pickupLocation && dropoffLocation) await fetchRouteBetween(pickupLocation, dropoffLocation);
//           }}
//         >
//           <Text style={styles.seeRouteButtonText}>See Route</Text>
//         </TouchableOpacity>
//       )}
      
//       <RideTypeSelector
//         selectedRideType={selectedRideType}
//         setSelectedRideType={handleRideTypeSelect}
//       />
      
//       <TouchableOpacity
//         style={[
//           styles.bookRideButton,
//           isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
//         ]}
//         onPress={handleBookRide}
//         disabled={!isBookRideButtonEnabled}
//       >
//         <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
//       </TouchableOpacity>
      
//       {showPricePanel && selectedRideType && (
//         <Animated.View
//           style={[
//             styles.pricePanel,
//             {
//               transform: [{
//                 translateY: panelAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [300, 0],
//                 }),
//               }],
//             },
//           ]}
//         >
//           <View style={styles.panelHeader}>
//             <Text style={styles.panelTitle}>Ride Details</Text>
//             <TouchableOpacity onPress={() => setShowPricePanel(false)}>
//               <MaterialIcons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.priceDetailsContainer}>
//             <View style={styles.vehicleIconContainer}>
//               {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
//             </View>
//             <View style={styles.priceInfoContainer}>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Pickup:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Drop-off:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Distance:</Text>
//                 <Text style={styles.priceValue}>{distance || '---'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Price:</Text>
//                 <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
//               </View>
//               <View style={styles.returnTripRow}>
//                 <Text style={styles.priceLabel}>Return trip:</Text>
//                 <Switch
//                   value={wantReturn}
//                   onValueChange={setWantReturn}
//                   trackColor={{ false: '#767577', true: '#4CAF50' }}
//                   thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={styles.bookButtonContainer}>
//             <TouchableOpacity
//               style={styles.bookMyRideButton}
//               onPress={handleBookRide}
//             >
//               <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Confirm Booking</Text>
//               <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
//                 <MaterialIcons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <View style={styles.modalIconContainer}>
//                 <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
//               </View>
//               <Text style={styles.modalMessage}>
//                 Thank you for choosing EAZY GO!
//               </Text>
//               <Text style={styles.modalSubMessage}>
//                 Your ride has been successfully booked.
//               </Text>
//               <View style={styles.otpContainer}>
//                 <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
//                 <Text style={styles.otpValue}>{bookingOTP}</Text>
//               </View>
//               <Text style={styles.otpWarning}>
//                 Please don't share it with anyone. Only share with our driver.
//               </Text>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowConfirmModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmBooking}
//               >
//                 <Text style={styles.modalConfirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // [Styles remain unchanged, refer to previous code]
//   contentContainer: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F5F5F5' },
//   mapContainer: { width: '100%', height: Dimensions.get('window').height * 0.3, borderRadius: 15, overflow: 'hidden', marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
//   map: { ...StyleSheet.absoluteFillObject },
//   mapLoadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   mapLoadingText: { color: '#757575', fontSize: 16, textAlign: 'center', padding: 20 },
//   inputContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
//   selectMapButton: { backgroundColor: '#E0E0E0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginLeft: 10 },
//   activeSelectMapButton: { backgroundColor: '#FF5722' },
//   selectMapButtonText: { color: '#333', fontSize: 12, fontWeight: '600' },
//   seeRouteButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 15, width: '100%' },
//   seeRouteButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
//   suggestionsContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   suggestionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
//   suggestionIcon: { marginRight: 12 },
//   suggestionTextContainer: { flex: 1 },
//   suggestionMainText: { fontSize: 16, fontWeight: '500', color: '#333333' },
//   suggestionSubText: { fontSize: 12, color: '#757575', marginTop: 2 },
//   loadingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
//   loadingText: { marginLeft: 8, fontSize: 14, color: '#666666' },
//   noSuggestionsContainer: { paddingVertical: 12, alignItems: 'center' },
//   noSuggestionsText: { fontSize: 14, color: '#666666' },
//   distanceTimeContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   distanceTimeItem: { flexDirection: 'row', alignItems: 'center' },
//   distanceTimeLabel: { fontSize: 14, fontWeight: '600', color: '#757575', marginRight: 8 },
//   distanceTimeValue: { fontSize: 14, fontWeight: 'bold', color: '#333333' },
//   driversCountContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginBottom: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   driversCountText: { fontSize: 16, fontWeight: '600', color: '#333333', textAlign: 'center' },
//   bookRideButton: { paddingVertical: 15, borderRadius: 12, marginBottom: 15, width: '100%', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
//   enabledBookRideButton: { backgroundColor: '#FF5722' },
//   disabledBookRideButton: { backgroundColor: '#BDBDBD' },
//   bookRideButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
//   errorContainer: { width: '100%', backgroundColor: '#FFEBEE', borderRadius: 12, padding: 15, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#F44336' },
//   errorText: { color: '#D32F2F', fontSize: 14, textAlign: 'center' },
//   pricePanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: Dimensions.get('window').height * 0.5, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.2, shadowRadius: 6 },
//   panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
//   panelTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
//   priceDetailsContainer: { flexDirection: 'row', marginBottom: 15 },
//   vehicleIconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#E0E0E0' },
//   priceInfoContainer: { flex: 1 },
//   priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#757575', flex: 1 },
//   priceValue: { fontSize: 14, fontWeight: 'bold', color: '#333333', flex: 2, textAlign: 'right' },
//   returnTripRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
//   bookButtonContainer: { marginTop: 10 },
//   bookMyRideButton: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 12, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
//   bookMyRideButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
//   modalContainer: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6 },
//   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
//   modalContent: { alignItems: 'center', marginBottom: 20 },
//   modalIconContainer: { marginBottom: 15 },
//   modalMessage: { fontSize: 18, fontWeight: 'bold', color: '#333333', textAlign: 'center', marginBottom: 5 },
//   modalSubMessage: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 20 },
//   otpContainer: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 15, width: '100%' },
//   otpLabel: { fontSize: 14, color: '#666666', marginBottom: 5 },
//   otpValue: { fontSize: 24, fontWeight: 'bold', color: '#FF5722' },
//   otpWarning: { fontSize: 12, color: '#F44336', textAlign: 'center', fontStyle: 'italic' },
//   modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
//   modalCancelButton: { flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 12, borderRadius: 10, marginRight: 10, alignItems: 'center' },
//   modalCancelButtonText: { fontSize: 16, fontWeight: '600', color: '#666666' },
//   modalConfirmButton: { flex: 1, backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 10, marginLeft: 10, alignItems: 'center' },
//   modalConfirmButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
//   pickupLocationMarker: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
//   dropoffLocationMarker: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
//   vehicleMarkerContainer: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
//   rideTypeContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
//   rideTypeButton: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, width: '30%', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   selectedRideTypeButton: { backgroundColor: '#FF5722' },
//   rideTypeText: { marginTop: 5, fontSize: 14, fontWeight: '600', color: '#333333' },
//   selectedRideTypeText: { color: '#FFFFFF' },
//   driverMarker: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
// });

// export default TaxiContent;






















































































































































































































































































// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
//   Animated,
//   Switch,
//   Modal,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import socket from '../../socket';
// import haversine from 'haversine-distance';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Svg, { Path, Circle, Rect } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBackendUrl } from '../../util/backendConfig';

// // Professional SVG icons
// const TaxiIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
//     <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
//     <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
//     <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
//     <Circle cx="6.5" cy="16" r="1.5" fill={color} />
//     <Circle cx="17.5" cy="16" r="1.5" fill={color} />
//   </Svg>
// );
// const PortIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
//     <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
//     <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
//   </Svg>
// );
// const BikeIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="18" cy="16" r="1" fill={color} />
//     <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="6" cy="16" r="1" fill={color} />
//     <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
//     <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
//     <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
//     <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
//   </Svg>
// );

// // RideTypeSelector component
// const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
//   return (
//     <View style={styles.rideTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'taxi' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('taxi')}
//       >
//         <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'taxi' && styles.selectedRideTypeText,
//         ]}>Taxi</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'bike' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('bike')}
//       >
//         <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'bike' && styles.selectedRideTypeText,
//         ]}>Bike</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'port' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('port')}
//       >
//         <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'port' && styles.selectedRideTypeText,
//         ]}>Port</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// interface SuggestionType {
//   id: string;
//   name: string;
//   address: string;
//   lat: string;
//   lon: string;
//   type: string;
//   importance: number;
// }

// interface TaxiContentProps {
//   loadingLocation: boolean;
//   pickup: string;
//   dropoff: string;
//   handlePickupChange: (text: string) => void;
//   handleDropoffChange: (text: string) => void;
//   setLoadingLocation: (loading: boolean) => void;
// }

// const TaxiContent: React.FC<TaxiContentProps> = ({
//   loadingLocation,
//   pickup,
//   dropoff,
//   handlePickupChange: propHandlePickupChange,
//   handleDropoffChange: propHandleDropoffChange,
//   setLoadingLocation,
// }) => {
//   const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const [showPricePanel, setShowPricePanel] = useState(false);
//   const [wantReturn, setWantReturn] = useState(false);
//   const [distance, setDistance] = useState<string>('');
//   const [travelTime, setTravelTime] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingOTP, setBookingOTP] = useState<string>('');
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [location, setLocation] = useState<LocationType | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
//   const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
//   const [currentRideId, setCurrentRideId] = useState<string | null>(null);
//   const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
//   const [driverId, setDriverId] = useState<string | null>(null);
//   const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
//   const [travelledKm, setTravelledKm] = useState(0);
//   const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
  
//   const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });
//   const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
//   const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
//   const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
//   const [pickupLoading, setPickupLoading] = useState(false);
//   const [dropoffLoading, setDropoffLoading] = useState(false);
//   const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
//   const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
//   const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
//   const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
//   const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
//   const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const panelAnimation = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef<MapView | null>(null);

//   useEffect(() => {
//     const requestLocation = async () => {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
//           Alert.alert("Permission Denied", "Location permission is required to proceed.");
//           setLoadingLocation(false);
//           return;
//         }
//       }
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
//           setLocation(loc);
//           setPickupLocation(loc);
//           setMapRegion({
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           });
//           propHandlePickupChange("My Current Location");
//           setIsPickupCurrent(true);
//           setLoadingLocation(false);
//         },
//         (err) => {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
//           setLoadingLocation(false);
//           Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           distanceFilter: 10,
//         }
//       );
//     };
//     requestLocation();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           setLocation(newLoc);
//           if (rideStatus === "idle" && isPickupCurrent && dropoffLocation) {
//             setPickupLocation(newLoc);
//             fetchRouteBetween(newLoc, dropoffLocation);
//           }
//         },
//         (err) => {
//           console.error("Live location error:", err);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [rideStatus, isPickupCurrent, dropoffLocation]);

//   useEffect(() => {
//     if (!currentRideId) return;
//     const rideAccepted = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus("onTheWay");
//         setDriverId(data.driverId);
//         Alert.alert("Driver on the way 🚖");
//       }
//     };
//     const driverLocUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         const coords = { latitude: data.lat, longitude: data.lng };
//         setDriverLocation(coords);
//         if (lastCoord) {
//           const dist = haversine(lastCoord, coords);
//           setTravelledKm(prev => prev + dist / 1000);
//         }
//         setLastCoord(coords);
//       }
//     };
//     const rideStatusUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus(data.status);
//         if (data.status === "completed") {
//           Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
//           setTimeout(() => {
//             setCurrentRideId(null);
//             setDriverId(null);
//             setDriverLocation(null);
//             setRouteCoords([]);
//             setPickupLocation(null);
//             setDropoffLocation(null);
//             propHandlePickupChange("");
//             propHandleDropoffChange("");
//             setRideStatus("idle");
//           }, 3000);
//         }
//       }
//     };
//     const rideOtpListener = ({ rideId, otp }: any) => {
//       if (rideId === currentRideId) {
//         setBookingOTP(otp);
//         setShowConfirmModal(true);
//         Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
//       }
//     };
//     socket.on("rideAccepted", rideAccepted);
//     socket.on("driverLocationUpdate", driverLocUpdate);
//     socket.on("rideStatusUpdate", rideStatusUpdate);
//     socket.on("rideOTP", rideOtpListener);
//     return () => {
//       socket.off("rideAccepted", rideAccepted);
//       socket.off("driverLocationUpdate", driverLocUpdate);
//       socket.off("rideStatusUpdate", rideStatusUpdate);
//       socket.off("rideOTP", rideOtpListener);
//     };
//   }, [currentRideId, lastCoord, travelledKm]);

//   useEffect(() => {
//     if (driverLocation) {
//       let dest: LocationType | null = null;
//       if (rideStatus === "onTheWay" || rideStatus === "arrived") {
//         dest = pickupLocation;
//       } else if (rideStatus === "started") {
//         dest = dropoffLocation;
//       }
//       if (dest) {
//         fetchRouteBetween(driverLocation, dest);
//       }
//     } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
//       fetchRouteBetween(pickupLocation, dropoffLocation);
//     }
//     if (rideStatus === "completed") {
//       setRouteCoords([]);
//     }
//   }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);

//   const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
//     try {
//       console.log(`Fetching suggestions for: ${query}`);
      
//       const cache = type === 'pickup' ? pickupCache : dropoffCache;
//       if (cache[query]) {
//         console.log(`Returning cached suggestions for: ${query}`);
//         return cache[query];
//       }

//       if (type === 'pickup') setPickupLoading(true);
//       else setDropoffLoading(true);
//       setSuggestionsError(null);

//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
//       console.log(`API URL: ${url}`);
      
//       const response = await fetch(url, {
//         headers: {
//           'User-Agent': 'EAZYGOApp/1.0',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(`API response:`, data);
      
//       if (!Array.isArray(data)) {
//         throw new Error('Invalid response format');
//       }

//       const suggestions: SuggestionType[] = data.map((item: any) => ({
//         id: item.place_id || `${item.lat}-${item.lon}`,
//         name: item.display_name,
//         address: extractAddress(item),
//         lat: item.lat,
//         lon: item.lon,
//         type: item.type || 'unknown',
//         importance: item.importance || 0
//       }));

//       if (type === 'pickup') setPickupCache(prev => ({ ...prev, [query]: suggestions }));
//       else setDropoffCache(prev => ({ ...prev, [query]: suggestions }));

//       console.log(`Processed suggestions:`, suggestions);
//       return suggestions;
//     } catch (error: any) {
//       console.error('Suggestions fetch error:', error);
//       setSuggestionsError(error.message || 'Failed to fetch suggestions');
//       return [];
//     } finally {
//       if (type === 'pickup') setPickupLoading(false);
//       else setDropoffLoading(false);
//     }
//   };

//   const extractAddress = (item: any): string => {
//     if (item.address) {
//       const parts = [];
//       if (item.address.road) parts.push(item.address.road);
//       if (item.address.suburb) parts.push(item.address.suburb);
//       if (item.address.city || item.address.town || item.address.village) {
//         parts.push(item.address.city || item.address.town || item.address.village);
//       }
//       if (item.address.state) parts.push(item.address.state);
//       if (item.address.postcode) parts.push(item.address.postcode);
      
//       return parts.join(', ');
//     }
//     return item.display_name;
//   };

//   const handlePickupChange = (text: string) => {
//     console.log(`handlePickupChange called with: "${text}"`);
//     propHandlePickupChange(text);
    
//     if (pickupDebounceTimer.current) {
//       clearTimeout(pickupDebounceTimer.current);
//       pickupDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setPickupLoading(true);
//       setShowPickupSuggestions(true);
      
//       pickupDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'pickup');
//         console.log(`Setting pickup suggestions:`, sugg);
//         setPickupSuggestions(sugg);
//         setPickupLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowPickupSuggestions(false);
//       setPickupSuggestions([]);
//     }
//   };

//   const handleDropoffChange = (text: string) => {
//     console.log(`handleDropoffChange called with: "${text}"`);
//     propHandleDropoffChange(text);
    
//     if (dropoffDebounceTimer.current) {
//       clearTimeout(dropoffDebounceTimer.current);
//       dropoffDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setDropoffLoading(true);
//       setShowDropoffSuggestions(true);
      
//       dropoffDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'dropoff');
//         console.log(`Setting dropoff suggestions:`, sugg);
//         setDropoffSuggestions(sugg);
//         setDropoffLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowDropoffSuggestions(false);
//       setDropoffSuggestions([]);
//     }
//   };

//   const selectPickupSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected pickup suggestion:`, suggestion);
//     propHandlePickupChange(suggestion.name);
//     setPickupLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowPickupSuggestions(false);
//     setIsPickupCurrent(false);
//     if (dropoffLocation) {
//       fetchRouteBetween({
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       }, dropoffLocation);
//     }
//   };

//   const selectDropoffSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected dropoff suggestion:`, suggestion);
//     propHandleDropoffChange(suggestion.name);
//     setDropoffLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowDropoffSuggestions(false);
//     if (pickupLocation) {
//       fetchRouteBetween(pickupLocation, {
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       });
//     }
//   };

//   const getAddressFromCoordinates = async (coords: LocationType) => {
//     setReverseGeocoding(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
//         {
//           headers: {
//             'User-Agent': 'EAZYGOApp/1.0',
//           },
//         }
//       );
//       const data = await response.json();
//       return data.display_name || 'Selected Location';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       Alert.alert('Error', 'Failed to get address from coordinates.');
//       return 'Selected Location';
//     } finally {
//       setReverseGeocoding(false);
//     }
//   };

//   const handleMapPress = async (e: any) => {
//     if (selectionMode) {
//       setReverseGeocoding(true);
//       const coords = e.nativeEvent.coordinate;
//       const address = await getAddressFromCoordinates(coords);
      
//       if (selectionMode === 'pickup') {
//         setPickupLocation(coords);
//         handlePickupChange(address);
//         setIsPickupCurrent(false);
//       } else if (selectionMode === 'dropoff') {
//         setDropoffLocation(coords);
//         handleDropoffChange(address);
//         if (pickupLocation) {
//           await fetchRouteBetween(pickupLocation, coords);
//         }
//       }
//       setSelectionMode(null);
//       setReverseGeocoding(false);
//     } else {
//       const coords = e.nativeEvent.coordinate;
//       if (!pickupLocation) {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//       } else if (!dropoffLocation) {
//         setDropoffLocation(coords);
//         handleDropoffChange("Dropoff Selected");
//         await fetchRouteBetween(pickupLocation, coords);
//       } else {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         setDropoffLocation(null);
//         handleDropoffChange("");
//         setRouteCoords([]);
//       }
//     }
//   };

//   const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
//     try {
//       const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.code === "Ok" && data.routes.length > 0) {
//         const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
//         setRouteCoords(coords);
//         setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
//         setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
//       } else {
//         setApiError("Failed to fetch route");
//         Alert.alert("Route Error", "Could not find route. Please try different locations.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRouteCoords([]);
//       setApiError("Network error fetching route");
//       Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
//     }
//   };

//   useEffect(() => {
//     if (showPricePanel) {
//       Animated.timing(panelAnimation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(panelAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [showPricePanel]);

//   const calculatePrice = () => {
//     if (!pickupLocation || !dropoffLocation || !distance) return null;
//     const distanceKm = parseFloat(distance);
//     let baseFare = 0;
//     let perKm = 0;
//     switch (selectedRideType) {
//       case 'bike':
//         baseFare = 20;
//         perKm = 8;
//         break;
//       case 'taxi':
//         baseFare = 50;
//         perKm = 15;
//         break;
//       case 'port':
//         baseFare = 80;
//         perKm = 25;
//         break;
//       default:
//         baseFare = 50;
//         perKm = 15;
//     }
//     const multiplier = wantReturn ? 2 : 1;
//     return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
//   };

//   useEffect(() => {
//     if (pickupLocation && dropoffLocation && distance) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);

//   const handleRideTypeSelect = (type: string) => {
//     if (selectedRideType === type) {
//       return;
//     } else {
//       setSelectedRideType(type);
//       setShowPricePanel(true);
//       if (pickupLocation && dropoffLocation) {
//         const price = calculatePrice();
//         setEstimatedPrice(price);
//       }
//     }
//   };

//   const handleBookRide = async () => {
//     const token = await AsyncStorage.getItem('authToken');
//     if (!token) {
//       Alert.alert('Authentication Error', 'Please log in to book a ride');
//       return;
//     }
//     const userId = await AsyncStorage.getItem('userId') || 'U001';
//     if (!pickupLocation || !dropoffLocation) {
//       Alert.alert("Error", "Please select both pickup and dropoff locations");
//       return;
//     }
//     if (!estimatedPrice) {
//       Alert.alert("Error", "Price calculation failed. Please try again.");
//       return;
//     }
//     const rideId = "RID" + Date.now();
//     setCurrentRideId(rideId);
//     setRideStatus("searching");
//     socket.emit("bookRide", {
//       rideId,
//       userId,
//       pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
//       drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
//       vehicleType: selectedRideType,
//     });
//     Alert.alert("Searching for driver... 🚖");
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (!token) {
//         Alert.alert('Authentication Error', 'Please log in again to book a ride');
//         return;
//       }
//       const backendUrl = getBackendUrl();
//       const rideData = {
//         pickupLocation: pickup,
//         dropoffLocation: dropoff,
//         pickupCoordinates: pickupLocation,
//         dropoffCoordinates: dropoffLocation,
//         fare: estimatedPrice,
//         rideType: selectedRideType,
//         otp: bookingOTP,
//         distance,
//         travelTime,
//         isReturnTrip: wantReturn,
//       };
//       const response = await axios.post(
//         `${backendUrl}/api/users/book-ride`,
//         rideData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         }
//       );
//       if (response.data.success) {
//         if (response.data.ride && response.data.ride.customerId) {
//           await AsyncStorage.setItem('customerId', response.data.ride.customerId);
//         }
//         setShowConfirmModal(false);
//         Alert.alert(
//           'Booking Confirmed',
//           `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
//         );
//       } else {
//         throw new Error(response.data.error || 'Failed to book ride');
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
//         } else {
//           Alert.alert(
//             'Booking Failed',
//             error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.'
//           );
//         }
//       } else if (error.request) {
//         Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       } else {
//         Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
//       }
//       setApiError(error.message || 'Failed to book ride');
//     }
//   };

//   const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
//     try {
//       switch (type) {
//         case 'bike':
//           return <BikeIcon color={color} size={size} />;
//         case 'taxi':
//           return <TaxiIcon color={color} size={size} />;
//         case 'port':
//           return <PortIcon color={color} size={size} />;
//         default:
//           return <TaxiIcon color={color} size={size} />;
//       }
//     } catch (error) {
//       return <TaxiIcon color={color} size={size} />;
//     }
//   };

//   const renderSuggestionItem = (item: SuggestionType, onSelect: () => void, key: string) => {
//     let iconName = 'location-on';
//     let iconColor = '#A9A9A9';
    
//     if (item.type.includes('railway') || item.type.includes('station')) {
//       iconName = 'train';
//       iconColor = '#3F51B5';
//     } else if (item.type.includes('airport')) {
//       iconName = 'flight';
//       iconColor = '#2196F3';
//     } else if (item.type.includes('bus')) {
//       iconName = 'directions-bus';
//       iconColor = '#FF9800';
//     } else if (item.type.includes('hospital')) {
//       iconName = 'local-hospital';
//       iconColor = '#F44336';
//     } else if (item.type.includes('school') || item.type.includes('college')) {
//       iconName = 'school';
//       iconColor = '#4CAF50';
//     } else if (item.type.includes('place_of_worship')) {
//       iconName = 'church';
//       iconColor = '#9C27B0';
//     } else if (item.type.includes('shop') || item.type.includes('mall')) {
//       iconName = 'shopping-mall';
//       iconColor = '#E91E63';
//     } else if (item.type.includes('park')) {
//       iconName = 'park';
//       iconColor = '#4CAF50';
//     }
    
//     return (
//       <TouchableOpacity key={key} style={styles.suggestionItem} onPress={onSelect}>
//         <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
//         <View style={styles.suggestionTextContainer}>
//           <Text style={styles.suggestionMainText} numberOfLines={1}>
//             {extractMainName(item.name)}
//           </Text>
//           <Text style={styles.suggestionSubText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   const extractMainName = (fullName: string): string => {
//     const parts = fullName.split(',');
//     return parts[0].trim();
//   };

//   const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;

//   return (
//     <View style={styles.contentContainer}>
//       <View style={styles.mapContainer}>
//         {loadingLocation ? (
//           <Text style={styles.mapLoadingText}>Loading map...</Text>
//         ) : location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             region={mapRegion}
//             onRegionChangeComplete={(region) => setMapRegion(region)}
//             showsUserLocation
//             onPress={handleMapPress}
//           >
//             {pickupLocation && (
//               <Marker coordinate={pickupLocation} title="Pickup">
//                 <View style={styles.pickupLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#4CAF50" />
//                 </View>
//               </Marker>
//             )}
//             {dropoffLocation && (
//               <Marker coordinate={dropoffLocation} title="Dropoff">
//                 <View style={styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#F44336" />
//                 </View>
//               </Marker>
//             )}
//             {driverLocation && (
//               <Marker coordinate={driverLocation} title="Driver">
//                 <View style={styles.vehicleMarkerContainer}>
//                   {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
//                 </View>
//               </Marker>
//             )}
//             {selectionMode && (
//               <Marker coordinate={{ 
//                 latitude: mapRegion.latitude, 
//                 longitude: mapRegion.longitude 
//               }}>
//                 <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
//                 </View>
//               </Marker>
//             )}
//             {routeCoords.length > 0 && (
//               <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
//             )}
//           </MapView>
//         ) : (
//           <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
//         )}
//       </View>
      
//       <View style={styles.inputContainer}>
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Pickup Location"
//             value={pickup}
//             onChangeText={handlePickupChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'pickup' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showPickupSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {pickupLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : pickupSuggestions.length > 0 ? (
//               pickupSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectPickupSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
        
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Dropoff Location"
//             value={dropoff}
//             onChangeText={handleDropoffChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'dropoff' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showDropoffSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {dropoffLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : dropoffSuggestions.length > 0 ? (
//               dropoffSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectDropoffSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
      
//       {(distance || travelTime) && (
//         <View style={styles.distanceTimeContainer}>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
//             <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
//           </View>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
//             <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
//           </View>
//         </View>
//       )}
      
//       {apiError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{apiError}</Text>
//         </View>
//       )}
      
//       {(pickupLocation && dropoffLocation && !routeCoords.length) && (
//         <TouchableOpacity 
//           style={styles.seeRouteButton}
//           onPress={async () => {
//             if (pickupLocation && dropoffLocation) {
//               await fetchRouteBetween(pickupLocation, dropoffLocation);
//             }
//           }}
//         >
//           <Text style={styles.seeRouteButtonText}>See Route</Text>
//         </TouchableOpacity>
//       )}
      
//       <RideTypeSelector
//         selectedRideType={selectedRideType}
//         setSelectedRideType={handleRideTypeSelect}
//       />
      
//       <TouchableOpacity
//         style={[
//           styles.bookRideButton,
//           isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
//         ]}
//         onPress={handleBookRide}
//         disabled={!isBookRideButtonEnabled}
//       >
//         <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
//       </TouchableOpacity>
      
//       {showPricePanel && selectedRideType && (
//         <Animated.View
//           style={[
//             styles.pricePanel,
//             {
//               transform: [{
//                 translateY: panelAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [300, 0],
//                 }),
//               }],
//             },
//           ]}
//         >
//           <View style={styles.panelHeader}>
//             <Text style={styles.panelTitle}>Ride Details</Text>
//             <TouchableOpacity onPress={() => setShowPricePanel(false)}>
//               <MaterialIcons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.priceDetailsContainer}>
//             <View style={styles.vehicleIconContainer}>
//               {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
//             </View>
//             <View style={styles.priceInfoContainer}>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Pickup:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Drop-off:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Distance:</Text>
//                 <Text style={styles.priceValue}>{distance || '---'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Price:</Text>
//                 <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
//               </View>
//               <View style={styles.returnTripRow}>
//                 <Text style={styles.priceLabel}>Return trip:</Text>
//                 <Switch
//                   value={wantReturn}
//                   onValueChange={setWantReturn}
//                   trackColor={{ false: '#767577', true: '#4CAF50' }}
//                   thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={styles.bookButtonContainer}>
//             <TouchableOpacity
//               style={styles.bookMyRideButton}
//               onPress={handleBookRide}
//             >
//               <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Confirm Booking</Text>
//               <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
//                 <MaterialIcons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <View style={styles.modalIconContainer}>
//                 <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
//               </View>
//               <Text style={styles.modalMessage}>
//                 Thank you for choosing EAZY GO!
//               </Text>
//               <Text style={styles.modalSubMessage}>
//                 Your ride has been successfully booked.
//               </Text>
//               <View style={styles.otpContainer}>
//                 <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
//                 <Text style={styles.otpValue}>{bookingOTP}</Text>
//               </View>
//               <Text style={styles.otpWarning}>
//                 Please don't share it with anyone. Only share with our driver.
//               </Text>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowConfirmModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmBooking}
//               >
//                 <Text style={styles.modalConfirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   mapContainer: {
//     width: '100%',
//     height: Dimensions.get('window').height * 0.3,
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: { ...StyleSheet.absoluteFillObject },
//   mapLoadingText: {
//     color: '#757575',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   selectMapButton: {
//     backgroundColor: '#E0E0E0',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   activeSelectMapButton: {
//     backgroundColor: '#FF5722',
//   },
//   selectMapButtonText: {
//     color: '#333',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   seeRouteButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
//   seeRouteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   suggestionsContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   suggestionIcon: {
//     marginRight: 12,
//   },
//   suggestionTextContainer: {
//     flex: 1,
//   },
//   suggestionMainText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   suggestionSubText: {
//     fontSize: 12,
//     color: '#757575',
//     marginTop: 2,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   loadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#666666',
//   },
//   noSuggestionsContainer: {
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   noSuggestionsText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   distanceTimeContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   distanceTimeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   distanceTimeLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     marginRight: 8,
//   },
//   distanceTimeValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   bookRideButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     width: '100%',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   enabledBookRideButton: {
//     backgroundColor: '#FF5722',
//   },
//   disabledBookRideButton: {
//     backgroundColor: '#BDBDBD',
//   },
//   bookRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     width: '100%',
//     backgroundColor: '#FFEBEE',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     borderLeftWidth: 4,
//     borderLeftColor: '#F44336',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   pricePanel: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: Dimensions.get('window').height * 0.5,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   panelHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   panelTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   priceDetailsContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   vehicleIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   priceInfoContainer: {
//     flex: 1,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   priceLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     flex: 1,
//   },
//   priceValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   returnTripRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   bookButtonContainer: {
//     marginTop: 10,
//   },
//   bookMyRideButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bookMyRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   modalContent: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalIconContainer: {
//     marginBottom: 15,
//   },
//   modalMessage: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   modalSubMessage: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   otpContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 15,
//     width: '100%',
//   },
//   otpLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   otpValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF5722',
//   },
//   otpWarning: {
//     fontSize: 12,
//     color: '#F44336',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalCancelButton: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   modalCancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   modalConfirmButton: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   modalConfirmButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   pickupLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   dropoffLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   vehicleMarkerContainer: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   rideTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 15,
//   },
//   rideTypeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   selectedRideTypeButton: {
//     backgroundColor: '#FF5722',
//   },
//   rideTypeText: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   selectedRideTypeText: {
//     color: '#FFFFFF',
//   },
// });

// export default TaxiContent;















































































































// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
//   Animated,
//   Switch,
//   Modal,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import socket from '../../socket';
// import haversine from 'haversine-distance';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Svg, { Path, Circle, Rect } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBackendUrl } from '../../util/backendConfig';

// // Professional SVG icons
// const TaxiIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
//     <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
//     <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
//     <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
//     <Circle cx="6.5" cy="16" r="1.5" fill={color} />
//     <Circle cx="17.5" cy="16" r="1.5" fill={color} />
//   </Svg>
// );

// const PortIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
//     <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
//     <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
//   </Svg>
// );

// const BikeIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="18" cy="16" r="1" fill={color} />
//     <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="6" cy="16" r="1" fill={color} />
//     <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
//     <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
//     <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
//     <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
//   </Svg>
// );

// // RideTypeSelector component
// const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
//   return (
//     <View style={styles.rideTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'taxi' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('taxi')}
//       >
//         <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'taxi' && styles.selectedRideTypeText,
//         ]}>Taxi</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'bike' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('bike')}
//       >
//         <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'bike' && styles.selectedRideTypeText,
//         ]}>Bike</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'port' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('port')}
//       >
//         <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'port' && styles.selectedRideTypeText,
//         ]}>Port</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// interface SuggestionType {
//   id: string;
//   name: string;
//   address: string;
//   lat: string;
//   lon: string;
//   type: string;
//   importance: number;
// }

// interface TaxiContentProps {
//   pickup: string;
//   dropoff: string;
//   handlePickupChange: (text: string) => void;
//   handleDropoffChange: (text: string) => void;
// }

// const TaxiContent: React.FC<TaxiContentProps> = ({
//   pickup,
//   dropoff,
//   handlePickupChange: propHandlePickupChange,
//   handleDropoffChange: propHandleDropoffChange,
// }) => {
//   // Internal state for loadingLocation
//   const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  
//   const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const [showPricePanel, setShowPricePanel] = useState(false);
//   const [wantReturn, setWantReturn] = useState(false);
//   const [distance, setDistance] = useState<string>('');
//   const [travelTime, setTravelTime] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingOTP, setBookingOTP] = useState<string>('');
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [location, setLocation] = useState<LocationType | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
//   const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
//   const [currentRideId, setCurrentRideId] = useState<string | null>(null);
//   const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
//   const [driverId, setDriverId] = useState<string | null>(null);
//   const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
//   const [travelledKm, setTravelledKm] = useState(0);
//   const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
  
//   const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });
//   const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
//   const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
//   const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
//   const [pickupLoading, setPickupLoading] = useState(false);
//   const [dropoffLoading, setDropoffLoading] = useState(false);
//   const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
//   const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
//   const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
//   const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
//   const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
//   const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const panelAnimation = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef<MapView | null>(null);
  
//   useEffect(() => {
//     const requestLocation = async () => {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
//           Alert.alert("Permission Denied", "Location permission is required to proceed.");
//           setLoadingLocation(false);
//           return;
//         }
//       }
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
//           setLocation(loc);
//           setPickupLocation(loc);
//           setMapRegion({
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           });
//           propHandlePickupChange("My Current Location");
//           setIsPickupCurrent(true);
//           setLoadingLocation(false);
//         },
//         (err) => {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
//           setLoadingLocation(false);
//           Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           distanceFilter: 10,
//         }
//       );
//     };
//     requestLocation();
//   }, []);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           setLocation(newLoc);
//           if (rideStatus === "idle" && isPickupCurrent && dropoffLocation) {
//             setPickupLocation(newLoc);
//             fetchRouteBetween(newLoc, dropoffLocation);
//           }
//         },
//         (err) => {
//           console.error("Live location error:", err);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [rideStatus, isPickupCurrent, dropoffLocation]);
  
//   useEffect(() => {
//     if (!currentRideId) return;
//     const rideAccepted = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus("onTheWay");
//         setDriverId(data.driverId);
//         Alert.alert("Driver on the way 🚖");
//       }
//     };
//     const driverLocUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         const coords = { latitude: data.lat, longitude: data.lng };
//         setDriverLocation(coords);
//         if (lastCoord) {
//           const dist = haversine(lastCoord, coords);
//           setTravelledKm(prev => prev + dist / 1000);
//         }
//         setLastCoord(coords);
//       }
//     };
//     const rideStatusUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus(data.status);
//         if (data.status === "completed") {
//           Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
//           setTimeout(() => {
//             setCurrentRideId(null);
//             setDriverId(null);
//             setDriverLocation(null);
//             setRouteCoords([]);
//             setPickupLocation(null);
//             setDropoffLocation(null);
//             propHandlePickupChange("");
//             propHandleDropoffChange("");
//             setRideStatus("idle");
//           }, 3000);
//         }
//       }
//     };
//     const rideOtpListener = ({ rideId, otp }: any) => {
//       if (rideId === currentRideId) {
//         setBookingOTP(otp);
//         setShowConfirmModal(true);
//         Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
//       }
//     };
//     socket.on("rideAccepted", rideAccepted);
//     socket.on("driverLocationUpdate", driverLocUpdate);
//     socket.on("rideStatusUpdate", rideStatusUpdate);
//     socket.on("rideOTP", rideOtpListener);
//     return () => {
//       socket.off("rideAccepted", rideAccepted);
//       socket.off("driverLocationUpdate", driverLocUpdate);
//       socket.off("rideStatusUpdate", rideStatusUpdate);
//       socket.off("rideOTP", rideOtpListener);
//     };
//   }, [currentRideId, lastCoord, travelledKm]);
  
//   useEffect(() => {
//     if (driverLocation) {
//       let dest: LocationType | null = null;
//       if (rideStatus === "onTheWay" || rideStatus === "arrived") {
//         dest = pickupLocation;
//       } else if (rideStatus === "started") {
//         dest = dropoffLocation;
//       }
//       if (dest) {
//         fetchRouteBetween(driverLocation, dest);
//       }
//     } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
//       fetchRouteBetween(pickupLocation, dropoffLocation);
//     }
//     if (rideStatus === "completed") {
//       setRouteCoords([]);
//     }
//   }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);
  
//   const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
//     try {
//       console.log(`Fetching suggestions for: ${query}`);
      
//       const cache = type === 'pickup' ? pickupCache : dropoffCache;
//       if (cache[query]) {
//         console.log(`Returning cached suggestions for: ${query}`);
//         return cache[query];
//       }
//       if (type === 'pickup') setPickupLoading(true);
//       else setDropoffLoading(true);
//       setSuggestionsError(null);
//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
//       console.log(`API URL: ${url}`);
      
//       const response = await fetch(url, {
//         headers: {
//           'User-Agent': 'EAZYGOApp/1.0',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(`API response:`, data);
      
//       if (!Array.isArray(data)) {
//         throw new Error('Invalid response format');
//       }
//       const suggestions: SuggestionType[] = data.map((item: any) => ({
//         id: item.place_id || `${item.lat}-${item.lon}`,
//         name: item.display_name,
//         address: extractAddress(item),
//         lat: item.lat,
//         lon: item.lon,
//         type: item.type || 'unknown',
//         importance: item.importance || 0
//       }));
//       if (type === 'pickup') setPickupCache(prev => ({ ...prev, [query]: suggestions }));
//       else setDropoffCache(prev => ({ ...prev, [query]: suggestions }));
//       console.log(`Processed suggestions:`, suggestions);
//       return suggestions;
//     } catch (error: any) {
//       console.error('Suggestions fetch error:', error);
//       setSuggestionsError(error.message || 'Failed to fetch suggestions');
//       return [];
//     } finally {
//       if (type === 'pickup') setPickupLoading(false);
//       else setDropoffLoading(false);
//     }
//   };
  
//   const extractAddress = (item: any): string => {
//     if (item.address) {
//       const parts = [];
//       if (item.address.road) parts.push(item.address.road);
//       if (item.address.suburb) parts.push(item.address.suburb);
//       if (item.address.city || item.address.town || item.address.village) {
//         parts.push(item.address.city || item.address.town || item.address.village);
//       }
//       if (item.address.state) parts.push(item.address.state);
//       if (item.address.postcode) parts.push(item.address.postcode);
      
//       return parts.join(', ');
//     }
//     return item.display_name;
//   };
  
//   const handlePickupChange = (text: string) => {
//     console.log(`handlePickupChange called with: "${text}"`);
//     propHandlePickupChange(text);
    
//     if (pickupDebounceTimer.current) {
//       clearTimeout(pickupDebounceTimer.current);
//       pickupDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setPickupLoading(true);
//       setShowPickupSuggestions(true);
      
//       pickupDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'pickup');
//         console.log(`Setting pickup suggestions:`, sugg);
//         setPickupSuggestions(sugg);
//         setPickupLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowPickupSuggestions(false);
//       setPickupSuggestions([]);
//     }
//   };
  
//   const handleDropoffChange = (text: string) => {
//     console.log(`handleDropoffChange called with: "${text}"`);
//     propHandleDropoffChange(text);
    
//     if (dropoffDebounceTimer.current) {
//       clearTimeout(dropoffDebounceTimer.current);
//       dropoffDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       setDropoffLoading(true);
//       setShowDropoffSuggestions(true);
      
//       dropoffDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'dropoff');
//         console.log(`Setting dropoff suggestions:`, sugg);
//         setDropoffSuggestions(sugg);
//         setDropoffLoading(false);
//       }, 500);
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowDropoffSuggestions(false);
//       setDropoffSuggestions([]);
//     }
//   };
  
//   const selectPickupSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected pickup suggestion:`, suggestion);
//     propHandlePickupChange(suggestion.name);
//     setPickupLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowPickupSuggestions(false);
//     setIsPickupCurrent(false);
//     if (dropoffLocation) {
//       fetchRouteBetween({
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       }, dropoffLocation);
//     }
//   };
  
//   const selectDropoffSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected dropoff suggestion:`, suggestion);
//     propHandleDropoffChange(suggestion.name);
//     setDropoffLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowDropoffSuggestions(false);
//     if (pickupLocation) {
//       fetchRouteBetween(pickupLocation, {
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       });
//     }
//   };
  
//   const getAddressFromCoordinates = async (coords: LocationType) => {
//     setReverseGeocoding(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
//         {
//           headers: {
//             'User-Agent': 'EAZYGOApp/1.0',
//           },
//         }
//       );
//       const data = await response.json();
//       return data.display_name || 'Selected Location';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       Alert.alert('Error', 'Failed to get address from coordinates.');
//       return 'Selected Location';
//     } finally {
//       setReverseGeocoding(false);
//     }
//   };
  
//   const handleMapPress = async (e: any) => {
//     if (selectionMode) {
//       setReverseGeocoding(true);
//       const coords = e.nativeEvent.coordinate;
//       const address = await getAddressFromCoordinates(coords);
      
//       if (selectionMode === 'pickup') {
//         setPickupLocation(coords);
//         handlePickupChange(address);
//         setIsPickupCurrent(false);
//       } else if (selectionMode === 'dropoff') {
//         setDropoffLocation(coords);
//         handleDropoffChange(address);
//         if (pickupLocation) {
//           await fetchRouteBetween(pickupLocation, coords);
//         }
//       }
//       setSelectionMode(null);
//       setReverseGeocoding(false);
//     } else {
//       const coords = e.nativeEvent.coordinate;
//       if (!pickupLocation) {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//       } else if (!dropoffLocation) {
//         setDropoffLocation(coords);
//         handleDropoffChange("Dropoff Selected");
//         await fetchRouteBetween(pickupLocation, coords);
//       } else {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         setDropoffLocation(null);
//         handleDropoffChange("");
//         setRouteCoords([]);
//       }
//     }
//   };
  
//   const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
//     try {
//       const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.code === "Ok" && data.routes.length > 0) {
//         const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
//         setRouteCoords(coords);
//         setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
//         setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
//       } else {
//         setApiError("Failed to fetch route");
//         Alert.alert("Route Error", "Could not find route. Please try different locations.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRouteCoords([]);
//       setApiError("Network error fetching route");
//       Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
//     }
//   };
  
//   useEffect(() => {
//     if (showPricePanel) {
//       Animated.timing(panelAnimation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(panelAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [showPricePanel]);
  
//   const calculatePrice = () => {
//     if (!pickupLocation || !dropoffLocation || !distance) return null;
//     const distanceKm = parseFloat(distance);
//     let baseFare = 0;
//     let perKm = 0;
//     switch (selectedRideType) {
//       case 'bike':
//         baseFare = 20;
//         perKm = 8;
//         break;
//       case 'taxi':
//         baseFare = 50;
//         perKm = 15;
//         break;
//       case 'port':
//         baseFare = 80;
//         perKm = 25;
//         break;
//       default:
//         baseFare = 50;
//         perKm = 15;
//     }
//     const multiplier = wantReturn ? 2 : 1;
//     return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
//   };
  
//   useEffect(() => {
//     if (pickupLocation && dropoffLocation && distance) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);
  
//   const handleRideTypeSelect = (type: string) => {
//     if (selectedRideType === type) {
//       return;
//     } else {
//       setSelectedRideType(type);
//       setShowPricePanel(true);
//       if (pickupLocation && dropoffLocation) {
//         const price = calculatePrice();
//         setEstimatedPrice(price);
//       }
//     }
//   };
  
//   const handleBookRide = async () => {
//     const token = await AsyncStorage.getItem('authToken');
//     if (!token) {
//       Alert.alert('Authentication Error', 'Please log in to book a ride');
//       return;
//     }
//     const userId = await AsyncStorage.getItem('userId') || 'U001';
//     if (!pickupLocation || !dropoffLocation) {
//       Alert.alert("Error", "Please select both pickup and dropoff locations");
//       return;
//     }
//     if (!estimatedPrice) {
//       Alert.alert("Error", "Price calculation failed. Please try again.");
//       return;
//     }
//     const rideId = "RID" + Date.now();
//     setCurrentRideId(rideId);
//     setRideStatus("searching");
//     socket.emit("bookRide", {
//       rideId,
//       userId,
//       pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
//       drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
//       vehicleType: selectedRideType,
//     });
//     Alert.alert("Searching for driver... 🚖");
//   };
  
//   const handleConfirmBooking = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (!token) {
//         Alert.alert('Authentication Error', 'Please log in again to book a ride');
//         return;
//       }
//       const backendUrl = getBackendUrl();
//       const rideData = {
//         pickupLocation: pickup,
//         dropoffLocation: dropoff,
//         pickupCoordinates: pickupLocation,
//         dropoffCoordinates: dropoffLocation,
//         fare: estimatedPrice,
//         rideType: selectedRideType,
//         otp: bookingOTP,
//         distance,
//         travelTime,
//         isReturnTrip: wantReturn,
//       };
//       const response = await axios.post(
//         `${backendUrl}/api/users/book-ride`,
//         rideData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         }
//       );
//       if (response.data.success) {
//         if (response.data.ride && response.data.ride.customerId) {
//           await AsyncStorage.setItem('customerId', response.data.ride.customerId);
//         }
//         setShowConfirmModal(false);
//         Alert.alert(
//           'Booking Confirmed',
//           `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
//         );
//       } else {
//         throw new Error(response.data.error || 'Failed to book ride');
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
//         } else {
//           Alert.alert(
//             'Booking Failed',
//             error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.'
//           );
//         }
//       } else if (error.request) {
//         Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       } else {
//         Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
//       }
//       setApiError(error.message || 'Failed to book ride');
//     }
//   };
  
//   const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
//     try {
//       switch (type) {
//         case 'bike':
//           return <BikeIcon color={color} size={size} />;
//         case 'taxi':
//           return <TaxiIcon color={color} size={size} />;
//         case 'port':
//           return <PortIcon color={color} size={size} />;
//         default:
//           return <TaxiIcon color={color} size={size} />;
//       }
//     } catch (error) {
//       return <TaxiIcon color={color} size={size} />;
//     }
//   };
  
//   const renderSuggestionItem = (item: SuggestionType, onSelect: () => void, key: string) => {
//     let iconName = 'location-on';
//     let iconColor = '#A9A9A9';
    
//     if (item.type.includes('railway') || item.type.includes('station')) {
//       iconName = 'train';
//       iconColor = '#3F51B5';
//     } else if (item.type.includes('airport')) {
//       iconName = 'flight';
//       iconColor = '#2196F3';
//     } else if (item.type.includes('bus')) {
//       iconName = 'directions-bus';
//       iconColor = '#FF9800';
//     } else if (item.type.includes('hospital')) {
//       iconName = 'local-hospital';
//       iconColor = '#F44336';
//     } else if (item.type.includes('school') || item.type.includes('college')) {
//       iconName = 'school';
//       iconColor = '#4CAF50';
//     } else if (item.type.includes('place_of_worship')) {
//       iconName = 'church';
//       iconColor = '#9C27B0';
//     } else if (item.type.includes('shop') || item.type.includes('mall')) {
//       iconName = 'shopping-mall';
//       iconColor = '#E91E63';
//     } else if (item.type.includes('park')) {
//       iconName = 'park';
//       iconColor = '#4CAF50';
//     }
    
//     return (
//       <TouchableOpacity key={key} style={styles.suggestionItem} onPress={onSelect}>
//         <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
//         <View style={styles.suggestionTextContainer}>
//           <Text style={styles.suggestionMainText} numberOfLines={1}>
//             {extractMainName(item.name)}
//           </Text>
//           <Text style={styles.suggestionSubText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   const extractMainName = (fullName: string): string => {
//     const parts = fullName.split(',');
//     return parts[0].trim();
//   };
  
//   const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;
  
//   return (
//     <View style={styles.contentContainer}>
//       <View style={styles.mapContainer}>
//         {loadingLocation ? (
//           <Text style={styles.mapLoadingText}>Loading map...</Text>
//         ) : location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             region={mapRegion}
//             onRegionChangeComplete={(region) => setMapRegion(region)}
//             showsUserLocation
//             onPress={handleMapPress}
//           >
//             {pickupLocation && (
//               <Marker coordinate={pickupLocation} title="Pickup">
//                 <View style={styles.pickupLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#4CAF50" />
//                 </View>
//               </Marker>
//             )}
//             {dropoffLocation && (
//               <Marker coordinate={dropoffLocation} title="Dropoff">
//                 <View style={styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#F44336" />
//                 </View>
//               </Marker>
//             )}
//             {driverLocation && (
//               <Marker coordinate={driverLocation} title="Driver">
//                 <View style={styles.vehicleMarkerContainer}>
//                   {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
//                 </View>
//               </Marker>
//             )}
//             {selectionMode && (
//               <Marker coordinate={{ 
//                 latitude: mapRegion.latitude, 
//                 longitude: mapRegion.longitude 
//               }}>
//                 <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
//                 </View>
//               </Marker>
//             )}
//             {routeCoords.length > 0 && (
//               <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
//             )}
//           </MapView>
//         ) : (
//           <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
//         )}
//       </View>
      
//       <View style={styles.inputContainer}>
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Pickup Location"
//             value={pickup}
//             onChangeText={handlePickupChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'pickup' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showPickupSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {pickupLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : pickupSuggestions.length > 0 ? (
//               pickupSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectPickupSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
        
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Dropoff Location"
//             value={dropoff}
//             onChangeText={handleDropoffChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'dropoff' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {showDropoffSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {dropoffLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : dropoffSuggestions.length > 0 ? (
//               dropoffSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectDropoffSuggestion(item), item.id)
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
      
//       {(distance || travelTime) && (
//         <View style={styles.distanceTimeContainer}>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
//             <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
//           </View>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
//             <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
//           </View>
//         </View>
//       )}
      
//       {apiError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{apiError}</Text>
//         </View>
//       )}
      
//       {(pickupLocation && dropoffLocation && !routeCoords.length) && (
//         <TouchableOpacity 
//           style={styles.seeRouteButton}
//           onPress={async () => {
//             if (pickupLocation && dropoffLocation) {
//               await fetchRouteBetween(pickupLocation, dropoffLocation);
//             }
//           }}
//         >
//           <Text style={styles.seeRouteButtonText}>See Route</Text>
//         </TouchableOpacity>
//       )}
      
//       <RideTypeSelector
//         selectedRideType={selectedRideType}
//         setSelectedRideType={handleRideTypeSelect}
//       />
      
//       <TouchableOpacity
//         style={[
//           styles.bookRideButton,
//           isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
//         ]}
//         onPress={handleBookRide}
//         disabled={!isBookRideButtonEnabled}
//       >
//         <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
//       </TouchableOpacity>
      
//       {showPricePanel && selectedRideType && (
//         <Animated.View
//           style={[
//             styles.pricePanel,
//             {
//               transform: [{
//                 translateY: panelAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [300, 0],
//                 }),
//               }],
//             },
//           ]}
//         >
//           <View style={styles.panelHeader}>
//             <Text style={styles.panelTitle}>Ride Details</Text>
//             <TouchableOpacity onPress={() => setShowPricePanel(false)}>
//               <MaterialIcons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.priceDetailsContainer}>
//             <View style={styles.vehicleIconContainer}>
//               {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
//             </View>
//             <View style={styles.priceInfoContainer}>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Pickup:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Drop-off:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Distance:</Text>
//                 <Text style={styles.priceValue}>{distance || '---'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Price:</Text>
//                 <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
//               </View>
//               <View style={styles.returnTripRow}>
//                 <Text style={styles.priceLabel}>Return trip:</Text>
//                 <Switch
//                   value={wantReturn}
//                   onValueChange={setWantReturn}
//                   trackColor={{ false: '#767577', true: '#4CAF50' }}
//                   thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={styles.bookButtonContainer}>
//             <TouchableOpacity
//               style={styles.bookMyRideButton}
//               onPress={handleBookRide}
//             >
//               <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Confirm Booking</Text>
//               <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
//                 <MaterialIcons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <View style={styles.modalIconContainer}>
//                 <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
//               </View>
//               <Text style={styles.modalMessage}>
//                 Thank you for choosing EAZY GO!
//               </Text>
//               <Text style={styles.modalSubMessage}>
//                 Your ride has been successfully booked.
//               </Text>
//               <View style={styles.otpContainer}>
//                 <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
//                 <Text style={styles.otpValue}>{bookingOTP}</Text>
//               </View>
//               <Text style={styles.otpWarning}>
//                 Please don't share it with anyone. Only share with our driver.
//               </Text>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowConfirmModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmBooking}
//               >
//                 <Text style={styles.modalConfirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   mapContainer: {
//     width: '100%',
//     height: Dimensions.get('window').height * 0.3,
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: { ...StyleSheet.absoluteFillObject },
//   mapLoadingText: {
//     color: '#757575',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   selectMapButton: {
//     backgroundColor: '#E0E0E0',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   activeSelectMapButton: {
//     backgroundColor: '#FF5722',
//   },
//   selectMapButtonText: {
//     color: '#333',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   seeRouteButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
//   seeRouteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   suggestionsContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   suggestionIcon: {
//     marginRight: 12,
//   },
//   suggestionTextContainer: {
//     flex: 1,
//   },
//   suggestionMainText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   suggestionSubText: {
//     fontSize: 12,
//     color: '#757575',
//     marginTop: 2,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   loadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#666666',
//   },
//   noSuggestionsContainer: {
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   noSuggestionsText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   distanceTimeContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   distanceTimeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   distanceTimeLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     marginRight: 8,
//   },
//   distanceTimeValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   bookRideButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     width: '100%',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   enabledBookRideButton: {
//     backgroundColor: '#FF5722',
//   },
//   disabledBookRideButton: {
//     backgroundColor: '#BDBDBD',
//   },
//   bookRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     width: '100%',
//     backgroundColor: '#FFEBEE',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     borderLeftWidth: 4,
//     borderLeftColor: '#F44336',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   pricePanel: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: Dimensions.get('window').height * 0.5,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   panelHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   panelTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   priceDetailsContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   vehicleIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   priceInfoContainer: {
//     flex: 1,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   priceLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     flex: 1,
//   },
//   priceValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   returnTripRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   bookButtonContainer: {
//     marginTop: 10,
//   },
//   bookMyRideButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bookMyRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   modalContent: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalIconContainer: {
//     marginBottom: 15,
//   },
//   modalMessage: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   modalSubMessage: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   otpContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 15,
//     width: '100%',
//   },
//   otpLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   otpValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF5722',
//   },
//   otpWarning: {
//     fontSize: 12,
//     color: '#F44336',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalCancelButton: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   modalCancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   modalConfirmButton: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   modalConfirmButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   pickupLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   dropoffLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   vehicleMarkerContainer: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   rideTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 15,
//   },
//   rideTypeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   selectedRideTypeButton: {
//     backgroundColor: '#FF5722',
//   },
//   rideTypeText: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   selectedRideTypeText: {
//     color: '#FFFFFF',
//   },
// });

// export default TaxiContent;

















































































































// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
//   Animated,
//   Switch,
//   Modal,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import socket from '../../socket';
// import haversine from 'haversine-distance';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Svg, { Path, Circle, Rect } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getBackendUrl } from '../../util/backendConfig';

// // Professional SVG icons
// const TaxiIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
//     <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
//     <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
//     <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
//     <Circle cx="6.5" cy="16" r="1.5" fill={color} />
//     <Circle cx="17.5" cy="16" r="1.5" fill={color} />
//   </Svg>
// );


// const PortIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
//     <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
//     <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
//   </Svg>
// );
// const BikeIcon = ({ color = '#000000', size = 24 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
//     <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
//     <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="18" cy="16" r="1" fill={color} />
//     <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
//     <Circle cx="6" cy="16" r="1" fill={color} />
//     <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
//     <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
//     <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
//     <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
//   </Svg>
// );

// // RideTypeSelector component
// const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
//   return (
//     <View style={styles.rideTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'taxi' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('taxi')}
//       >
//         <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'taxi' && styles.selectedRideTypeText,
//         ]}>Taxi</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'bike' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('bike')}
//       >
//         <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'bike' && styles.selectedRideTypeText,
//         ]}>Bike</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         style={[
//           styles.rideTypeButton,
//           selectedRideType === 'port' && styles.selectedRideTypeButton,
//         ]}
//         onPress={() => setSelectedRideType('port')}
//       >
//         <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
//         <Text style={[
//           styles.rideTypeText,
//           selectedRideType === 'port' && styles.selectedRideTypeText,
//         ]}>Port</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

// interface SuggestionType {
//   id: string;
//   name: string;
//   address: string;
//   lat: string;
//   lon: string;
//   type: string;
//   importance: number;
// }

// interface TaxiContentProps {
//   loadingLocation: boolean;
//   pickup: string;
//   dropoff: string;
//   handlePickupChange: (text: string) => void;
//   handleDropoffChange: (text: string) => void;
//   setLoadingLocation: (loading: boolean) => void;
// }

// const TaxiContent: React.FC<TaxiContentProps> = ({
//   loadingLocation,        // ← You get this as a prop
//   pickup,
//   dropoff,
//   handlePickupChange: propHandlePickupChange,
//   handleDropoffChange: propHandleDropoffChange,
//   setLoadingLocation,     // ← You get this as a prop too
// }) => {
//   // Existing state variables
//   const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const [showPricePanel, setShowPricePanel] = useState(false);
//   const [wantReturn, setWantReturn] = useState(false);
//   const [distance, setDistance] = useState<string>('');
//   const [travelTime, setTravelTime] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingOTP, setBookingOTP] = useState<string>('');
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [location, setLocation] = useState<LocationType | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
//   const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
//   const [currentRideId, setCurrentRideId] = useState<string | null>(null);
//   const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
//   const [driverId, setDriverId] = useState<string | null>(null);
//   const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
//   const [travelledKm, setTravelledKm] = useState(0);
//   const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
  
//   // New state variables for map selection
//   const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 0,
//     longitude: 0,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });
//   const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
//   // New states for suggestions
//   const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
//   const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
//   // New states for loading and caching
//   const [pickupLoading, setPickupLoading] = useState(false);
//   const [dropoffLoading, setDropoffLoading] = useState(false);
//   const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
//   const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
//   const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
//   // New state for live tracking
//   const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
//   // Refs for debouncing
//   const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
//   const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const panelAnimation = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef<MapView | null>(null);

//   // Get user location
//   useEffect(() => {
//     const requestLocation = async () => {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
//           Alert.alert("Permission Denied", "Location permission is required to proceed.");
//           setLoadingLocation(false);
//           return;
//         }
//       }
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
//           setLocation(loc);
//           setPickupLocation(loc);
//           setMapRegion({
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           });
//           propHandlePickupChange("My Current Location");
//           setIsPickupCurrent(true);
//           setLoadingLocation(false);
//         },
//         (err) => {
//           console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
//           setLoadingLocation(false);
//           Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           distanceFilter: 10,
//         }
//       );
//     };
//     requestLocation();
//   }, []);

//   // Live location update for dynamic route
//   useEffect(() => {
//     const interval = setInterval(() => {
//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//           setLocation(newLoc);
//           if (rideStatus === "idle" && isPickupCurrent && dropoffLocation) {
//             setPickupLocation(newLoc);
//             fetchRouteBetween(newLoc, dropoffLocation);
//           }
//         },
//         (err) => {
//           console.error("Live location error:", err);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     }, 5000); // Update every 5 seconds
//     return () => clearInterval(interval);
//   }, [rideStatus, isPickupCurrent, dropoffLocation]);

//   // Socket listeners
//   useEffect(() => {
//     if (!currentRideId) return;
//     const rideAccepted = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus("onTheWay");
//         setDriverId(data.driverId);
//         Alert.alert("Driver on the way 🚖");
//       }
//     };
//     const driverLocUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         const coords = { latitude: data.lat, longitude: data.lng };
//         setDriverLocation(coords);
//         if (lastCoord) {
//           const dist = haversine(lastCoord, coords);
//           setTravelledKm(prev => prev + dist / 1000);
//         }
//         setLastCoord(coords);
//       }
//     };
//     const rideStatusUpdate = (data: any) => {
//       if (data.rideId === currentRideId) {
//         setRideStatus(data.status);
//         if (data.status === "completed") {
//           Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
//           setTimeout(() => {
//             setCurrentRideId(null);
//             setDriverId(null);
//             setDriverLocation(null);
//             setRouteCoords([]);
//             setPickupLocation(null);
//             setDropoffLocation(null);
//             propHandlePickupChange("");
//             propHandleDropoffChange("");
//             setRideStatus("idle");
//           }, 3000);
//         }
//       }
//     };
//     const rideOtpListener = ({ rideId, otp }: any) => {
//       if (rideId === currentRideId) {
//         setBookingOTP(otp);
//         setShowConfirmModal(true);
//         Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
//       }
//     };
//     socket.on("rideAccepted", rideAccepted);
//     socket.on("driverLocationUpdate", driverLocUpdate);
//     socket.on("rideStatusUpdate", rideStatusUpdate);
//     socket.on("rideOTP", rideOtpListener);
//     return () => {
//       socket.off("rideAccepted", rideAccepted);
//       socket.off("driverLocationUpdate", driverLocUpdate);
//       socket.off("rideStatusUpdate", rideStatusUpdate);
//       socket.off("rideOTP", rideOtpListener);
//     };
//   }, [currentRideId, lastCoord, travelledKm]);

//   // Update route on driver location or status change
//   useEffect(() => {
//     if (driverLocation) {
//       let dest: LocationType | null = null;
//       if (rideStatus === "onTheWay" || rideStatus === "arrived") {
//         dest = pickupLocation;
//       } else if (rideStatus === "started") {
//         dest = dropoffLocation;
//       }
//       if (dest) {
//         fetchRouteBetween(driverLocation, dest);
//       }
//     } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
//       fetchRouteBetween(pickupLocation, dropoffLocation);
//     }
//     if (rideStatus === "completed") {
//       setRouteCoords([]);
//     }
//   }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);

//   // Simplified fetch suggestions function with better error handling and default values
//   const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
//     try {
//       console.log(`Fetching suggestions for: ${query}`);
      
//       // Check cache first
//       const cache = type === 'pickup' ? pickupCache : dropoffCache;
//       if (cache[query]) {
//         console.log(`Returning cached suggestions for: ${query}`);
//         return cache[query];
//       }

//       // Set loading state
//       if (type === 'pickup') {
//         setPickupLoading(true);
//       } else {
//         setDropoffLoading(true);
//       }
//       setSuggestionsError(null);

//       // Simple search URL
//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
//       console.log(`API URL: ${url}`);
      
//       const response = await fetch(url, {
//         headers: {
//           'User-Agent': 'EAZYGOApp/1.0',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(`API response:`, data);
      
//       if (!Array.isArray(data)) {
//         throw new Error('Invalid response format');
//       }

//       // Transform to our format with default values for type and importance
//       const suggestions: SuggestionType[] = data.map((item: any) => ({
//         id: item.place_id || `${item.lat}-${item.lon}`,
//         name: item.display_name,
//         address: extractAddress(item),
//         lat: item.lat,
//         lon: item.lon,
//         type: item.type || 'unknown', // Default to 'unknown' if type is missing
//         importance: item.importance || 0 // Default to 0 if importance is missing
//       }));

//       // Update cache
//       if (type === 'pickup') {
//         setPickupCache(prev => ({ ...prev, [query]: suggestions }));
//       } else {
//         setDropoffCache(prev => ({ ...prev, [query]: suggestions }));
//       }

//       console.log(`Processed suggestions:`, suggestions);
//       return suggestions;
//     } catch (error: any) {
//       console.error('Suggestions fetch error:', error);
//       setSuggestionsError(error.message || 'Failed to fetch suggestions');
//       return [];
//     } finally {
//       // Clear loading state
//       if (type === 'pickup') {
//         setPickupLoading(false);
//       } else {
//         setDropoffLoading(false);
//       }
//     }
//   };

//   // Helper function to extract a clean address from Nominatim result
//   const extractAddress = (item: any): string => {
//     if (item.address) {
//       const parts = [];
//       if (item.address.road) parts.push(item.address.road);
//       if (item.address.suburb) parts.push(item.address.suburb);
//       if (item.address.city || item.address.town || item.address.village) {
//         parts.push(item.address.city || item.address.town || item.address.village);
//       }
//       if (item.address.state) parts.push(item.address.state);
//       if (item.address.postcode) parts.push(item.address.postcode);
      
//       return parts.join(', ');
//     }
//     return item.display_name;
//   };

//   // Debounced pickup change handler with debugging
//   const handlePickupChange = (text: string) => {
//     console.log(`handlePickupChange called with: "${text}"`);
//     propHandlePickupChange(text);
    
//     // Clear previous timer
//     if (pickupDebounceTimer.current) {
//       clearTimeout(pickupDebounceTimer.current);
//       pickupDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       // Set loading state immediately for better UX
//       setPickupLoading(true);
//       setShowPickupSuggestions(true);
      
//       // Set new timer
//       pickupDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'pickup');
//         console.log(`Setting pickup suggestions:`, sugg);
//         setPickupSuggestions(sugg);
//         setPickupLoading(false);
//       }, 300); // 300ms debounce delay
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowPickupSuggestions(false);
//       setPickupSuggestions([]);
//     }
//   };

//   // Debounced dropoff change handler with debugging
//   const handleDropoffChange = (text: string) => {
//     console.log(`handleDropoffChange called with: "${text}"`);
//     propHandleDropoffChange(text);
    
//     // Clear previous timer
//     if (dropoffDebounceTimer.current) {
//       clearTimeout(dropoffDebounceTimer.current);
//       dropoffDebounceTimer.current = null;
//     }
    
//     if (text.length > 2) {
//       console.log(`Text length > 2, showing suggestions`);
//       // Set loading state immediately for better UX
//       setDropoffLoading(true);
//       setShowDropoffSuggestions(true);
      
//       // Set new timer
//       dropoffDebounceTimer.current = setTimeout(async () => {
//         console.log(`Debounce timer triggered, fetching suggestions for: ${text}`);
//         const sugg = await fetchSuggestions(text, 'dropoff');
//         console.log(`Setting dropoff suggestions:`, sugg);
//         setDropoffSuggestions(sugg);
//         setDropoffLoading(false);
//       }, 300); // 300ms debounce delay
//     } else {
//       console.log(`Text length <= 2, hiding suggestions`);
//       setShowDropoffSuggestions(false);
//       setDropoffSuggestions([]);
//     }
//   };

//   // Select pickup suggestion
//   const selectPickupSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected pickup suggestion:`, suggestion);
//     propHandlePickupChange(suggestion.name);
//     setPickupLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowPickupSuggestions(false);
//     setIsPickupCurrent(false);
//     if (dropoffLocation) {
//       fetchRouteBetween({
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       }, dropoffLocation);
//     }
//   };

//   // Select dropoff suggestion
//   const selectDropoffSuggestion = (suggestion: SuggestionType) => {
//     console.log(`Selected dropoff suggestion:`, suggestion);
//     propHandleDropoffChange(suggestion.name);
//     setDropoffLocation({
//       latitude: parseFloat(suggestion.lat),
//       longitude: parseFloat(suggestion.lon),
//     });
//     setShowDropoffSuggestions(false);
//     if (pickupLocation) {
//       fetchRouteBetween(pickupLocation, {
//         latitude: parseFloat(suggestion.lat),
//         longitude: parseFloat(suggestion.lon),
//       });
//     }
//   };

//   // Reverse geocoding function
//   const getAddressFromCoordinates = async (coords: LocationType) => {
//     setReverseGeocoding(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
//         {
//           headers: {
//             'User-Agent': 'EAZYGOApp/1.0',
//           },
//         }
//       );
//       const data = await response.json();
//       return data.display_name || 'Selected Location';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       return 'Selected Location';
//     } finally {
//       setReverseGeocoding(false);
//     }
//   };

//   // Updated map press handler
//   const handleMapPress = async (e: any) => {
//     if (selectionMode) {
//       const coords = e.nativeEvent.coordinate;
//       const address = await getAddressFromCoordinates(coords);
      
//       if (selectionMode === 'pickup') {
//         setPickupLocation(coords);
//         handlePickupChange(address);
//         setIsPickupCurrent(false);
//       } else if (selectionMode === 'dropoff') {
//         setDropoffLocation(coords);
//         handleDropoffChange(address);
//         if (pickupLocation) {
//           await fetchRouteBetween(pickupLocation, coords);
//         }
//       }
//       setSelectionMode(null);
//     } else {
//       const coords = e.nativeEvent.coordinate;
//       if (!pickupLocation) {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//       } else if (!dropoffLocation) {
//         setDropoffLocation(coords);
//         handleDropoffChange("Dropoff Selected");
//         await fetchRouteBetween(pickupLocation, coords);
//       } else {
//         setPickupLocation(coords);
//         handlePickupChange("Pickup Selected");
//         setIsPickupCurrent(false);
//         setDropoffLocation(null);
//         handleDropoffChange("");
//         setRouteCoords([]);
//       }
//     }
//   };

//   // Fetch route between two points
//   const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
//     try {
//       const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.code === "Ok" && data.routes.length > 0) {
//         const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
//         setRouteCoords(coords);
//         setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
//         setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
//       } else {
//         setApiError("Failed to fetch route");
//         Alert.alert("Route Error", "Could not find route. Please try different locations.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRouteCoords([]);
//       setApiError("Network error fetching route");
//       Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
//     }
//   };

//   // Animate price panel
//   useEffect(() => {
//     if (showPricePanel) {
//       Animated.timing(panelAnimation, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(panelAnimation, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [showPricePanel]);

//   // Calculate estimated price
//   const calculatePrice = () => {
//     if (!pickupLocation || !dropoffLocation || !distance) return null;
//     const distanceKm = parseFloat(distance);
//     let baseFare = 0;
//     let perKm = 0;
//     switch (selectedRideType) {
//       case 'bike':
//         baseFare = 20;
//         perKm = 8;
//         break;
//       case 'taxi':
//         baseFare = 50;
//         perKm = 15;
//         break;
//       case 'port':
//         baseFare = 80;
//         perKm = 25;
//         break;
//       default:
//         baseFare = 50;
//         perKm = 15;
//     }
//     const multiplier = wantReturn ? 2 : 1;
//     return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
//   };

//   useEffect(() => {
//     if (pickupLocation && dropoffLocation && distance) {
//       const price = calculatePrice();
//       setEstimatedPrice(price);
//     }
//   }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);

//   // Handle ride type selection
//   const handleRideTypeSelect = (type: string) => {
//     if (selectedRideType === type) {
//       return;
//     } else {
//       setSelectedRideType(type);
//       setShowPricePanel(true);
//       if (pickupLocation && dropoffLocation) {
//         const price = calculatePrice();
//         setEstimatedPrice(price);
//       }
//     }
//   };

//   // Handle book ride
//   const handleBookRide = () => {
//     if (!pickupLocation || !dropoffLocation) {
//       Alert.alert("Error", "Please select both pickup and dropoff locations");
//       return;
//     }
//     if (!estimatedPrice) {
//       Alert.alert("Error", "Price calculation failed. Please try again.");
//       return;
//     }
//     const rideId = "RID" + Date.now();
//     setCurrentRideId(rideId);
//     setRideStatus("searching");
//     socket.emit("bookRide", {
//       rideId,
//       userId: "U001",
//       pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
//       drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
//       vehicleType: selectedRideType,
//     });
//     Alert.alert("Searching for driver... 🚖");
//   };

//   // Confirm booking
//   const handleConfirmBooking = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (!token) {
//         Alert.alert('Authentication Error', 'Please log in again to book a ride');
//         return;
//       }
//       const backendUrl = getBackendUrl();
//       const rideData = {
//         pickupLocation: pickup,
//         dropoffLocation: dropoff,
//         pickupCoordinates: pickupLocation,
//         dropoffCoordinates: dropoffLocation,
//         fare: estimatedPrice,
//         rideType: selectedRideType,
//         otp: bookingOTP,
//         distance,
//         travelTime,
//         isReturnTrip: wantReturn,
//       };
//       const response = await axios.post(
//         `${backendUrl}/api/users/book-ride`,
//         rideData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         }
//       );
//       if (response.data.success) {
//         if (response.data.ride && response.data.ride.customerId) {
//           await AsyncStorage.setItem('customerId', response.data.ride.customerId);
//         }
//         setShowConfirmModal(false);
//         Alert.alert(
//           'Booking Confirmed',
//           `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
//         );
//       } else {
//         throw new Error(response.data.error || 'Failed to book ride');
//       }
//     } catch (error: any) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
//         } else {
//           Alert.alert(
//             'Booking Failed',
//             error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.'
//           );
//         }
//       } else if (error.request) {
//         Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       } else {
//         Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
//       }
//       setApiError(error.message || 'Failed to book ride');
//     }
//   };

//   // Render vehicle icon
//   const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
//     try {
//       switch (type) {
//         case 'bike':
//           return <BikeIcon color={color} size={size} />;
//         case 'taxi':
//           return <TaxiIcon color={color} size={size} />;
//         case 'port':
//           return <PortIcon color={color} size={size} />;
//         default:
//           return <TaxiIcon color={color} size={size} />;
//       }
//     } catch (error) {
//       return <TaxiIcon color={color} size={size} />;
//     }
//   };

//   // Render suggestion item with place type icon
//   const renderSuggestionItem = (item: SuggestionType, onSelect: () => void) => {
//     // Get icon based on place type
//     let iconName = 'location-on';
//     let iconColor = '#A9A9A9';
    
//     if (item.type.includes('railway') || item.type.includes('station')) {
//       iconName = 'train';
//       iconColor = '#3F51B5';
//     } else if (item.type.includes('airport')) {
//       iconName = 'flight';
//       iconColor = '#2196F3';
//     } else if (item.type.includes('bus')) {
//       iconName = 'directions-bus';
//       iconColor = '#FF9800';
//     } else if (item.type.includes('hospital')) {
//       iconName = 'local-hospital';
//       iconColor = '#F44336';
//     } else if (item.type.includes('school') || item.type.includes('college')) {
//       iconName = 'school';
//       iconColor = '#4CAF50';
//     } else if (item.type.includes('place_of_worship')) {
//       iconName = 'church';
//       iconColor = '#9C27B0';
//     } else if (item.type.includes('shop') || item.type.includes('mall')) {
//       iconName = 'shopping-mall';
//       iconColor = '#E91E63';
//     } else if (item.type.includes('park')) {
//       iconName = 'park';
//       iconColor = '#4CAF50';
//     }
    
//     return (
//       <TouchableOpacity style={styles.suggestionItem} onPress={onSelect}>
//         <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
//         <View style={styles.suggestionTextContainer}>
//           <Text style={styles.suggestionMainText} numberOfLines={1}>
//             {extractMainName(item.name)}
//           </Text>
//           <Text style={styles.suggestionSubText} numberOfLines={1}>
//             {item.address}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   // Helper function to extract the main name from the full address
//   const extractMainName = (fullName: string): string => {
//     const parts = fullName.split(',');
//     return parts[0].trim();
//   };

//   const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;

//   return (
//     <View style={styles.contentContainer}>
//       <View style={styles.mapContainer}>
//         {loadingLocation ? (
//           <Text style={styles.mapLoadingText}>Loading map...</Text>
//         ) : location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             region={mapRegion}
//             onRegionChangeComplete={(region) => setMapRegion(region)}
//             showsUserLocation
//             onPress={handleMapPress}
//           >
//             {pickupLocation && (
//               <Marker coordinate={pickupLocation} title="Pickup">
//                 <View style={styles.pickupLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#4CAF50" />
//                 </View>
//               </Marker>
//             )}
//             {dropoffLocation && (
//               <Marker coordinate={dropoffLocation} title="Dropoff">
//                 <View style={styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color="#F44336" />
//                 </View>
//               </Marker>
//             )}
//             {driverLocation && (
//               <Marker coordinate={driverLocation} title="Driver">
//                 <View style={styles.vehicleMarkerContainer}>
//                   {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
//                 </View>
//               </Marker>
//             )}
//             {selectionMode && (
//               <Marker coordinate={{ 
//                 latitude: mapRegion.latitude, 
//                 longitude: mapRegion.longitude 
//               }}>
//                 <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
//                   <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
//                 </View>
//               </Marker>
//             )}
//             {routeCoords.length > 0 && (
//               <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
//             )}
//           </MapView>
//         ) : (
//           <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
//         )}
//       </View>
      
//       <View style={styles.inputContainer}>
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Pickup Location"
//             value={pickup}
//             onChangeText={handlePickupChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'pickup' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Pickup Suggestions with Loading Indicator */}
//         {showPickupSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {pickupLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : pickupSuggestions.length > 0 ? (
//               pickupSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectPickupSuggestion(item))
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
        
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Dropoff Location"
//             value={dropoff}
//             onChangeText={handleDropoffChange}
//             editable={!selectionMode}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.selectMapButton,
//               selectionMode === 'dropoff' && styles.activeSelectMapButton
//             ]}
//             onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
//           >
//             <Text style={styles.selectMapButtonText}>
//               {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Dropoff Suggestions with Loading Indicator */}
//         {showDropoffSuggestions && (
//           <View style={styles.suggestionsContainer}>
//             {dropoffLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#4CAF50" />
//                 <Text style={styles.loadingText}>Loading suggestions...</Text>
//               </View>
//             ) : suggestionsError ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{suggestionsError}</Text>
//               </View>
//             ) : dropoffSuggestions.length > 0 ? (
//               dropoffSuggestions.map((item) => (
//                 renderSuggestionItem(item, () => selectDropoffSuggestion(item))
//               ))
//             ) : (
//               <View style={styles.noSuggestionsContainer}>
//                 <Text style={styles.noSuggestionsText}>No suggestions found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
      
//       {(distance || travelTime) && (
//         <View style={styles.distanceTimeContainer}>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
//             <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
//           </View>
//           <View style={styles.distanceTimeItem}>
//             <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
//             <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
//           </View>
//         </View>
//       )}
      
//       {apiError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{apiError}</Text>
//         </View>
//       )}
      
//       {(pickupLocation && dropoffLocation && !routeCoords.length) && (
//         <TouchableOpacity 
//           style={styles.seeRouteButton}
//           onPress={async () => {
//             if (pickupLocation && dropoffLocation) {
//               await fetchRouteBetween(pickupLocation, dropoffLocation);
//             }
//           }}
//         >
//           <Text style={styles.seeRouteButtonText}>See Route</Text>
//         </TouchableOpacity>
//       )}
      
//       <RideTypeSelector
//         selectedRideType={selectedRideType}
//         setSelectedRideType={handleRideTypeSelect}
//       />
      
//       <TouchableOpacity
//         style={[
//           styles.bookRideButton,
//           isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
//         ]}
//         onPress={handleBookRide}
//         disabled={!isBookRideButtonEnabled}
//       >
//         <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
//       </TouchableOpacity>
      
//       {showPricePanel && selectedRideType && (
//         <Animated.View
//           style={[
//             styles.pricePanel,
//             {
//               transform: [{
//                 translateY: panelAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [300, 0],
//                 }),
//               }],
//             },
//           ]}
//         >
//           <View style={styles.panelHeader}>
//             <Text style={styles.panelTitle}>Ride Details</Text>
//             <TouchableOpacity onPress={() => setShowPricePanel(false)}>
//               <MaterialIcons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.priceDetailsContainer}>
//             <View style={styles.vehicleIconContainer}>
//               {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
//             </View>
//             <View style={styles.priceInfoContainer}>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Pickup:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Drop-off:</Text>
//                 <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Distance:</Text>
//                 <Text style={styles.priceValue}>{distance || '---'}</Text>
//               </View>
//               <View style={styles.priceRow}>
//                 <Text style={styles.priceLabel}>Price:</Text>
//                 <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
//               </View>
//               <View style={styles.returnTripRow}>
//                 <Text style={styles.priceLabel}>Return trip:</Text>
//                 <Switch
//                   value={wantReturn}
//                   onValueChange={setWantReturn}
//                   trackColor={{ false: '#767577', true: '#4CAF50' }}
//                   thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={styles.bookButtonContainer}>
//             <TouchableOpacity
//               style={styles.bookMyRideButton}
//               onPress={handleBookRide}
//             >
//               <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Confirm Booking</Text>
//               <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
//                 <MaterialIcons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <View style={styles.modalIconContainer}>
//                 <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
//               </View>
//               <Text style={styles.modalMessage}>
//                 Thank you for choosing EAZY GO!
//               </Text>
//               <Text style={styles.modalSubMessage}>
//                 Your ride has been successfully booked.
//               </Text>
//               <View style={styles.otpContainer}>
//                 <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
//                 <Text style={styles.otpValue}>{bookingOTP}</Text>
//               </View>
//               <Text style={styles.otpWarning}>
//                 Please don't share it with anyone. Only share with our driver.
//               </Text>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowConfirmModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalConfirmButton}
//                 onPress={handleConfirmBooking}
//               >
//                 <Text style={styles.modalConfirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   mapContainer: {
//     width: '100%',
//     height: Dimensions.get('window').height * 0.3,
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: { ...StyleSheet.absoluteFillObject },
//   mapLoadingText: {
//     color: '#757575',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   selectMapButton: {
//     backgroundColor: '#E0E0E0',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   activeSelectMapButton: {
//     backgroundColor: '#FF5722',
//   },
//   selectMapButtonText: {
//     color: '#333',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   seeRouteButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
//   seeRouteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   suggestionsContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   suggestionIcon: {
//     marginRight: 12,
//   },
//   suggestionTextContainer: {
//     flex: 1,
//   },
//   suggestionMainText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   suggestionSubText: {
//     fontSize: 12,
//     color: '#757575',
//     marginTop: 2,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   loadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#666666',
//   },
//   noSuggestionsContainer: {
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   noSuggestionsText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   distanceTimeContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   distanceTimeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   distanceTimeLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     marginRight: 8,
//   },
//   distanceTimeValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   bookRideButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     width: '100%',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   enabledBookRideButton: {
//     backgroundColor: '#FF5722',
//   },
//   disabledBookRideButton: {
//     backgroundColor: '#BDBDBD',
//   },
//   bookRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     width: '100%',
//     backgroundColor: '#FFEBEE',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     borderLeftWidth: 4,
//     borderLeftColor: '#F44336',
//   },
//   errorText: {
//     color: '#D32F2F',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   pricePanel: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: Dimensions.get('window').height * 0.5,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   panelHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   panelTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   priceDetailsContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   vehicleIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   priceInfoContainer: {
//     flex: 1,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   priceLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#757575',
//     flex: 1,
//   },
//   priceValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   returnTripRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   bookButtonContainer: {
//     marginTop: 10,
//   },
//   bookMyRideButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bookMyRideButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   modalContent: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalIconContainer: {
//     marginBottom: 15,
//   },
//   modalMessage: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   modalSubMessage: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   otpContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 15,
//     width: '100%',
//   },
//   otpLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   otpValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF5722',
//   },
//   otpWarning: {
//     fontSize: 12,
//     color: '#F44336',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalCancelButton: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   modalCancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   modalConfirmButton: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   modalConfirmButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   pickupLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   dropoffLocationMarker: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   vehicleMarkerContainer: {
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   // New styles for RideTypeSelector
//   rideTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 15,
//   },
//   rideTypeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     width: '30%',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   selectedRideTypeButton: {
//     backgroundColor: '#FF5722',
//   },
//   rideTypeText: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   selectedRideTypeText: {
//     color: '#FFFFFF',
//   },
// });

// export default TaxiContent;


















































import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Animated,
  Switch,
  Modal,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import socket from '../../socket';
import haversine from 'haversine-distance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBackendUrl } from '../../util/backendConfig';

// Professional SVG icons (unchanged)
const TaxiIcon = ({ color = '#000000', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill={color} />
    <Path d="M5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF" opacity={0.8} />
    <Rect x="10" y="3" width="4" height="2" rx="0.5" fill={color} />
    <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={color} />
    <Circle cx="6.5" cy="16" r="1.5" fill={color} />
    <Circle cx="17.5" cy="16" r="1.5" fill={color} />
  </Svg>
);
const PortIcon = ({ color = '#000000', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={color} />
    <Path d="M3 6h14v2H3z" fill={color} opacity={0.7} />
    <Path d="M5 10h12v1H5z" fill={color} opacity={0.5} />
  </Svg>
);
const BikeIcon = ({ color = '#000000', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6.5 16l3.5-6l3 5l2-3l3 4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 10c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
    <Path d="M14 11c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2z" fill={color} />
    <Circle cx="18" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="18" cy="16" r="1" fill={color} />
    <Circle cx="6" cy="16" r="3" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="6" cy="16" r="1" fill={color} />
    <Circle cx="10" cy="16" r="1.5" stroke={color} strokeWidth={1.5} fill="none" />
    <Path d="M10 14.5v3M8.5 16h3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M10 16c-1.5 0-2.5-1-2.5-2.5" stroke={color} strokeWidth={1} fill="none" strokeDasharray="1,1" />
    <Circle cx="12" cy="8" r="2" fill="#4CAF50" />
  </Svg>
);

// RideTypeSelector component (unchanged)
const RideTypeSelector = ({ selectedRideType, setSelectedRideType }) => {
  return (
    <View style={styles.rideTypeContainer}>
      <TouchableOpacity
        style={[
          styles.rideTypeButton,
          selectedRideType === 'taxi' && styles.selectedRideTypeButton,
        ]}
        onPress={() => setSelectedRideType('taxi')}
      >
        <TaxiIcon color={selectedRideType === 'taxi' ? '#FFFFFF' : '#000000'} size={24} />
        <Text style={[
          styles.rideTypeText,
          selectedRideType === 'taxi' && styles.selectedRideTypeText,
        ]}>Taxi</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.rideTypeButton,
          selectedRideType === 'bike' && styles.selectedRideTypeButton,
        ]}
        onPress={() => setSelectedRideType('bike')}
      >
        <BikeIcon color={selectedRideType === 'bike' ? '#FFFFFF' : '#000000'} size={24} />
        <Text style={[
          styles.rideTypeText,
          selectedRideType === 'bike' && styles.selectedRideTypeText,
        ]}>Bike</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.rideTypeButton,
          selectedRideType === 'port' && styles.selectedRideTypeButton,
        ]}
        onPress={() => setSelectedRideType('port')}
      >
        <PortIcon color={selectedRideType === 'port' ? '#FFFFFF' : '#000000'} size={24} />
        <Text style={[
          styles.rideTypeText,
          selectedRideType === 'port' && styles.selectedRideTypeText,
        ]}>Port</Text>
      </TouchableOpacity>
    </View>
  );
};

interface LocationType {
  latitude: number;
  longitude: number;
}

interface SuggestionType {
  id: string;
  name: string;
  address: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

interface DriverType {
  driverId: string;
  name: string;
  location: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  vehicleType: string;
}

interface TaxiContentProps {
  loadingLocation?: boolean;
  pickup: string;
  dropoff: string;
  handlePickupChange: (text: string) => void;
  handleDropoffChange: (text: string) => void;
}

const TaxiContent: React.FC<TaxiContentProps> = ({
  loadingLocation: propLoadingLocation,
  pickup,
  dropoff,
  handlePickupChange: propHandlePickupChange,
  handleDropoffChange: propHandleDropoffChange,
}) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedRideType, setSelectedRideType] = useState<string>('taxi');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [showPricePanel, setShowPricePanel] = useState(false);
  const [wantReturn, setWantReturn] = useState(false);
  const [distance, setDistance] = useState<string>('');
  const [travelTime, setTravelTime] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingOTP, setBookingOTP] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(null);
  const [routeCoords, setRouteCoords] = useState<LocationType[]>([]);
  const [currentRideId, setCurrentRideId] = useState<string | null>(null);
  const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "onTheWay" | "arrived" | "started" | "completed">("idle");
  const [driverId, setDriverId] = useState<string | null>(null);
  const [driverLocation, setDriverLocation] = useState<LocationType | null>(null);
  const [travelledKm, setTravelledKm] = useState(0);
  const [lastCoord, setLastCoord] = useState<LocationType | null>(null);
  const [nearbyDrivers, setNearbyDrivers] = useState<DriverType[]>([]);
  const [nearbyDriversCount, setNearbyDriversCount] = useState<number>(0);
  
  const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff' | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1, // Wider initial view
    longitudeDelta: 0.1,
  });
  const [reverseGeocoding, setReverseGeocoding] = useState(false);
  
  const [pickupSuggestions, setPickupSuggestions] = useState<SuggestionType[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<SuggestionType[]>([]);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
  const [pickupLoading, setPickupLoading] = useState(false);
  const [dropoffLoading, setDropoffLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
  const [pickupCache, setPickupCache] = useState<Record<string, SuggestionType[]>>({});
  const [dropoffCache, setDropoffCache] = useState<Record<string, SuggestionType[]>>({});
  
  const [isPickupCurrent, setIsPickupCurrent] = useState(true);
  
  const pickupDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const dropoffDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  const panelAnimation = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView | null>(null);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Fetch nearby drivers via Socket.IO
  const fetchNearbyDrivers = (latitude: number, longitude: number) => {
    socket.emit("requestNearbyDrivers", { latitude, longitude, radius: 5000 }); // 5km radius
  };

  useEffect(() => {
    const requestLocation = async () => {
      setIsLoadingLocation(true);
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location permission denied`);
          Alert.alert("Permission Denied", "Location permission is required to proceed.");
          setIsLoadingLocation(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (pos) => {
          const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location fetched successfully:`, loc);
          setLocation(loc);
          setPickupLocation(loc);
          setMapRegion({
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          propHandlePickupChange("My Current Location");
          setIsPickupCurrent(true);
          setIsLoadingLocation(false);
          fetchNearbyDrivers(loc.latitude, loc.longitude); // Fetch nearby drivers on load
        },
        (err) => {
          console.log(`[${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}] Location error:`, err.code, err.message);
          setIsLoadingLocation(false);
          Alert.alert("Location Error", "Could not fetch location. Please try again or check your GPS settings.");
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 10,
        }
      );
    };
    requestLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (location && (rideStatus === "idle" || rideStatus === "searching")) {
        Geolocation.getCurrentPosition(
          (pos) => {
            const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
            setLocation(newLoc);
            if (isPickupCurrent && dropoffLocation) {
              setPickupLocation(newLoc);
              fetchRouteBetween(newLoc, dropoffLocation);
            }
            fetchNearbyDrivers(newLoc.latitude, newLoc.longitude); // Update nearby drivers every 5 seconds
          },
          (err) => {
            console.error("Live location error:", err);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [rideStatus, isPickupCurrent, dropoffLocation, location]);

  // Handle initial nearby drivers response
  useEffect(() => {
    const handleNearbyDriversResponse = (data: { drivers: DriverType[] }) => {
      if (!location) return;
      const filteredDrivers = data.drivers
        .filter(driver => {
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            driver.location.coordinates[1], // latitude
            driver.location.coordinates[0]  // longitude
          );
          return distance <= 5; // 5km radius
        })
        .sort((a, b) => calculateDistance(location.latitude, location.longitude, a.location.coordinates[1], a.location.coordinates[0]) -
                         calculateDistance(location.latitude, location.longitude, b.location.coordinates[1], b.location.coordinates[0]))
        .slice(0, 10); // Limit to 10 drivers
      setNearbyDrivers(filteredDrivers);
      setNearbyDriversCount(filteredDrivers.length);
    };
    socket.on("nearbyDriversResponse", handleNearbyDriversResponse);
    return () => socket.off("nearbyDriversResponse", handleNearbyDriversResponse);
  }, [location]);

  // Handle real-time driver location updates
  useEffect(() => {
// 修改 handleDriverLiveLocationUpdate 函数
const handleDriverLiveLocationUpdate = (data: { driverId: string; lat: number; lng: number }) => {
  if (!location) return;
  setNearbyDrivers((prev) => {
    // 检查司机是否已存在
    const existingIndex = prev.findIndex(d => d.driverId === data.driverId);
    
    if (existingIndex >= 0) {
      // 更新现有司机的位置
      const updated = [...prev];
      updated[existingIndex] = {
        ...updated[existingIndex],
        location: { coordinates: [data.lng, data.lat] }
      };
      return updated;
    } else {
      // 添加新司机
      return [
        ...prev,
        {
          driverId: data.driverId,
          name: `Driver ${data.driverId}`,
          location: { coordinates: [data.lng, data.lat] },
          vehicleType: "taxi",
        }
      ];
    }
  });
  
  // 更新司机计数
  setNearbyDriversCount(prev => Math.min(10, prev + 1));
};
    socket.on("driverLiveLocationUpdate", handleDriverLiveLocationUpdate);
    return () => socket.off("driverLiveLocationUpdate", handleDriverLiveLocationUpdate);
  }, [location]);

  // Listen for ride-related updates (unchanged)
  useEffect(() => {
    if (!currentRideId) return;
    const rideAccepted = (data: any) => {
      if (data.rideId === currentRideId) {
        setRideStatus("onTheWay");
        setDriverId(data.driverId);
        Alert.alert("Driver on the way 🚖");
      }
    };
    const driverLocUpdate = (data: any) => {
      if (data.rideId === currentRideId) {
        const coords = { latitude: data.lat, longitude: data.lng };
        setDriverLocation(coords);
        if (lastCoord) {
          const dist = haversine(lastCoord, coords);
          setTravelledKm(prev => prev + dist / 1000);
        }
        setLastCoord(coords);
      }
    };
    const rideStatusUpdate = (data: any) => {
      if (data.rideId === currentRideId) {
        setRideStatus(data.status);
        if (data.status === "completed") {
          Alert.alert("🎉 Ride Completed", `Distance Travelled: ${travelledKm.toFixed(2)} km`);
          setTimeout(() => {
            setCurrentRideId(null);
            setDriverId(null);
            setDriverLocation(null);
            setRouteCoords([]);
            setPickupLocation(null);
            setDropoffLocation(null);
            propHandlePickupChange("");
            propHandleDropoffChange("");
            setRideStatus("idle");
          }, 3000);
        }
      }
    };
    const rideOtpListener = ({ rideId, otp }: any) => {
      if (rideId === currentRideId) {
        setBookingOTP(otp);
        setShowConfirmModal(true);
        Alert.alert("OTP Received", `Share OTP with driver: ${otp}`);
      }
    };
    socket.on("rideAccepted", rideAccepted);
    socket.on("driverLocationUpdate", driverLocUpdate);
    socket.on("rideStatusUpdate", rideStatusUpdate);
    socket.on("rideOTP", rideOtpListener);
    return () => {
      socket.off("rideAccepted", rideAccepted);
      socket.off("driverLocationUpdate", driverLocUpdate);
      socket.off("rideStatusUpdate", rideStatusUpdate);
      socket.off("rideOTP", rideOtpListener);
    };
  }, [currentRideId, lastCoord, travelledKm]);

  useEffect(() => {
    if (driverLocation) {
      let dest: LocationType | null = null;
      if (rideStatus === "onTheWay" || rideStatus === "arrived") {
        dest = pickupLocation;
      } else if (rideStatus === "started") {
        dest = dropoffLocation;
      }
      if (dest) {
        fetchRouteBetween(driverLocation, dest);
      }
    } else if (rideStatus === "idle" && pickupLocation && dropoffLocation) {
      fetchRouteBetween(pickupLocation, dropoffLocation);
    }
    if (rideStatus === "completed") {
      setRouteCoords([]);
    }
  }, [driverLocation, rideStatus, pickupLocation, dropoffLocation]);

  const fetchSuggestions = async (query: string, type: 'pickup' | 'dropoff'): Promise<SuggestionType[]> => {
    try {
      console.log(`Fetching suggestions for: ${query}`);
      const cache = type === 'pickup' ? pickupCache : dropoffCache;
      if (cache[query]) {
        console.log(`Returning cached suggestions for: ${query}`);
        return cache[query];
      }
      if (type === 'pickup') setPickupLoading(true);
      else setDropoffLoading(true);
      setSuggestionsError(null);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=IN`;
      console.log(`API URL: ${url}`);
      
      const response = await fetch(url, {
        headers: { 'User-Agent': 'EAZYGOApp/1.0' },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid response format');
      
      const suggestions: SuggestionType[] = data.map((item: any) => ({
        id: item.place_id || `${item.lat}-${item.lon}`,
        name: item.display_name,
        address: extractAddress(item),
        lat: item.lat,
        lon: item.lon,
        type: item.type || 'unknown',
        importance: item.importance || 0,
      }));
      if (type === 'pickup') setPickupCache(prev => ({ ...prev, [query]: suggestions }));
      else setDropoffCache(prev => ({ ...prev, [query]: suggestions }));
      return suggestions;
    } catch (error: any) {
      console.error('Suggestions fetch error:', error);
      setSuggestionsError(error.message || 'Failed to fetch suggestions');
      return [];
    } finally {
      if (type === 'pickup') setPickupLoading(false);
      else setDropoffLoading(false);
    }
  };

  const extractAddress = (item: any): string => {
    if (item.address) {
      const parts = [];
      if (item.address.road) parts.push(item.address.road);
      if (item.address.suburb) parts.push(item.address.suburb);
      if (item.address.city || item.address.town || item.address.village) parts.push(item.address.city || item.address.town || item.address.village);
      if (item.address.state) parts.push(item.address.state);
      if (item.address.postcode) parts.push(item.address.postcode);
      return parts.join(', ');
    }
    return item.display_name;
  };

  const handlePickupChange = (text: string) => {
    console.log(`handlePickupChange called with: "${text}"`);
    propHandlePickupChange(text);
    if (pickupDebounceTimer.current) {
      clearTimeout(pickupDebounceTimer.current);
      pickupDebounceTimer.current = null;
    }
    if (text.length > 2) {
      setPickupLoading(true);
      setShowPickupSuggestions(true);
      pickupDebounceTimer.current = setTimeout(async () => {
        const sugg = await fetchSuggestions(text, 'pickup');
        setPickupSuggestions(sugg);
        setPickupLoading(false);
      }, 500);
    } else {
      setShowPickupSuggestions(false);
      setPickupSuggestions([]);
    }
  };

  const handleDropoffChange = (text: string) => {
    console.log(`handleDropoffChange called with: "${text}"`);
    propHandleDropoffChange(text);
    if (dropoffDebounceTimer.current) {
      clearTimeout(dropoffDebounceTimer.current);
      dropoffDebounceTimer.current = null;
    }
    if (text.length > 2) {
      setDropoffLoading(true);
      setShowDropoffSuggestions(true);
      dropoffDebounceTimer.current = setTimeout(async () => {
        const sugg = await fetchSuggestions(text, 'dropoff');
        setDropoffSuggestions(sugg);
        setDropoffLoading(false);
      }, 500);
    } else {
      setShowDropoffSuggestions(false);
      setDropoffSuggestions([]);
    }
  };

  const selectPickupSuggestion = (suggestion: SuggestionType) => {
    propHandlePickupChange(suggestion.name);
    setPickupLocation({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
    setShowPickupSuggestions(false);
    setIsPickupCurrent(false);
    if (dropoffLocation) fetchRouteBetween({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) }, dropoffLocation);
    fetchNearbyDrivers(parseFloat(suggestion.lat), parseFloat(suggestion.lon));
  };

  const selectDropoffSuggestion = (suggestion: SuggestionType) => {
    propHandleDropoffChange(suggestion.name);
    setDropoffLocation({ latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
    setShowDropoffSuggestions(false);
    if (pickupLocation) fetchRouteBetween(pickupLocation, { latitude: parseFloat(suggestion.lat), longitude: parseFloat(suggestion.lon) });
  };

  const getAddressFromCoordinates = async (coords: LocationType) => {
    setReverseGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
        { headers: { 'User-Agent': 'EAZYGOApp/1.0' } }
      );
      const data = await response.json();
      return data.display_name || 'Selected Location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      Alert.alert('Error', 'Failed to get address from coordinates.');
      return 'Selected Location';
    } finally {
      setReverseGeocoding(false);
    }
  };

  const handleMapPress = async (e: any) => {
    if (selectionMode) {
      setReverseGeocoding(true);
      const coords = e.nativeEvent.coordinate;
      const address = await getAddressFromCoordinates(coords);
      if (selectionMode === 'pickup') {
        setPickupLocation(coords);
        handlePickupChange(address);
        setIsPickupCurrent(false);
        fetchNearbyDrivers(coords.latitude, coords.longitude);
      } else if (selectionMode === 'dropoff') {
        setDropoffLocation(coords);
        handleDropoffChange(address);
        if (pickupLocation) await fetchRouteBetween(pickupLocation, coords);
      }
      setSelectionMode(null);
      setReverseGeocoding(false);
    } else {
      const coords = e.nativeEvent.coordinate;
      if (!pickupLocation) {
        setPickupLocation(coords);
        handlePickupChange("Pickup Selected");
        setIsPickupCurrent(false);
        fetchNearbyDrivers(coords.latitude, coords.longitude);
      } else if (!dropoffLocation) {
        setDropoffLocation(coords);
        handleDropoffChange("Dropoff Selected");
        await fetchRouteBetween(pickupLocation, coords);
      } else {
        setPickupLocation(coords);
        handlePickupChange("Pickup Selected");
        setIsPickupCurrent(false);
        setDropoffLocation(null);
        handleDropoffChange("");
        setRouteCoords([]);
        fetchNearbyDrivers(coords.latitude, coords.longitude);
      }
    }
  };

  const fetchRouteBetween = async (origin: LocationType, dest: LocationType) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.code === "Ok" && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => ({ latitude: lat, longitude: lng }));
        setRouteCoords(coords);
        setDistance((data.routes[0].distance / 1000).toFixed(2) + " km");
        setTravelTime(Math.round(data.routes[0].duration / 60) + " mins");
      } else {
        setApiError("Failed to fetch route");
        Alert.alert("Route Error", "Could not find route. Please try different locations.");
      }
    } catch (err) {
      console.error(err);
      setRouteCoords([]);
      setApiError("Network error fetching route");
      Alert.alert("Route Error", "Failed to fetch route. Please check your internet connection.");
    }
  };

  useEffect(() => {
    if (showPricePanel) {
      Animated.timing(panelAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(panelAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showPricePanel]);

  const calculatePrice = () => {
    if (!pickupLocation || !dropoffLocation || !distance) return null;
    const distanceKm = parseFloat(distance);
    let baseFare = 0;
    let perKm = 0;
    switch (selectedRideType) {
      case 'bike': baseFare = 20; perKm = 8; break;
      case 'taxi': baseFare = 50; perKm = 15; break;
      case 'port': baseFare = 80; perKm = 25; break;
      default: baseFare = 50; perKm = 15;
    }
    const multiplier = wantReturn ? 2 : 1;
    return Math.round((baseFare + (distanceKm * perKm)) * multiplier);
  };

  useEffect(() => {
    if (pickupLocation && dropoffLocation && distance) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
  }, [pickupLocation, dropoffLocation, selectedRideType, wantReturn, distance]);

  const handleRideTypeSelect = (type: string) => {
    if (selectedRideType === type) return;
    setSelectedRideType(type);
    setShowPricePanel(true);
    if (pickupLocation && dropoffLocation) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
  };

  const handleBookRide = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Authentication Error', 'Please log in to book a ride');
      return;
    }
    const userId = await AsyncStorage.getItem('userId') || 'U001';
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert("Error", "Please select both pickup and dropoff locations");
      return;
    }
    if (!estimatedPrice) {
      Alert.alert("Error", "Price calculation failed. Please try again.");
      return;
    }
    const rideId = "RID" + Date.now();
    setCurrentRideId(rideId);
    setRideStatus("searching");
    socket.emit("bookRide", {
      rideId,
      userId,
      pickup: { lat: pickupLocation.latitude, lng: pickupLocation.longitude, address: pickup },
      drop: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude, address: dropoff },
      vehicleType: selectedRideType,
    });
    Alert.alert("Searching for driver... 🚖");
  };

  const handleConfirmBooking = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Authentication Error', 'Please log in again to book a ride');
        return;
      }
      const backendUrl = getBackendUrl();
      const rideData = {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        pickupCoordinates: pickupLocation,
        dropoffCoordinates: dropoffLocation,
        fare: estimatedPrice,
        rideType: selectedRideType,
        otp: bookingOTP,
        distance,
        travelTime,
        isReturnTrip: wantReturn,
      };
      const response = await axios.post(
        `${backendUrl}/api/users/book-ride`,
        rideData,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      if (response.data.success) {
        if (response.data.ride && response.data.ride.customerId) await AsyncStorage.setItem('customerId', response.data.ride.customerId);
        setShowConfirmModal(false);
        Alert.alert(
          'Booking Confirmed',
          `Your ride has been booked with OTP: ${bookingOTP}\nCustomer ID: ${response.data.ride.customerId || 'N/A'}\nDriver will arrive shortly.`
        );
      } else throw new Error(response.data.error || 'Failed to book ride');
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
        else Alert.alert('Booking Failed', error.response.data.error || error.response.data.message || 'Failed to book ride. Please try again.');
      } else if (error.request) Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
      else Alert.alert('Booking Failed', error.message || 'Failed to book ride. Please try again.');
      setApiError(error.message || 'Failed to book ride');
    }
  };

  const renderVehicleIcon = (type: 'bike' | 'taxi' | 'port', size: number = 24, color: string = '#000000') => {
    try {
      switch (type) {
        case 'bike': return <BikeIcon color={color} size={size} />;
        case 'taxi': return <TaxiIcon color={color} size={size} />;
        case 'port': return <PortIcon color={color} size={size} />;
        default: return <TaxiIcon color={color} size={size} />;
      }
    } catch (error) {
      return <TaxiIcon color={color} size={size} />;
    }
  };

  const renderSuggestionItem = (item: SuggestionType, onSelect: () => void, key: string) => {
    let iconName = 'location-on';
    let iconColor = '#A9A9A9';
    if (item.type.includes('railway') || item.type.includes('station')) { iconName = 'train'; iconColor = '#3F51B5'; }
    else if (item.type.includes('airport')) { iconName = 'flight'; iconColor = '#2196F3'; }
    else if (item.type.includes('bus')) { iconName = 'directions-bus'; iconColor = '#FF9800'; }
    else if (item.type.includes('hospital')) { iconName = 'local-hospital'; iconColor = '#F44336'; }
    else if (item.type.includes('school') || item.type.includes('college')) { iconName = 'school'; iconColor = '#4CAF50'; }
    else if (item.type.includes('place_of_worship')) { iconName = 'church'; iconColor = '#9C27B0'; }
    else if (item.type.includes('shop') || item.type.includes('mall')) { iconName = 'shopping-mall'; iconColor = '#E91E63'; }
    else if (item.type.includes('park')) { iconName = 'park'; iconColor = '#4CAF50'; }
    
    return (
      <TouchableOpacity key={key} style={styles.suggestionItem} onPress={onSelect}>
        <MaterialIcons name={iconName as any} size={20} color={iconColor} style={styles.suggestionIcon} />
        <View style={styles.suggestionTextContainer}>
          <Text style={styles.suggestionMainText} numberOfLines={1}>{extractMainName(item.name)}</Text>
          <Text style={styles.suggestionSubText} numberOfLines={1}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const extractMainName = (fullName: string): string => {
    const parts = fullName.split(',');
    return parts[0].trim();
  };

  const isBookRideButtonEnabled = pickup && dropoff && selectedRideType && estimatedPrice !== null;

  return (
    <View style={styles.contentContainer}>
      <View style={styles.mapContainer}>
        {isLoadingLocation ? (
          <View style={styles.mapLoadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.mapLoadingText}>Loading map...</Text>
          </View>
        ) : location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={(region) => setMapRegion(region)}
            showsUserLocation
            onPress={handleMapPress}
          >
            {pickupLocation && (
              <Marker coordinate={pickupLocation} title="Pickup">
                <View style={styles.pickupLocationMarker}>
                  <MaterialIcons name="location-on" size={24} color="#4CAF50" />
                </View>
              </Marker>
            )}
            {dropoffLocation && (
              <Marker coordinate={dropoffLocation} title="Dropoff">
                <View style={styles.dropoffLocationMarker}>
                  <MaterialIcons name="location-on" size={24} color="#F44336" />
                </View>
              </Marker>
            )}
            {driverLocation && (
              <Marker coordinate={driverLocation} title="Driver">
                <View style={styles.vehicleMarkerContainer}>
                  {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 30, '#000000')}
                </View>
              </Marker>
            )}
            {nearbyDrivers.map((driver) => (
              <Marker
                key={driver.driverId}
                coordinate={{
                  latitude: driver.location.coordinates[1], // latitude
                  longitude: driver.location.coordinates[0], // longitude
                }}
                title={driver.name}
              >
                <View style={styles.redDotMarker} />
              </Marker>
            ))}
            {selectionMode && (
              <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}>
                <View style={selectionMode === 'pickup' ? styles.pickupLocationMarker : styles.dropoffLocationMarker}>
                  <MaterialIcons name="location-on" size={24} color={selectionMode === 'pickup' ? '#4CAF50' : '#F44336'} />
                </View>
              </Marker>
            )}
            {routeCoords.length > 0 && (
              <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
            )}
          </MapView>
        ) : (
          <View style={styles.mapLoadingContainer}>
            <Text style={styles.mapLoadingText}>Could not get location. Check permissions.</Text>
          </View>
        )}
      </View>
      
      <View style={styles.driversCountContainer}>
        <Text style={styles.driversCountText}>
          Available Drivers Nearby: {nearbyDriversCount}
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Pickup Location"
            value={pickup}
            onChangeText={handlePickupChange}
            editable={!selectionMode}
          />
          <TouchableOpacity 
            style={[
              styles.selectMapButton,
              selectionMode === 'pickup' && styles.activeSelectMapButton
            ]}
            onPress={() => setSelectionMode(selectionMode === 'pickup' ? null : 'pickup')}
          >
            <Text style={styles.selectMapButtonText}>
              {selectionMode === 'pickup' ? 'Cancel' : 'Select Map'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showPickupSuggestions && (
          <View style={styles.suggestionsContainer}>
            {pickupLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading suggestions...</Text>
              </View>
            ) : suggestionsError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{suggestionsError}</Text>
              </View>
            ) : pickupSuggestions.length > 0 ? (
              pickupSuggestions.map((item) => (
                renderSuggestionItem(item, () => selectPickupSuggestion(item), item.id)
              ))
            ) : (
              <View style={styles.noSuggestionsContainer}>
                <Text style={styles.noSuggestionsText}>No suggestions found</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Dropoff Location"
            value={dropoff}
            onChangeText={handleDropoffChange}
            editable={!selectionMode}
          />
          <TouchableOpacity 
            style={[
              styles.selectMapButton,
              selectionMode === 'dropoff' && styles.activeSelectMapButton
            ]}
            onPress={() => setSelectionMode(selectionMode === 'dropoff' ? null : 'dropoff')}
          >
            <Text style={styles.selectMapButtonText}>
              {selectionMode === 'dropoff' ? 'Cancel' : 'Select Map'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showDropoffSuggestions && (
          <View style={styles.suggestionsContainer}>
            {dropoffLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading suggestions...</Text>
              </View>
            ) : suggestionsError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{suggestionsError}</Text>
              </View>
            ) : dropoffSuggestions.length > 0 ? (
              dropoffSuggestions.map((item) => (
                renderSuggestionItem(item, () => selectDropoffSuggestion(item), item.id)
              ))
            ) : (
              <View style={styles.noSuggestionsContainer}>
                <Text style={styles.noSuggestionsText}>No suggestions found</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      {(distance || travelTime) && (
        <View style={styles.distanceTimeContainer}>
          <View style={styles.distanceTimeItem}>
            <Text style={styles.distanceTimeLabel}>DISTANCE:</Text>
            <Text style={styles.distanceTimeValue}>{distance || '---'}</Text>
          </View>
          <View style={styles.distanceTimeItem}>
            <Text style={styles.distanceTimeLabel}>TRAVEL TIME:</Text>
            <Text style={styles.distanceTimeValue}>{travelTime || '---'}</Text>
          </View>
        </View>
      )}
      
      {apiError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{apiError}</Text>
        </View>
      )}
      
      {(pickupLocation && dropoffLocation && !routeCoords.length) && (
        <TouchableOpacity 
          style={styles.seeRouteButton}
          onPress={async () => {
            if (pickupLocation && dropoffLocation) await fetchRouteBetween(pickupLocation, dropoffLocation);
          }}
        >
          <Text style={styles.seeRouteButtonText}>See Route</Text>
        </TouchableOpacity>
      )}
      
      <RideTypeSelector
        selectedRideType={selectedRideType}
        setSelectedRideType={handleRideTypeSelect}
      />
      
      <TouchableOpacity
        style={[
          styles.bookRideButton,
          isBookRideButtonEnabled ? styles.enabledBookRideButton : styles.disabledBookRideButton,
        ]}
        onPress={handleBookRide}
        disabled={!isBookRideButtonEnabled}
      >
        <Text style={styles.bookRideButtonText}>BOOK RIDE</Text>
      </TouchableOpacity>
      
      {showPricePanel && selectedRideType && (
        <Animated.View
          style={[
            styles.pricePanel,
            {
              transform: [{
                translateY: panelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Ride Details</Text>
            <TouchableOpacity onPress={() => setShowPricePanel(false)}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.priceDetailsContainer}>
            <View style={styles.vehicleIconContainer}>
              {renderVehicleIcon(selectedRideType as 'bike' | 'taxi' | 'port', 40, '#000000')}
            </View>
            <View style={styles.priceInfoContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Pickup:</Text>
                <Text style={styles.priceValue} numberOfLines={1}>{pickup || 'Not selected'}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Drop-off:</Text>
                <Text style={styles.priceValue} numberOfLines={1}>{dropoff || 'Not selected'}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Distance:</Text>
                <Text style={styles.priceValue}>{distance || '---'}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.priceValue}>₹{estimatedPrice || '---'}</Text>
              </View>
              <View style={styles.returnTripRow}>
                <Text style={styles.priceLabel}>Return trip:</Text>
                <Switch
                  value={wantReturn}
                  onValueChange={setWantReturn}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                  thumbColor={wantReturn ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            </View>
          </View>
          <View style={styles.bookButtonContainer}>
            <TouchableOpacity
              style={styles.bookMyRideButton}
              onPress={handleBookRide}
            >
              <Text style={styles.bookMyRideButtonText}>BOOK MY RIDE</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Booking</Text>
              <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
              </View>
              <Text style={styles.modalMessage}>
                Thank you for choosing EAZY GO!
              </Text>
              <Text style={styles.modalSubMessage}>
                Your ride has been successfully booked.
              </Text>
              <View style={styles.otpContainer}>
                <Text style={styles.otpLabel}>Your pickup OTP is:</Text>
                <Text style={styles.otpValue}>{bookingOTP}</Text>
              </View>
              <Text style={styles.otpWarning}>
                Please don't share it with anyone. Only share with our driver.
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmBooking}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F5F5F5' },
  mapContainer: { width: '100%', height: Dimensions.get('window').height * 0.3, borderRadius: 15, overflow: 'hidden', marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  map: { ...StyleSheet.absoluteFillObject },
  mapLoadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapLoadingText: { color: '#757575', fontSize: 16, textAlign: 'center', padding: 20 },
  inputContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
  selectMapButton: { backgroundColor: '#E0E0E0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginLeft: 10 },
  activeSelectMapButton: { backgroundColor: '#FF5722' },
  selectMapButtonText: { color: '#333', fontSize: 12, fontWeight: '600' },
  seeRouteButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 15, width: '100%' },
  seeRouteButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  suggestionsContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  suggestionIcon: { marginRight: 12 },
  suggestionTextContainer: { flex: 1 },
  suggestionMainText: { fontSize: 16, fontWeight: '500', color: '#333333' },
  suggestionSubText: { fontSize: 12, color: '#757575', marginTop: 2 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  loadingText: { marginLeft: 8, fontSize: 14, color: '#666666' },
  noSuggestionsContainer: { paddingVertical: 12, alignItems: 'center' },
  noSuggestionsText: { fontSize: 14, color: '#666666' },
  distanceTimeContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  distanceTimeItem: { flexDirection: 'row', alignItems: 'center' },
  distanceTimeLabel: { fontSize: 14, fontWeight: '600', color: '#757575', marginRight: 8 },
  distanceTimeValue: { fontSize: 14, fontWeight: 'bold', color: '#333333' },
  driversCountContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginBottom: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  driversCountText: { fontSize: 16, fontWeight: '600', color: '#333333', textAlign: 'center' },
  bookRideButton: { paddingVertical: 15, borderRadius: 12, marginBottom: 15, width: '100%', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  enabledBookRideButton: { backgroundColor: '#FF5722' },
  disabledBookRideButton: { backgroundColor: '#BDBDBD' },
  bookRideButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  errorContainer: { width: '100%', backgroundColor: '#FFEBEE', borderRadius: 12, padding: 15, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#F44336' },
  errorText: { color: '#D32F2F', fontSize: 14, textAlign: 'center' },
  pricePanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: Dimensions.get('window').height * 0.5, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.2, shadowRadius: 6 },
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  panelTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  priceDetailsContainer: { flexDirection: 'row', marginBottom: 15 },
  vehicleIconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  priceInfoContainer: { flex: 1 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  priceLabel: { fontSize: 14, fontWeight: '600', color: '#757575', flex: 1 },
  priceValue: { fontSize: 14, fontWeight: 'bold', color: '#333333', flex: 2, textAlign: 'right' },
  returnTripRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  bookButtonContainer: { marginTop: 10 },
  bookMyRideButton: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 12, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  bookMyRideButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
  modalContent: { alignItems: 'center', marginBottom: 20 },
  modalIconContainer: { marginBottom: 15 },
  modalMessage: { fontSize: 18, fontWeight: 'bold', color: '#333333', textAlign: 'center', marginBottom: 5 },
  modalSubMessage: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 20 },
  otpContainer: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 15, width: '100%' },
  otpLabel: { fontSize: 14, color: '#666666', marginBottom: 5 },
  otpValue: { fontSize: 24, fontWeight: 'bold', color: '#FF5722' },
  otpWarning: { fontSize: 12, color: '#F44336', textAlign: 'center', fontStyle: 'italic' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalCancelButton: { flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 12, borderRadius: 10, marginRight: 10, alignItems: 'center' },
  modalCancelButtonText: { fontSize: 16, fontWeight: '600', color: '#666666' },
  modalConfirmButton: { flex: 1, backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 10, marginLeft: 10, alignItems: 'center' },
  modalConfirmButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  pickupLocationMarker: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
  dropoffLocationMarker: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
  vehicleMarkerContainer: { borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
  rideTypeContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
  rideTypeButton: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, width: '30%', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  selectedRideTypeButton: { backgroundColor: '#FF5722' },
  rideTypeText: { marginTop: 5, fontSize: 14, fontWeight: '600', color: '#333333' },
  selectedRideTypeText: { color: '#FFFFFF' },
  driverMarker: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2 },
  redDotMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4C0000',
  },
});

export default TaxiContent;