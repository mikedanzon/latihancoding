import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';
import { API_URL } from '../helpers/apiurl';

class SendVerified extends Component {
    state = {
        loading: false
    }

    onsendklik = () => {
        this.setState({ loading: true })
        console.log(this.props.Auth)
        var obj = {
            username: this.props.Auth.username,
            email: this.props.Auth.email,
            userid: this.props.Auth.id
        }
    }

    render() {
        return (
            <div>
                <center>
                    <h1>
                        apakah anda telah mendapatkan surat verified dari Raja bajak laut, di email kalian ,
                        kalo belum silahkan klik tombo dibawah ini
                    </h1>
                    {
                        this.state.loading ?
                            <div>
                                loading......
                        </div> :
                            <button onClick={this.onsendklik}>Klik ini</button>

                    }
                </center>
            </div>
        );
    }
}

const Bebas = (state) => {
    return {
        Auth: state.Auth
    }
}


export default connect(Bebas)(SendVerified);