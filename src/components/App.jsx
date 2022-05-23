import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import getPictures from "./fetchPicture/fetchPicture";
import Button from "./Button/Button";
import Modal from "./Modal";
import Container from "./Container/Container";
import { Rings } from "react-loader-spinner";
import Header from "./Header";
import Main from "./Main";

export default function App(){

const [images , setImages ] = useState([]) ; 
const [request , setRequest ] = useState('') ; 
const [status , setStatus ] = useState('idle') ; 
const [loadMore , setLoadMore ] = useState(false) ; 
const [page , setPage ] = useState(1) ; 
const [showModal , setShowModal ] = useState(false) ; 
const [error , setError ] = useState('') ; 
const [modalImage , setModalImage ] = useState('') ; 

// const hendleFormSubmit =  request  => {
// setRequest(request) ; 
// setPage(1) ;

  
//      }

useEffect(() => {
if(request !== '') {
  let value = getPictures(request , page); 
  setStatus("pending");
  value.then((res) => {
const images = res.data ; 
if(images.total === 0 ) {
  setLoadMore(false) ; 
  alert.error("Could not find images with that name");
 
}

setImages((prev) => [...prev , ...images.hits]);
setStatus('resolved') ; 
setLoadMore(true) ; 

if(res.data.hits.length < 12 ) {
  setLoadMore( false)
}

  }).catch((error) => {
    setStatus('rejected') ; 
   console.log(error);
  })
}
 }, [request , page])

 const onloadMore = () => {
  setPage((prev) => prev + 1);
};

const toglleModal = (e) => {
  setShowModal((prev) => !prev);
if(!showModal) {
  if(e){
  
    filtredLIst(e.target.parentNode.id)
  }
}





}
const  filtredLIst = (id) => {
  
  let value = images.find((item) => item.id === Number(id));
  setModalImage(value.largeImageURL) ;

};

 const findPicture = (pictureName) => {
   setRequest(pictureName) ; 
   setPage(1) ; 
   setImages([]) ; 

};

return (
  <div className="App">
    <Header>
      <Container>
        <Searchbar onSubmit={findPicture} />
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
          <ImageGallery images={images} open={toglleModal} />
        )}
        {loadMore && <Button loag={onloadMore} />}
        {showModal && <Modal src={modalImage} onClose={toglleModal} />}
      </Container>
    </Main>
  
  </div>
);

   
 

}





