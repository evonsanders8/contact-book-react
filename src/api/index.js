async function fetchAPI(url, method="GET", sendData=null) {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV2b24iLCJpYXQiOjE2MDY1MDM4NjEsImV4cCI6MTYxMTY4Nzg2MX0.QJuYttm44Yn-pXOh7G4y-Io_R3zFRTcow25rFvztSnk'
    }
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}
  
  

  fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
  .then(function (data) {
    console.log('my contacts', data);
  })
  .catch(function (error) {
    console.error('error fetching contacts', error);
  })
