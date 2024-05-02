// Database to store mappings of short codes to original URLs
const urlDatabase = new Map();
let counter = 0;
// Function to generate a unique and collision-resistant short code
function generateShortCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomNumber = Math.floor(Math.random() * 100000);
    const timestamp = Date.now();
  
    // Combine the random number and timestamp to create a unique code
    let code = randomNumber.toString() + timestamp.toString();
    code = code.slice(-6);
  
    return code;
  }
  

// Function to shorten a long URL
function shortenURL() {
  const longURL = document.getElementById('longUrl').value;
  try {
    const shortURL = encodeURL(longURL);
    const shortenedURLBox = document.getElementById('shortenedURL');
    shortenedURLBox.innerHTML = `<a href="#" onclick="redirectURL('${shortURL}')">${shortURL}</a>`;
    shortenedURLBox.classList.add('active');
  } catch (error) {
    console.error(error.message);
  }
}

// Function to redirect to the original URL
function redirectURL(shortURL) {
  const shortCode = shortURL.split('/').pop();
  const longURL = urlDatabase.get(shortCode);
  if (longURL) {
    window.location.href = longURL; 
  } else {
    console.error('Short URL not found');
  }
}

// Function to decode a shortened URL and display the original URL
function decodeURL() {
    const shortURL = document.getElementById('shortUrl').value;
    const shortCode = shortURL.split('/').pop();
    const longURL = urlDatabase.get(shortCode);
    if (longURL) {
      const decodedURLBox = document.getElementById('decodedURL');
      decodedURLBox.innerText = longURL;
      decodedURLBox.classList.add('active');
    } else {
      console.error('Short URL not found');
    }
  }
  
// Function to generate a unique shortened URL
function encodeURL(longURL) {
  if (!longURL || typeof longURL !== 'string' || !/^https?:\/\//i.test(longURL)) {
    throw new Error('Invalid URL');
  }

  let shortCode = generateShortCode();
  while (urlDatabase.has(shortCode)) {
    shortCode = generateShortCode();
  }
  urlDatabase.set(shortCode, longURL);
  return `http://Short.url/${shortCode}`;
}
