import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import { Icon } from 'react-native-elements';

const EventTextCard = (props) => {
  return (
    <View style={styles.fulltouch}>
      <View style={styles.container}>
      <View style={styles.eventData}>
      <Text style={styles.titleText}>{ props.eventTitle }</Text>
      <Text style={styles.dateText}>{ props.eventDate }</Text>  
      </View>          
      <View style={styles.iconRight}>        
        { props.iconRight}                             
      </View>
    </View>      
    </View>    
  );
};

export default EventTextCard;
