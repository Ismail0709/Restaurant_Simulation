'use client';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import './login.css'; // Adjust the path as necessary

export default function Login() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success('Login successful!');
      router.push('/dashboard'); // ✅ Redirect after login
    } catch (error) {
      message.error('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" />
      <div className="login-form-section">
        <div className="form-box">
          <h2 className="login-heading">Login</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button className='main-button' type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="create-account-button"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

