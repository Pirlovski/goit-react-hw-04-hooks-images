import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import getPictures from "./fetchPicture/fetchPicture";
import Button from "./Button/Button";
import Modal from "./Modal";
import Container from "./Container/Container";
import { Rings } from "react-loader-spinner";
import Header from "./Header";
import Main from "./Main";


 class App extends Component {
   state = {
      images : [] ,
      request : '' , 
      status : 'idle',
      loadMore: false , 
      page : 1 , 
      showModal: false,
      error: "",
      modalImage : ''
   }

   hendleFormSubmit =  request  => {

this.setState({ request : request , page: 1 })

   }


   componentDidUpdate(prevProps, prevState) {
    if (prevState.request !== this.state.request) {
      this.setState({ status: "pending" });
      let value = getPictures(this.state.request);
      value
        .then((res) => {
          const images = res.data;
          if (res.data.total === 0) {
            this.setState({ loadMore: false });
            alert.error("Could not find images with that name");
          }
          this.setState((prevState) => ({
            images: images.hits,
            page: prevState.page + 1,
            status: "resolved",
            loadMore: true,
          }));
          if (res.data.hits.length < 12) {
            this.setState({ loadMore: false });
          }
        })
        .catch((error) => this.setState({ status: "rejected", error }));
    }
  }
  loadMore = () => {
    const { page, request } = this.state;
    let value = getPictures(request, page);
    value.then((res) => {
      const images = res.data;
      this.setState((prevState) => ({
        images: [...prevState.images, ...images.hits],
        page: prevState.page + 1,
        loadMore: true,
      }));
      if (res.data.hits.length < 12) {
        this.setState({ loadMore: false });
      }
    });
  };
  toglleModal = (e) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      if (e) {
        this.filtredLIst(e.target.parentNode.id);
      }
    }
  };
  filtredLIst = (id) => {
    const { images } = this.state;
    let value = images.find((item) => item.id === Number(id));
    this.setState({ modalImage: value.largeImageURL });
  };
  findPicture = (pictureName) => {
    if (pictureName !== this.state.request) {
      this.setState({ request: pictureName, page: 1 });
    }
  };
  render() {
    const { images, status, modalImage, showModal, loadMore } = this.state;
    return (
      <div className="App">
        <Header>
          <Container>
            <Searchbar onSubmit={this.findPicture} />
          </Container>
            {status === "pending" && (
              <Rings
                height="1000"
                width="1000"
                color="red"
                ariaLabel="loading"
              />
            )}
        </Header>
        <Main>
          <Container>
            {status === "idle" && <p>please enter name picture</p>}
           
            {status === "resolved" && (
              <ImageGallery images={images} open={this.toglleModal} />
            )}
            {loadMore && <Button loag={this.loadMore} />}
            {showModal && <Modal src={modalImage} onClose={this.toglleModal} />}
          </Container>
        </Main>
      
      </div>
    );
  }
}
export default App ;




