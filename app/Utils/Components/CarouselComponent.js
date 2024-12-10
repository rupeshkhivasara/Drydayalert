import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = () => {
  const carouselRef = useRef(null);
  const carouselData = [
    {
      rating:5,
      review: 'Amazing app!!! That’s what I was looking for. Highly recommended.',
      userName: 'Rajesh Kadam',
    },
    {
      rating: 4.5,
      review: '"Amazing service! I use this app for better planning, and it has made everything so much easier. The developers don’t send any ads or useless messages at all. and I’ve had no issues whatsoever. Worth every penny!"',
      userName: 'Indrajeet Madhuskar',
    },
    {
      rating: 5,
      review: 'Bhai 25/- me saal bhar itni service mil rahi hai. Mere sabhi friends ne subscribe kiya hai ye app. Sahi app hai dosto.',
      userName: 'Chandru Mehboobani',
    },
    {
      rating: 4.8,
      review: 'Overall experience is amazing and a top-notch app that perfectly caters to the user’s needs.',
      userName: 'Mahindra Joshi',
    },
    {
      rating: 5,
      review: 'Impressed with this app, good style and simple features. It’s worth every penny. –',
      userName: 'Anish Sharma',
    },
    {
      rating: 4.8,
      review: '"I’ve been using this app for the past few weeks, and I have to say it’s a game-changer! The user interface is intuitive, and the features are exactly what I needed. Highly recommend it if you’re looking for a reliable application!"',
      userName: 'Mohit Suryavanshi',
    },
    {
      rating: 4.5,
      review: '"Exceptional service. The app itself is incredibly efficient and has made managing my events so much easier. I’m very impressed with the functionality!" ',
      userName: ' Parag Govitrikar',
    },
    {
      rating: 5,
      review: '"Best app I’ve installed. It’s well worth the investment if you’re looking for something that allows you to plan ahead of time." –',
      userName: 'Prakash Patil',
    },
    {
      rating: 4.8,
      review: '"Good overall experience. The app is user-friendly. Great value for the price offered!" ',
      userName: 'Kimaya Rawat',
    },
  ];
  const renderItem = ({item}) => (
    <LinearGradient
      colors={['#ACC8E5', '#384e78']} // Gradient colors
      style={styles.card}>
      <View style={styles.stars}>
      <StarRatingDisplay
        rating={item.rating}
      />
      </View>
      <Text style={styles.review}>{item.review}</Text>
      <Text style={styles.userName}>- {item.userName}</Text>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.reviewHeader}>Dry Day Alerts</Text>
      <Carousel
        ref={carouselRef}
        data={carouselData}
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
  reviewHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginBottom: 20,
  },
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
    color:'#112A46'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CarouselComponent;
