import React, { Component } from 'react';
import { Image, Popup, Button } from 'semantic-ui-react';
import { withAuth } from 'fireview';
import logo from '../../images/coup.png';
import firebase from 'firebase';
import history from '../../history';
import db from '../../firestore';
import tempImg from '../../images/coin.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    profileImg: ''
  }
  componentDidMount() {
    this.props.userId &&
      db.collection('users').doc(this.props.userId).get()
        .then(user => {
          let profileImg = user.data().profileImg;
          this.setState({ profileImg });
        })
        .catch(err => { console.error(err) })
  }
  handleLogout = () => {
    firebase.auth().signOut()
      .then(() => history.push('/login'));
  }
  render() {
    return (
      <div className='navbar-container'>
        <Link to='/'>
          <Image src={logo} id='logo' />
        </Link>
        {
          <Popup
            trigger={<Image src={tempImg} className='profile-img' />}
            content={<Button onClick={this.handleLogout} style={{ borderRadius: 0 }}>Sign out</Button>}
            style={{ opacity: .7, borderRadius: 0 }}
            on='click'
            hideOnScroll
            inverted
          />
        }
      </div>
    )
  }
}

export default withAuth(Navbar);
