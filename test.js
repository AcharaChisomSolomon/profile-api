const axios = require('axios');

async function testEndpoint() {
  try {
    const response = await axios.get('http://localhost:3000/me');
    console.log('✅ TEST PASSED!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ TEST FAILED:', error.message);
  }
}

testEndpoint();