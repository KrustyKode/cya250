function isStrongPassword(password) {
    // 1: Check length
    if (password.length < 8) {
       return false;
    }
    
    // 2: Check if it contains "password"
    if (password.toLowerCase().includes("password")) {
       return false;
    }
    
    // 3: Check for at least one uppercase letter
    // (Use regex to test for A-Z)
    if (!/[A-Z]/.test(password)) {
       return false;
    }
    
    // If all conditions are met, return true
    return true;
 }
 
 console.log("Testing isStrongPassword()...");
 
 console.log("Qwerty - " + isStrongPassword("Qwerty"));                  // false - Too short
 console.log("passwordQwerty - " + isStrongPassword("passwordQwerty"));  // false - Contains "password"
 console.log("qwerty123 - " + isStrongPassword("qwerty123"));            // false - No uppercase chars
 console.log("Qwerty123 - " + isStrongPassword("Qwerty123"));            // true
 
 // additional arguments to further test
 console.log("MyP@ssw0rd - " + isStrongPassword("MyP@ssw0rd"));          // true
 console.log("mypassword - " + isStrongPassword("mypassword"));          // false
 console.log("PAAS - " + isStrongPassword("PAAS"));                      // false - Too short
 
 // Do NOT remove the following line:
 export default isStrongPassword;
 