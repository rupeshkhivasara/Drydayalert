import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';

const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = ({data}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item}) => (
    <LinearGradient
      colors={['#ffcccb', '#d32f2f']} // Gradient colors
      style={styles.card}>
      <View style={styles.stars}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={item.rating}
          fullStarColor="gold"
          starSize={30}
        />
      </View>
      <Text style={styles.review}>{item.review}</Text>
      <Text style={styles.userName}>- {item.userName}</Text>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        loop={true}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 200,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  stars: {
    marginBottom: 10,
  },
  review: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default CarouselComponent;
