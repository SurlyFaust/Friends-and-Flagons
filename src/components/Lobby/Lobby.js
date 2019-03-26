import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import openSocket from 'socket.io-client';
import io from 'socket.io-client';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'red',
    },
  });


class Lobby extends Component {

    state = {
      message: '',
      chatMessages: [],
    };

    componentWillMount = () => {
      this.props.dispatch({ type: `FETCH_LOBBY_GAME`, payload: this.props.match.params.id})
    }

    mySocket = io();

    // newMessage = () => {
    //   this.mySocket.on('chat message', message => {
    //     console.log('New message:', message)
    //     return <li>{this.message}</li>
    //   })
    // }

    messageUpdate = () => {
      this.mySocket.emit('chat message', `${this.props.user.username}: ${this.state.message}`);
          return false;
        };
      
      
    // getMessage = () => {
    //   const socket = io();
    //   {socket.on('chat message', `<li>${message}</li>`)}
    // }

    onChange = (event) => {
      event.preventDefault();
      this.setState({
        message: event.target.value,
      });
    };

    roster = () => this.props.game.map(player => player.player_id);

    componentDidMount() { 
      this.mySocket.on('chat message', message => {
        console.log('New message:', message);
        this.setState({
          chatMessages: [
            ...this.state.chatMessages,
            message,
          ],
        });
      });
  };

    render() {
        const { classes } = this.props;

        // console.log('GAME INFO:', this.props.game)
        
        return (
            <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ul id="messages">
                {this.state.chatMessages.map(message => <li>{message}</li>)}
              </ul>
              <input id="m" type="text" onChange={this.onChange} />
              <button onClick={this.messageUpdate}>Submit</button>
            </Paper>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
            <Paper className={classes.paper} style={{color: 'blue'}}>{JSON.stringify(this.state.visitors)}</Paper>
            </Grid>
            <Grid item xs={2}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
        </div>
    );
    }
}

Lobby.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps)(withStyles(styles)(Lobby));