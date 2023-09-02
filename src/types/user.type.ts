
export interface UserData {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer'; 
    contactNo: string | null; 
    address: string | null;  
    profileImg: string | null; 
  }
  