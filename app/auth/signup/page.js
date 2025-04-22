'use client';
import { Form, Input, Button, message } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import './signup.css'; // Adjust the path as necessary

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success('Account created! You can now log in.');
      router.push('/auth/login');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Image Side */}
      <div className="login-image" />

      {/* Right Form Side */}
      <div className="login-form-section">
        <div className="form-box bg-white p-6 shadow-md rounded">
          <h2 className="signup-heading">Sign Up</h2>
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button className='main-button' type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>

            <Form.Item className="text-center">
              <a href="/auth/login" className="login-button">
              <span>Already have an account?</span>     Login
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
