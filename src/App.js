import React,{useEffect,useState,useRef} from 'react';

import './App.css';

const App = () => { 

  const [otpCode, setOtpCode] = useState("_ _ _ _");
  const inputRef = useRef();
  
  useEffect(() => {

    if ("OTPCredential" in window) {
      const ac = new AbortController();
    
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal
        })
        .then((otp) => {
          alert("ok" + otp);
          setOtpCode(otp);
          inputRef.current.value = otp
          ac.abort();
        })
        .catch((err) => {
          alert("error");
          ac.abort();
          console.log(err);
        });
    }
  },[])

  return (
    <div className="App">
    <h1>Auto verify OTP on the web POC</h1>
    <div>
      Send an SMS that includes
      <p><code>@www.IdanBarzi.github.io/webOTPVerify/ #1234</code></p>
      to this phone.
      <p><code>here @www.IdanBarzi.github.io/webOTPVerify/ is the domain from otp verification is to be done and  #1234 is the OTP</code></p  >
      to this phone.
    </div>
    <br/>
    <br/>
    <br/>
    <div style={{textAlign:"center"}}>
       <h2> Your OTP:	&nbsp;</h2><input
  type="text"
  id="otp"
  name="otp"
  autocomplete="one-time-code"
  ref={inputRef}
/> 
    </div>
    </div>
  );
}

export default App;
