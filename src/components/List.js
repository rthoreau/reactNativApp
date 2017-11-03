import React, { Component } from 'react';
import { Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text, View } from 'react-native';

const {height, width} = Dimensions.get('window');
const pc = width/100;

//Image.getSize(myUri, (width, height) => {this.setState({width, height})});

const styles = StyleSheet.create({
  image: {
    width: 47*pc,
    height: 47*pc,
    marginTop: 2*pc,
    marginRight: 1*pc,
    marginLeft: 1*pc,
  },
  list: {
  	paddingLeft:1 * pc,
  	backgroundColor:'#181818',
  },
  imageFull: {
    width: width,
    height: height,
  	resizeMode:'cover',
  },
  close:{
  	position:'absolute',
  	top:2*pc,
  	left:2*pc,
  },
  closeText:{
  	fontSize:9*pc,
  	color:'white',
  	backgroundColor: 'black',
  	opacity:0.4,
  	width:10*pc,
  	height:10*pc,
  	textAlign:'center',
  	lineHeight:9*pc,
  	borderRadius:1*pc,
  },
  fullScreen:{
  	backgroundColor:'#181818',
  	height:height,
  	width:width,
  }
});

class List extends Component {
  constructor() {
	super();
	this.state = {
		pics : [
			{ key:4, src:'http://ceosonweb.alwaysdata.net/color2.png'},
			{ key:1, src:'http://ceosonweb.alwaysdata.net/color1.png'},
			{ key:2, src:'http://ceosonweb.alwaysdata.net/color4.png'},
			{ key:3, src:'http://ceosonweb.alwaysdata.net/color3.png'},
			{ key:8, src:'http://ceosonweb.alwaysdata.net/color2.png'},
			{ key:5, src:'http://ceosonweb.alwaysdata.net/color1.png'},
			{ key:7, src:'http://ceosonweb.alwaysdata.net/color4.png'},
			{ key:6, src:'http://ceosonweb.alwaysdata.net/color3.png'},
		],
		selected : {}
	}
  }

  onPressItem = (item) => {
  	this.setState({ selected: item });
  };

  renderItem = ({item}) => {
    return (
    	<TouchableOpacity onPress={() => this.onPressItem(item)}>
	    	<Image
		      id={item.key}
		      source={{uri:item.src}}
		      style={styles.image}
		    />
		 </TouchableOpacity>
   	)
  };

  shouldDisplayCurrentImage = () => {
  	const { selected } = this.state;
  	return Object.keys(selected).length > 0;
  }

  render() {

  	if (this.shouldDisplayCurrentImage()) {
	  	const { selected } = this.state;
  		return (
  			<View style={styles.fullScreen}>
	  			<Image source={{ uri: selected.src }} style={styles.imageFull}>
	  				<TouchableOpacity 
	  					style={styles.close}
	  					onPress={() => this.onPressItem({})}>
		  				<Text style={styles.closeText}>X</Text>
		  			</TouchableOpacity>
	  			</Image>
  			</View>
		)
  	}

	return (
		<FlatList 
			data={this.state.pics}
			numColumns={2}
			renderItem={this.renderItem}
			style={styles.list}
		/>
	);
  }
}

export default List;