import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();
// <RoomContext.Provider value={}

class RoomProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true
    };

    //this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    const rooms = this.formatData(items);
    const featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false
    });
  }

  formatData() {
    return items.map(item => {
      const { id } = item.sys;
      const images = item.fields.images.map(image => image.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
  }

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
