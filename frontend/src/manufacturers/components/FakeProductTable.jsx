import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
// import './styles.css'; // Import your CSS file with Tailwind CSS styles


const FakeProductTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

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
  },[]);

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Fake Prodect Customer Reports</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </>
    
  );
};

export default FakeProductTable;