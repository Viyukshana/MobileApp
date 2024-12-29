import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';

const doctors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    rating: 4.8,
    experience: '15 Years Experience',
  },
  {
    id: '2',
    name: 'Dr. Sarah Connor',
    specialty: 'Dermatologist',
    rating: 4.5,
    experience: '10 Years Experience',
  },
  {
    id: '3',
    name: 'Dr. Michael Smith',
    specialty: 'Pediatrician',
    rating: 4.9,
    experience: '12 Years Experience',
  },
];

const CategoryScreen = () => {
  const renderDoctorCard = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.specialty}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={item.name.split(' ')[1][0]}
            style={styles.avatar}
          />
        )}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />
      <Card.Content>
        <Paragraph style={styles.infoText}>{item.experience}</Paragraph>
        <View style={styles.ratingRow}>
          <Paragraph style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" style={styles.button} onPress={() => alert(`Contacting ${item.name}`)}>
          Contact
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderDoctorCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F1F8E9',  // Light green background color
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',  // Adds a subtle shadow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  avatar: {
    backgroundColor: '#3f51b5',  // Blue background for avatar
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',  // Vibrant purple color for title
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#9e9e9e',  // Subtitle in a softer gray color
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',  // Purple for rating stars
  },
  button: {
    backgroundColor: '#6200ee',  // Button with matching purple color
    marginLeft: 'auto',
    marginRight: 8,
    borderRadius: 8,  // Rounded corners for the button
  },
});

export default CategoryScreen;
