/* eslint-disable no-unused-vars */
import { FilePlus2, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import bannerListing from "../assets/banner-listing.png";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase'
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { useSelector } from "react-redux";

const CreateListing = () => {

  const {currentUser} = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 10,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [files, setFiles] = useState([]);
  const [errorSaving, setErrorSaving] = useState(false);
  console.log(formData);
  
  useEffect(() => {
    if (imageUploadError) {
      toast.error(imageUploadError);
    }
  }, [imageUploadError]);

  useEffect(() => {
    if (errorSaving) {
      toast.error(errorSaving);
    }
  }, [errorSaving]);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 9){
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i=0; i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        console.log(err);
        const msg = 'Image Upload Failed (2MB MAX PER IMAGE)';
        setImageUploadError(msg);
        setUploading(false);
        toast.error(msg);
      })
    } else {
      setImageUploadError('You Can Only Upload 8 Images Per Listing');
      setUploading(false);
    }
  }
  
  

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload Is ${progress}% Done.`);
        },
        (error) => {
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      )
    });
  }

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({
        ...formData,
        type: e.target.id
      })
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea')
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_ , i) => i !== index),
    })
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === ''){
      toast.error("Please Give A Title For The Listing!")
      return;
    }
    if (formData.description === ''){
      toast.error("Please Give Description For The Listing!")
      return;
    }
    if (formData.address === ''){
      toast.error("Please Give A Address For The Listing!")
      return;
    }
    try {
      setLoading(true);
      setErrorSaving(false);
      const res = await api.post("/listing/create", {
        imageUrls: formData.imageUrls,
        name: formData.name,
        description: formData.description,
        address: formData.address,
        type: formData.type,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        regularPrice: formData.regularPrice,
        discountPrice: formData.discountPrice,
        offer: formData.offer,
        parking: formData.parking,
        furnished: formData.furnished,
        userRef: currentUser._id
      });
      const data = res.data;
      setLoading(false)
      if(data.success === false){
        setErrorSaving(data.message);
      }
    } catch (error) {
      setErrorSaving(error.message);
      setLoading(false);
    }
  }

  return (
    <main className='flex flex-col justify-center items-center m-10 p-3 max-w-7xl mx-auto'>
      <div className="flex items-center justify-center mx-5 ">
        <div className="card bg-base-100 card-border border-base-300 w-full min-w-full overflow-hidden">
          <div className="border-base-300 border-b border-dashed">
            <div className="flex items-center gap-2 p-4">
              <div className="grow">
                <div className="flex items-center gap-2 text-sm font-medium justify-between">
                  <span className="flex flex-col gap-4">
                      <img src={bannerListing} alt="" className="hidden lg:inline" /> 
                    <span className="flex items-center justify-center gap-2 lg:hidden mx-6">  
                      <FilePlus2 className="h-6 w-6" />
                      <h1 className="text-base-content text-3xl font-extrabold ">CREATE LISTING</h1>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body gap-4">
            <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col gap-6 flex-1">
                <input onChange={handleChange} value={formData.name} type="text" placeholder="Title" className="input input-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="name" maxLength='62' minLength='10' />
                <textarea onChange={handleChange} value={formData.description} type="text" placeholder="Description" className="textarea textarea-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="description" />
                <input onChange={handleChange} value={formData.address} type="text" placeholder="Address" className="input input-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="address" />
                <div className="flex gap-6 flex-wrap">
                  <label className="items-center flex gap-3">
                    <span className="label-text">Sell</span>
                    <input onChange={handleChange} checked={formData.type === "sale"} type="checkbox" id="sale" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Rent</span>
                    <input onChange={handleChange} checked={formData.type === "rent"} type="checkbox" id="rent" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Parking Spot</span>
                    <input onChange={handleChange} checked={formData.parking} type="checkbox" id="parking" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Furnished</span>
                    <input onChange={handleChange} checked={formData.furnished} type="checkbox" id="furnished" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Offer</span>
                    <input onChange={handleChange} checked={formData.offer} type="checkbox" id="offer" className="checkbox border-accent" />
                  </label>   
                </div>
                <div className="flex gap-6 flex-wrap">
                  <label className="items-center flex gap-2">
                    <input onChange={handleChange} value={formData.bedrooms} type="number" id="bedrooms" min='1' max='10' required className="input input-bordered border-accent font-bold w-16" />
                    <span className="label-text">Bedrooms</span>
                  </label>
                  <label className="items-center flex gap-2">
                    <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min='1' max='10' required className="input input-bordered border-accent font-bold w-16" />
                    <span className="label-text">Bathrooms</span>
                  </label>
                  <label className="items-center flex gap-2">
                    <input onChange={handleChange} value={formData.regularPrice} type="number" id="regularPrice" min='50' required className="input input-bordered border-accent font-bold w-50" />
                    <div className="flex flex-col items-center">
                      <span className="label-text">Regular Price</span>
                      <span className="text-xs text-gray-500">($ / Month)</span>
                    </div>
                  </label>
                  <label className="items-center flex gap-2">
                    <input onChange={handleChange} value={formData.discountPrice} type="number" id="discountPrice" min='10' required className="input input-bordered border-accent font-bold w-50" />
                    <div className="flex flex-col items-center">
                      <span className="label-text">Discounted Price</span>
                      <span className="text-xs text-gray-500">($ / Month)</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-6">
                <span className="font-semibold">IMAGES: <span className="text-gray-500 italic font-normal">THE FIRST IMAGE WILL BE THE COVER. (MAX 6)</span></span>
                <div className="flex items-center gap-3">
                  <input onChange={(e)=>setFiles(e.target.files)} type="file" id="images" accept="image/*" multiple className="file-input file-input-bordered w-full max-w-xs" />
                  <button disabled={uploading} type="button" onClick={handleImageSubmit} className="btn bg-[#43546A] border-[#43546A] hover:shadow-lg">
                    {uploading ? <span className="loading loading-infinity loading-lg text-white"></span> : <span>UPLOAD</span>}  
                  </button>               
                </div>
                <div className="flex flex-col gap-2 max-h-80 overflow-y-auto p-2 w-full ">
                {
                  formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div key={url} className="border border-accent rounded p-4 mb-2 flex justify-between items-center">
                      <img src={url} alt="Listing Error!" className="w-24 object-contain rounded-lg" />
                      <button type="button" onClick={()=>handleRemoveImage(index)} className="text-red-600 hover:text-red-900"><Trash/></button>
                    </div>
                  ))
                }
                </div>
                <button className="btn btn-accent rounded-lg uppercase hover:shadow-lg">
                  {loading ? <span className="loading loading-infinity loading-lg text-white"></span> : <span>CREATE LISTING</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateListing