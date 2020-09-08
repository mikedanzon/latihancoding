import React,{Component, createRef} from 'react';
// import Tulisan from './components/tulisan';
import './App.css';

var data = [
  {nama:'budi',usia:5,alamat:'jl. sukahari'},
  {nama:'andi',usia:4,alamat:'jl. sukaminggu'},
  {nama:'santi',usia:3,alamat:'jl. sukabulan'}
]

class App extends Component {
  state = { 
    angka:0,
    // nama:'andi'
    datamurid:[]
  }

  namaref = createRef();
  usiaref = createRef();
  alamatref = createRef();

  componentDidMount(){ // saat masuk di web akan di load dahulu
    // console.log("masuk didmount")
    setTimeout(() => {
      this.setState({datamurid:data})
    }, 500);
  }

  componentDidUpdate(){ // di load saat ada perubahan setstate
    // console.log("masuk didupdate")
  }
  
  componentWillUnmount(){ // di load saat pindah web
    console.log("masuk willunmount")
  }

  renderDataMurid = ()=>{
    var jsx = this.state.datamurid.map((val,index)=>{
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{val.nama}</td>
          <td>{val.usia}</td>
          <td>{val.alamat}</td>
          <td><button className='btn btn-secondary'>Edit</button></td>
          <td><button className='btn btn-secondary'>Delete</button></td>
        </tr>
      )
    })
    return jsx;
  }

  onTambahClick = (e)=>{
    e.preventDefault();
    var nama = this.namaref.current.value;
    var usia = this.usiaref.current.value;
    var alamat = this.alamatref.current.value;
    var datamurid = this.state.datamurid;
    datamurid.push({nama,usia,alamat})
    this.setState({datamurid})
    this.namaref.current.value='';
    this.usiaref.current.value='';
    this.alamatref.current.value='';
  }

  render() { 
    // console.log("masuk render")
    if(this.state.datamurid.length !== 0) {
      return ( 
        // <div className="App">
        //   <h1>{this.state.nama}</h1>
        //   <input type="text" placeholder="tulis nama" onChange={(e)=>this.setState({nama:e.target.value})}></input>
        //   <button onClick={this.onclickaja}>Klik</button>
        //   <Tulisan/>
        // </div>
        <div style={{height:'100vh'}} className="TableMurid d-flex justify-content-center flex-column align-items-center mt-3">
          <h1>Murid TK Sukamaju</h1>
          <div>
            <form onSubmit={this.onTambahClick}>
              <div><input type='text' className='form-control' placeholder='masukan nama' ref={this.namaref}/></div>
              <div><textarea type='text' className='form-control' cols='25' rows='5' placeholder='masukan alamat' ref={this.alamatref}/></div>
              <div><input type='number' className='form-control' placeholder='masukan umur' ref={this.usiaref}/></div>
              <button className='btn btn-primary mb-2 mt-2' type='submit'>Tambahkan</button>
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Usia</th>
                <th>Alamat</th>
                <th colSpan='2'>Configure</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDataMurid()}
            </tbody>
          </table>
        </div>
       );
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }
}
 
export default App;
