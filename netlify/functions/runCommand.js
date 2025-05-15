const { exec } = require('child_process');

exports.handler = async function(event, context) {
  const command = event.queryStringParameters.command || 'echo Hello, World!'; // Default to a simple command if none is provided

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        });
      }
      if (stderr) {
        return reject({
          statusCode: 500,
          body: JSON.stringify({ error: stderr }),
        });
      }
      resolve({
        statusCode: 200,
        body: JSON.stringify({ output: stdout }),
      });
    });
  });
};
