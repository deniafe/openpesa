import React, { useState, useEffect } from 'react';
import BankIcon from './BankIcon';
import Select from './Select';
import LoadingComponent from './LoadingComponent';
import { auth, sendVerificationCode } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';

const OpenPesaModal = ({ onClose }) => {

  const { totalPrice, cartItems } = useStateContext();

  const [selectedOption, setSelectedOption] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appVerifier, setAppVerifier] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('Choose your Bank to start the payment');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const router = useRouter()


  const banks = [
    "Access Bank",
    "Zenith Bank",
    "First Bank of Nigeria",
    "Guaranty Trust Bank (GTBank)",
    "United Bank for Africa (UBA)",
    "Ecobank Nigeria",
    "Sterling Bank",
    "Fidelity Bank",
    "Union Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Keystone Bank",
    "Wema Bank",
    "Heritage Bank",
    "Unity Bank",
    "Kuda",
    "Opay"
  ];

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCodeInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setTitle('Enter Your phone number')
  };


  const verify = async () => {
    try {
      const verifier = new RecaptchaVerifier(auth, 'test', {
        size: 'invisible',
        callback: async (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('This is the result gotten from the captcha verifier', response);
          toast.success('Captcha verified successfully')
          setAppVerifier(verifier);
        },
      });

      // await verifier.render();
      await verifier.verify();
    } catch (verificationError) {
      setError('reCAPTCHA verification failed: ' + verificationError.message);
      return toast.error('reCAPTCHA verification failed: ' + verificationError.message);
    }
  }

  const sendVerificationCode = async () => {
    try {
      if (appVerifier) {
        setLoading(true)
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(confirmation)
        // Handle successful verification
        toast.success('Verification code sent successfully')
        setCodeSent(true)
        setTitle('Enter the verification code sent to your phone')
        return setLoading(false)
      } else {
        toast.error('reCAPTCHA appVerifier is not set.');
        return setLoading(false)
      }
    } catch (error) {
      // Handle verification error
      toast.error('Verification failed:', error);
      return setLoading(false)
    }
  };

  const verifyCode = async () => {
    setLoading(true)
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      toast.success('Payment made successfully')
      onClose()
      setLoading(false)
      return router.push("/success")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      setLoading(false)
      return toast.error('Bad verification code')
    });
  }

  useEffect(() => {
   verify()
  }, []);

  return (
    <div className="modal-overlay">
      <div id="recaptcha-container" style={{position: 'absolute', zIndex: '2000', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      <div className="modal">
        <div className="modal-header">
         <img src="./assets/openpesa1.png" alt="openpesa" style={{width: '100px', height: '20px', marginTop: '8px'}} />
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Pay <span style={{fontWeight: '700', color: '#ef4030'}}>${totalPrice}</span></p>
          <p onClick={onClose} style={{marginLeft: '30px', marginRight: '-40px', marginTop: '-40px', fontSize: '26px', fontWeight: '400', color: '#f7f7f7', cursor: 'pointer'}}>x</p>
         </div>
         
        </div>
        <div className="line"></div>
        {loading ? 

        <div style={{marginTop: '200px', marginBottom: '200px'}}>
          <LoadingComponent /> 
        </div>

        :

        (
          <div>
            <div className="modal-content">
              <BankIcon />
              <h3>{ title}</h3>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px', marginBottom: '20px'}}>
                <div style={{width: '90%'}}>
                  <Select options={banks} onSelect={handleSelect} />
                </div>
              </div>

              {(selectedOption && !codeSent) && 
                  <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px', marginBottom: '20px', transition: 'all 0.3s ease 0s'}}>
                    <div style={{width: '90%'}}>
                    <input
                      type="text"
                      placeholder='+2348013342265'
                      value={phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                    </div>
                  </div> 
              }

              {codeSent && 

                  <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                    <div style={{width: '90%'}}>
                      <input
                        type="text"
                        placeholder='000000'
                        onChange={handleCodeInputChange}
                        required
                      />
                    </div>
                  </div>
              }
              
            </div>
            

            <div style={{marginTop: '40px', marginBottom: '40px'}}>
              {/* <button id="test" >Continue</button> */}
              <button onClick={code ? verifyCode : sendVerificationCode}>
                {
                  code ? 'Verify Code' : 'Continue'
                }
              </button>
            </div>
          </div>
        )
        
      }
      </div>
      <div id="test" style={{position: 'absolute', zIndex: '2000', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </div>
  );
};

export default OpenPesaModal;
