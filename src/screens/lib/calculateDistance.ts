const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  if (distance >= 1) {
    return distance.toFixed(1) + ' km';
  } else {
    return (distance * 1000).toFixed() + ' m';
  }
};

// Example usage
const distance = calculateDistance(37.7749, -122.4194, 37.7749, -122.4184);
console.log(distance); // Output: '0.1 km'
export default calculateDistance;
