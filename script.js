// Send a message to the extension
let extensionId = "niabohgmmladbgipommcolmbobckcjjk"; // Replace with your actual extension ID
document.getElementById('uploadButton').addEventListener('click', function() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  if (file) {
    var formData = new FormData();
    formData.append('pdfFile', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Send a message to the extension with the URL of the uploaded PDF
        chrome.runtime.sendMessage(extensionId, {
          action: 'printMessage',
          message: "file uploaded to print" ,
          fileUrl: '/uploads/' + data.filename // Assuming the server responds with the filename
        }, function(response) {
          if (chrome.runtime.lastError || !response.success) {
            console.error('Error sending message to extension:', chrome.runtime.lastError);
          } else {
            console.log('Message sent to extension:', response);
          }
        
        });
      } else {
        console.error('Failed to upload PDF file.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    alert('Please select a PDF file to upload.');
  }
});
