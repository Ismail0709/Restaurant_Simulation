'use client';
import { Form, Input, Button, message } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // adjust path as needed

export default function Signup() {
  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success('Account created! You can now log in.');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <Form layout="vertical" onFinish={handleSignup}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item>
          <a href="/auth/login" className="text-blue-600 underline text-sm">Already have an account? Login</a>
        </Form.Item>
      </Form>
    </div>
  );
}
