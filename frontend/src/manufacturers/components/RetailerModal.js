// // Modal.js

// import React, { useState } from 'react';

// const Modal = ({ isOpen, onClose, onFormSubmit }) => {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     location: '',
//     phoneNumber: '',
//     email: '',
//     status: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFormSubmit(formData);
//     // Additional logic for form submission
//   };

//   return (
//     <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
//       <div className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg">
//         <form onSubmit={handleSubmit}>
//           {/* Your form fields go here */}
//           <label>
//             Name:
//             <input type="text" name="name" value={formData.name} onChange={handleChange} />
//           </label>
//           {/* Add other form fields similarly */}

//           <div className="mt-4">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               className="ml-2 text-gray-500 hover:text-gray-700 font-bold"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Modal = ({ isOpen, onClose, onFormSubmit }) => {
    // const [formData, setFormData] = useState({
    //   id: '',
    //   name: '',
    //   location: '',
    //   email: '',
    // });
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   onFormSubmit(formData);
    //   console.log(formData)
    //   // Additional logic for form submission
    // };

  const initialValues = {
    name: '',
    location: '',
    username: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    location: Yup.string().required('Location is required'),
    name: Yup.string().required('Name is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Perform registration or login (this is where you would send data to the server)
    console.log('Authentication successful!', values);
    setSubmitting(false);
  };

  return (

    <div className={` w-4/5 ${isOpen?'hidden': 'block'}  md:w-3/4 lg:w-1/2 mt-8 flex-col items-center justify-center shadow-md bg-gray-100`}>
        <h2 className="text-2xl md:text-3xl font-bold mt-4 pt-3">Register Retailer</h2>
        
        <div className=" w-full rounded-md p-6 mt-4 bg-white">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name:
                        </label>
                        <Field
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                        Location:
                        </label>
                        <Field
                        type="text"
                        id="location"
                        name="location"
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter your location"
                        />
                        <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username:
                        </label>
                        <Field
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter your username"
                        />
                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                    </div> 

                <button
                    type="submit"
                    className="bg-blue-500 text-lg text-white p-2 rounded-md w-full"
                    disabled={isSubmitting}

                >
                    {isSubmitting ? 'Processing...' : 'Register'}
                </button>
                </Form>
            )}
            </Formik>
        </div>
    </div>

  );
}

export default Modal;