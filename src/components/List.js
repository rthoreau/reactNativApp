import React, { Component } from 'react';
import { Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text, View } from 'react-native';
import Unsplash from 'unsplash-js/native';
//mdp = idotests

const unsplash = new Unsplash({
	applicationId: "1f2350f5108e5f8abdf444951ad28c0741860de0d84e438f02d33bfff2f63e7f",
	secret: "92ee156cfe259ece15c4bcaf4b8f44a05d75738c130a29544869cd82ab3e9050",
	callbackUrl: "{http://localhost/react/}"
});

const {height, width} = Dimensions.get('window');
const pc = width/100;

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
		height: height - 70,
		resizeMode:'contain',
	},
	close:{
		position:'absolute',
		top:2*pc,
		right:2*pc,
	},
	buttonText:{
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
	addBookmark:{
		position:'absolute',
		width:9*pc,
		height:9*pc,
		bottom:2*pc,
		right:2*pc,
		backgroundColor: 'rgba(220, 220, 220, 0.3)',
	},
	fullAddBookmark:{
		position:'absolute',
		width:15*pc,
		height:15*pc,
		bottom:15*pc,
		right:42.5*pc,
		backgroundColor: 'rgba(220, 220, 220, 0.3)',
	},
	fullScreen:{
		backgroundColor:'#181818',
		height:height,
		width:width,
	},
	imageButtonBoomark:{
		opacity:0.6,
		fontSize:8*pc,
		lineHeight:8*pc,
		textAlign:'center',
		width:9*pc,
		height:9*pc,
	},
	imageFullButtonBoomark:{
		fontSize:12*pc,
		opacity:0.6,
		textAlign:'center',
		lineHeight:12*pc,
		borderRadius:1*pc,
	},
	bookmarked:{
		color:'yellow',
	}
});

class List extends Component {
	constructor() {
		super();
		this.state = {
			pics : [],
			selected : {}
		}
		unsplash.photos.getRandomPhoto({ count: 20 })
		.then(rep => rep.json())
		.then(json => {
			console.log(json);
			let unsplashPics = [];
			json.forEach(function(pic){
				unsplashPics.push({key:pic.id, src:pic.urls.small, srcFull:pic.urls.full, bookmarked:true});
			});
			this.setState({ pics: unsplashPics });
		});
	}

	onPressItem = (item) => {
		this.setState({ selected: item });
	};
	
	onAddBookmark = (item) => {
		console.log(item);
		let tempPics = this.state.pics;
		let pos = item ? this.state.pics.indexOf(item) : tempPics.indexOf(this.state.selected);
		console.log(pos);
		tempPics[pos].bookmarked = !tempPics[pos].bookmarked;
		this.setState({ pics: tempPics });
		console.log(tempPics);
	};

	renderItem = ({item}) => {
		console.log('renderItem');
		return (
			<TouchableOpacity onPress={() => this.onPressItem(item)}>
				<Image id={item.key} source={{uri:item.src}} style={styles.image}>
					<TouchableOpacity style={styles.addBookmark} onPress={() => this.onAddBookmark(item)}>
						<Text style={item.bookmarked ? styles.imageButtonBoomark : [styles.imageButtonBoomark, styles.bookmarked]}>★</Text>
					</TouchableOpacity>
				</Image>
			</TouchableOpacity>
		)
	};

	shouldDisplayCurrentImage = () => {
		const { selected } = this.state;
		return Object.keys(selected).length > 0;
	}
	/*<FlatList data={this.state.pics} numColumns={2} renderItem={() => this.renderItem()} style={styles.list}>
	</FlatList>*/
	render() {
		console.log(this.state.pics);

		if (this.shouldDisplayCurrentImage()) {
			const { selected } = this.state;
			return (
				<View style={styles.fullScreen}>
					<Image source={{ uri: selected.srcFull }} style={styles.imageFull }>
						<TouchableOpacity style={styles.close} onPress={() => this.onPressItem({})}>
							<Text style={styles.buttonText}>X</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.fullAddBookmark} onPress={() => this.onAddBookmark(false)}>
							<Text style={selected.bookmarked ? styles.imageFullButtonBoomark : [styles.imageFullButtonBoomark, styles.bookmarked]}>★</Text>
						</TouchableOpacity>
					</Image>
				</View>
				)
		}
		return (
			<FlatList data={this.state.pics} numColumns={2} renderItem={() => this.renderItem} style={styles.list}>
			</FlatList>
		);
	}
}
//voir liste des bookmarked

export default List;