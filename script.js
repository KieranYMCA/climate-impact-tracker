
const form = document.getElementById('impact-form');
const imageInput = document.getElementById('imageUpload');
const imageUrlField = document.getElementById('imageUrl');

const CLOUD_NAME = 'your-cloud-name';
const UPLOAD_PRESET = 'your-upload-preset';
const SHEET_ENDPOINT = 'https://api.sheetmonkey.io/form/your-sheetmonkey-id';

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  imageUrlField.value = data.secure_url;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  await fetch(SHEET_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert('Thanks – your impact has been submitted!');
  form.reset();
});
