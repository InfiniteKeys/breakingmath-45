// netlify/functions/proxy.js
export async function handler(event, context) {
  // Handle preflight OPTIONS requests (CORS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
      body: "",
    }
  }

  try {
    // Parse the request body to get the Supabase request details
    const requestBody = event.body ? JSON.parse(event.body) : {};
    const { endpoint, method = 'GET', body: supabaseBody, headers: supabaseHeaders = {} } = requestBody;

    if (!endpoint) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing endpoint parameter" }),
      }
    }

    // Build the full Supabase URL
    const supabaseUrl = `${process.env.SUPABASE_URL}${endpoint}`;

    // Prepare headers for Supabase request
    const fetchHeaders = {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      ...supabaseHeaders
    };

    // Make the request to Supabase
    const fetchOptions = {
      method: method,
      headers: fetchHeaders,
    };

    if (supabaseBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      fetchOptions.body = typeof supabaseBody === 'string' ? supabaseBody : JSON.stringify(supabaseBody);
    }

    const response = await fetch(supabaseUrl, fetchOptions);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
      body: data,
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
