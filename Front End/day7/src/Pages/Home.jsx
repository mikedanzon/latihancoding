import React,{Component, createRef} from 'react';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//const MySwal = withReactContent(Swal);

var data = [
  {nama:'budi',usia:5,alamat:'jl. sukahari'},
  {nama:'andi',usia:4,alamat:'jl. sukaminggu'},
  {nama:'santi',usia:3,alamat:'jl. sukabulan'}
]

class Home extends Component {
  state = { 
    modal:false,
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
    const {nama} = this.state.datamurid[index]
    Swal.fire({
      title: `Are you sure to remove ${nama} ?`,
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
        this.setState({datamurid})
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  onChangeHandler=(e,namaproperty)=>{
    this.setState({editform:{...this.state.editform,[namaproperty]:e.target.value}})
  }
  
  onEditClick=(index)=>{
    var {nama,usia,alamat} = this.state.datamurid[index]
    var editformaja = this.state.editform
    editformaja = {...editformaja,editnama:nama,editusia:usia,editalamat:alamat};
    this.setState({editform:editformaja,indexedit:index,modal:!this.state.modal})
  }
  onEditConfirm=()=>{
    var index = this.state.indexedit
    var {editnamaref,editusiaref,editalamatref} = this.state.editform
    var editnama = editnamaref.current.value
    var editusia = editusiaref.current.value
    var editalamat = editalamatref.current.value
    var datamurid = this.state.datamurid
    var datamuridedit = this.state.datamurid[index]
    datamuridedit = {...datamuridedit,nama:editnama,usia:editusia,alamat:editalamat}
    datamurid.splice(index,1,datamuridedit)
    this.setState({datamurid,indexedit:-1,modal:!this.state.modal})
  }

  renderDataMurid=()=>{
    return this.state.datamurid.map((val,index)=>{
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

  toggle = () => this.setState({modal:!this.state.modal});

  render() { 
    // console.log("masuk render")
    const {toggle,state} = this;
    const {modal,editform} = state;
    const {editnama,editusia,editalamat} = editform;
    if(this.state.datamurid.length !== 0) {
      return ( 
        // <div className="App">
        //   <h1>{this.state.nama}</h1>
        //   <input type="text" placeholder="tulis nama" onChange={(e)=>this.setState({nama:e.target.value})}></input>
        //   <button onClick={this.onclickaja}>Klik</button>
        //   <Tulisan/>
        // </div>
        <div style={{height:'100vh'}} className="TableMurid d-flex justify-content-center flex-column align-items-center mt-3">
          {/* <button className='btn btn-primary' onClick={toggle}>buka modal</button> */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Form {editnama}</ModalHeader>
            <ModalBody>
              <div><input className='form-control' ref={this.state.editform.editnamaref} onChange={(e)=>this.onChangeHandler(e,'editnama')} defaultValue={editnama}/></div>
              <div><input className='form-control' ref={this.state.editform.editusiaref} onChange={(e)=>this.onChangeHandler(e,'editusia')} defaultValue={editusia}/></div>
              <div><input className='form-control' ref={this.state.editform.editalamatref} onChange={(e)=>this.onChangeHandler(e,'editalamat')} defaultValue={editalamat}/></div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onEditConfirm}>Save</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
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
