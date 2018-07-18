import db from './index.js';
const rooms = [];
db.collection('rooms').get().then(querySnapshot => {
  querySnapshot.forEach(room => {
    rooms.push(room.data());
  });
});

export default rooms;
