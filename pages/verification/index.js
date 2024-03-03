import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';

const Index = () => {
    const currentUser = useAuth().currentUser;
    console.log(currentUser);

    // sendEmailVerification(currentUser);
    return (
        <div>
            <h1>Verification</h1>
        </div>
    );
};

export default Index;