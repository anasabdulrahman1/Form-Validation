import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../src/bootstrap.min.css';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import './App.css'; // Import your custom CSS file

function App() {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    address: '',
    country: '',
    file: null,
    terms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
    dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'You must be at least 18 years old'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Log the submitted values to the console
    console.log("Form Submitted:", values);

    // Check for validation errors
    if (Object.keys(values).some(key => !values[key])) {
      console.log("Validation errors:", values);
      setSubmitting(false);
      return;
    }

    // If there are no validation errors, log the values
    console.log("Form Values:", values);
    setSubmitting(false);
  };

  return (
    <BootstrapForm className="custom-form">
      <h1 className="text-center mb-5">Registeration Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <BootstrapForm.Group controlId="fullName" className="mb-3">
              <BootstrapForm.Label>Full Name</BootstrapForm.Label>
              <Field className="form-control" name="fullName" />
              <ErrorMessage name="fullName" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="email" className="mb-3">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field className="form-control" name="email" type="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="phoneNumber" className="mb-3">
              <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
              <Field className="form-control" name="phoneNumber" />
              <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="dob" className="mb-3">
              <BootstrapForm.Label>Date of Birth</BootstrapForm.Label>
              <Field className="form-control" name="dob" type="date" />
              <ErrorMessage name="dob" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="gender" className="mb-3">
              <BootstrapForm.Label>Gender</BootstrapForm.Label>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center'>
                  <Field type="radio" name="gender" value="male" />
                  <label className="ms-2">Male</label>
                </div>
                <div className='d-flex align-items-center'>
                  <Field type="radio" name="gender" value="female" />
                  <label className="ms-2">Female</label>
                </div>
                <div className='d-flex align-items-center'>
                  <Field type="radio" name="gender" value="other" />
                  <label className="ms-2">Other</label>
                </div>
              </div>
              <ErrorMessage name="gender" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="password" className="mb-3">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field className="form-control" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="confirmPassword" className="mb-3">
              <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
              <Field className="form-control" name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="address" className="mb-3">
              <BootstrapForm.Label>Address</BootstrapForm.Label>
              <Field as="textarea" name="address" className="form-control" rows="3" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="country" className="mb-3">
              <BootstrapForm.Label>Country</BootstrapForm.Label>
              <Field as="select" name="country" className="form-control">
                <option value="">Select a country</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
              </Field>
              <ErrorMessage name="country" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="file" className="mb-3">
              <BootstrapForm.Label>Upload File</BootstrapForm.Label>
              <input type="file" name="file" className="form-control" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="terms" className="mb-3">
              <Field type="checkbox" name="terms" />
              <BootstrapForm.Label className='ms-2'>I accept the terms and conditions</BootstrapForm.Label>
              <ErrorMessage name="terms" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <div className="d-flex justify-content-center ">
              <Button type="submit" variant="success" className="w-100 rounded" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Register'}
              </Button>
            </div>
          </>
        )}
      </Formik>
    </BootstrapForm>
  );
}

export default App;

