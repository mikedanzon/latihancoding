import React,{Component, createRef} from 'react';
import Swal from 'sweetalert2';
import { Table } from 'reactstrap';

var data = [
  {nama:'budi',usia:5,alamat:'jl. sukahari'},
  {nama:'andi',usia:4,alamat:'jl. sukaminggu'},
  {nama:'santi',usia:3,alamat:'jl. sukabulan'}
]

class Home extends Component {
  state = { 
    angka:0,
    datamurid:[],
    nama:'',
    usia:'',
    alamat:'',
    indexedit:-1,
    editform:{
      editnamaref:createRef(),
      editusiaref:createRef(),
      editalamatref:createRef()
    }
  }

  namaref = createRef();
  usiaref = createRef();
  alamatref = createRef();

  componentDidMount(){ // saat masuk di web akan di load dahulu
    // console.log("masuk didmount")
    // setTimeout(() => {
      this.setState({datamurid:data})
    // }, 500);
  }
  componentDidUpdate(){ // di load saat ada perubahan setstate
    // console.log("masuk didupdate")
  }
  componentWillUnmount(){ // di load saat pindah web
    // console.log("masuk willunmount")
  }

  onDeleteHandler=(index)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        var datamurid = this.state.datamurid
        datamurid.splice(index,1)
        this.setState({datamurid,indexdelete:-1})
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }
  
  onEditClick=(index)=>{
    this.setState({indexedit:index})
  }
  onEditConfirm=(index)=>{
    var {editnamaref,editusiaref,editalamatref} = this.state.editform
    var editnama = editnamaref.current.value
    var editusia = editusiaref.current.value
    var editalamat = editalamatref.current.value
    var datamurid = this.state.datamurid
    var datamuridedit = this.state.datamurid[index]
    datamuridedit = {...datamuridedit,nama:editnama,usia:editusia,alamat:editalamat}
    datamurid.splice(index,1,datamuridedit)
    this.setState({datamurid,indexedit:-1})
  }

  renderDataMurid=()=>{
    return this.state.datamurid.map((val,index)=>{
      if (index === this.state.indexedit) {
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td><input ref={this.state.editform.editnamaref} defaultValue={val.nama}/></td>
            <td><input ref={this.state.editform.editusiaref} defaultValue={val.usia}/></td>
            <td><input ref={this.state.editform.editalamatref} defaultValue={val.alamat}/></td>
            <td><button className='btn btn-success mr-2' onClick={()=>this.onEditConfirm(index)}>Save</button>
            <button className='btn btn-success' onClick={()=>this.setState({indexedit:-1})}>Cancel</button></td>
          </tr>
        )
      }
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{val.nama.toUpperCase()}</td>
          <td>{val.usia} tahun</td>
          <td>{val.alamat}</td>
          <td><button className='btn btn-success mr-2' onClick={()=>this.onEditClick(index)}>Edit</button>
          <button className='btn btn-danger' onClick={()=>this.onDeleteHandler(index)}>Delete</button></td>
        </tr>
      )
    })
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
        <div style={{height:'80vh'}} className="TableMurid d-flex justify-content-center flex-column align-items-center mt-3">
          <h1>Murid TK Sukamaju</h1>
          <div>
            <form onSubmit={this.onTambahClick}>
              <div><input type='text' className='form-control' placeholder='masukan nama' ref={this.namaref}/></div>
              <div><textarea type='text' className='form-control' cols='25' rows='5' placeholder='masukan alamat' ref={this.alamatref}/></div>
              <div><input type='number' className='form-control' placeholder='masukan umur' ref={this.usiaref}/></div>
              <button className='btn btn-primary mb-5 mt-2' type='submit'>Tambahkan</button>
            </form>
          </div>
          <Table bordered className="w-50">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Usia</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDataMurid()}
            </tbody>
          </Table>
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
 
export default Home;
