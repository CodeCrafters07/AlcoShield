import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import * as Yup from 'yup';
// import './styles.css'; // Import your CSS file with Tailwind CSS styles



const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  link: Yup.string().required('link is required'),
});

const RetailerTables = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const [formData, setFormData] = useState({
    name: '',
    link: '',
  });

  const data = [
    {
      id: 1,
      name: "John Doe",
      location: "New York",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Josephat",
      location: "Tanzania",
      phoneNumber: "123-456-7897",
      email: "zeflojujo@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Josephat",
      location: "Tanzania",
      phoneNumber: "123-456-7897",
      email: "zeflojujo@gmail.com",
      status: "Active",
    },
    {
      id: 4,
      name: "Josephat",
      location: "Tanzania",
      phoneNumber: "123-456-7897",
      email: "zeflojujo@gmail.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Josephat",
      location: "Tanzania",
      phoneNumber: "123-456-7897",
      email: "zeflojujo@gmail.com",
      status: "Active",
    },
  ];

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // If validation passes, add your logic to handle the form submission
      console.log('Form submitted:', formData);
      // Close the modal after submission
      closeModal();
      handleCreateNews();
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };



  const UpdataNewsHandler = async(id) => {
    console.log(id);
  }



   const deleteNewsHandler = async(id) => {
    console.log(id)

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        // await axios.delete(`http://localhost:3500/quickLink/${id}`)
        // .then((response) => {
        //   console.log('item deleted successfully');
        //   setFormData({
        //     name: '',
        //     link: '',
        //   });
        // })
        // .catch((err) => {
        //   console.log(err.message)
        // })
      } else {
        swal("Your imaginary file is safe!", {
          icon: 'info'
        });
      }
    });

   }



    const handleCreateNews = async (e) => {
    const News = formData;

    try{

    // await axios.post('http://localhost:3500/quickLink', News)
    //   .then((response) => {
    //       console.log(response);
    //       console.log(response.data);
    //       swal({
    //         title: "Good job!",
    //         text: "Quick Link is Created successfully!",
    //         icon: "success",
    //         button: "Aww yess!",
    //       });
    //       setFormData({
    //         name: '',
    //         link: '',
    //       });
    //       // navigate('/admin/dashboard');
    //   }).catch((error) => {
    //       alert("news error", error.message);
    //       console.log("news failed", error.message);
    //   })

    }catch(err){
      if(err?.status === 400){
        console.log('Missing Email or Password');
      }
      else if(!err) {
        console.log('No server Response');
      }
      else if(!err?.status === 401) {
        console.log('Unauthorized');
      }
      else{
        console.log("rest error", err);
      }
    }
  }

  useEffect(() => {

    async function fetchData() {
      // try{

      //   await axios.get(NEWS_URL)
      //     .then((response) => {
      //       console.log(response.data);
      //       setNewsData(response.data);
      //     }).catch((error) => {
      //         // alert("Quick Link error", error.message);
      //         swal({
      //           title: "Net-Connection Error!",
      //           text: "Quick Link fetching error!",
      //           icon: "warning",
      //           button: true,
      //           dangerMode: true,
      //         });
      //         console.log("news failed", error.message);
      //     })
    
      //   }catch(err){
      //     if(!err) {
      //       console.log('No server Response');
      //     }
      //     else if(!err?.status === 401) {
      //       console.log('Unauthorized');
      //     }
      //     else{
      //       console.log("rest error", err);
      //     }
      //   }
    }
    fetchData();
  },[formData]);

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">List of Retailers</h1>
      </div>

      <div className="p-4">

      

      {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}
      

      <div className="shadow-md overflow-x-auto" style={{zIndex: '-999'}}>
        <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
          <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
            <tr className='border-none'>
              <th className="py-2 px-4 border-b text-start text-lg">ID</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">name</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Location</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Email</th>

              <th className="py-2 px-4 border-b text-start text-lg uppercase">PhoneNumber</th>

              <th className="py-2 px-4 border-b text-start text-lg flex col-span-2 justify-center uppercase">Actions</th>
              <th className="py-2 px-4 border-b text-start"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index+1}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{item.name}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{item.location}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{item.email}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{item.phoneNumber}</td>

                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td>
                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    

      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
      
        <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
        <div className="bg-white p-4 md:p-8 rounded shadow-md z-10 w-full max-w-[50%]">
        <div className="flex justify-end ">
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-200 hover:outline hover:bg-slate-400  rounded-full focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
          <h2 className="text-2xl font-semibold mb-4">CREATE QUICK LINK</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full border font-normal text-base ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 font-semibold mb-2">
                Link
              </label>
              <textarea
                id="link"
                name="link"
                placeholder='describe here...'
                value={formData.link}
                onChange={handleChange}
                className={`w-full border font-normal text-base ${errors.link ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                rows="4"
              />
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
            </div>
            <button type="submit" className="bg-[#a19810] text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          </form>
          
        </div>
      </div>
    
    </>
    
  );
};

export default RetailerTables;