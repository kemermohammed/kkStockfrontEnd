'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../store/authSlice'; // Adjust path based on your setup
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the token from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      toast.error('Verification token is missing!');
      return;
    }

    dispatch(verifyEmail(token))
      .unwrap()
      .then(() => {
        toast.success('Email verified successfully!');
      })
      .catch((error) => {
        toast.error(error || 'Email verification failed!');
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default VerifyEmail;
