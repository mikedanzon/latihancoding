import React, { Component } from 'react';
import Axios from 'axios';
import querystring from 'query-string';
import { connect } from 'react-redux';
import { API_URL } from '../helpers/apiurl';

class Verified extends Component {
    state = {
        success: 0
    }

    componentDidMount() {
        //console.log(this.props.location.search)
        var obj = querystring.parse(this.props.location.search)
        console.log(obj)
        Axios.get(`${API_URL}/auth/verified`,{ // sama dengan /auth/verified?id=${obj.id}
            headers: {
                'Authorization': `Bearer ${obj.token}`
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({success:1})
        }).catch((err)=>{
            console.log(err)
            this.setState({success:2})
        })
    }

    render() {
        console.log(this.props.Auth)
        if (this.state.success === 1) {
            return (
                <div>
                    <center>
                        <h1>
                            Berhasil verified
                    </h1>
                    </center>
                </div>
            )
        } else if (this.state.success === 2) {
            return (
                <div>
                    <center>
                        <h1>
                            gagal verified
                    </h1>
                    </center>
                </div>
            )
        }
        return (
            <div>
                <center>
                    <h1>
                        sedang menunggu verified
                    </h1>
                </center>
            </div>
        );
    }
}

const bebas = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(bebas) (Verified);