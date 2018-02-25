import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  fulltouch: {
    paddingVertical: 10,    
    paddingHorizontal: 10
  },
  container: {
    height: 50,            
    flexDirection: 'row',        
  },
  eventData: {
    flex: 1
  },
  titleText: {    
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },  
  iconRight: { 
    flex: 1, 
    alignItems: 'flex-end',     
    justifyContent: 'center' 
  }  
});

export default styles;
