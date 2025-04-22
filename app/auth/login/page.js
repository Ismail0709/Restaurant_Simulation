'use client';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

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
    <div className="max-w-md mx-auto bg-white p-6 mt-10 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* 🚀 Create Account Button */}
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={() => router.push('/auth/signup')}
            className="text-blue-600 hover:underline font-medium"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

