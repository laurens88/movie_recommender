import {React, useEffect} from "react";

function SignUpPage() {
    useEffect(() => {
        document.title = 'Sign Up';
    }, []);
  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  );
}

export default SignUpPage;